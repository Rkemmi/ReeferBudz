import { env } from "cloudflare:workers";
import { acceptsJson, bodyIsTooLarge, cleanText, isValidEmail, json } from "../_shared/request";

type Signup = {
  firstName?: unknown;
  email?: unknown;
  location?: unknown;
  interests?: unknown;
  adultConsent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!acceptsJson(request) || bodyIsTooLarge(request)) {
    return json({ message: "This request could not be accepted." }, { status: 415 });
  }

  let data: Signup;
  try {
    data = (await request.json()) as Signup;
  } catch {
    return json({ message: "This request could not be read." }, { status: 400 });
  }

  const firstName = cleanText(data.firstName, 80);
  const email = cleanText(data.email, 254).toLowerCase();
  const location = cleanText(data.location, 120);
  const interests = Array.isArray(data.interests)
    ? data.interests.map((interest) => cleanText(interest, 40)).filter(Boolean).slice(0, 3).join(",")
    : cleanText(data.interests, 160);

  if (cleanText(data.website, 200)) {
    return json({ ok: true });
  }

  if (!firstName || !isValidEmail(email) || data.adultConsent !== "yes") {
    return json(
      { message: "Please enter your name and email and confirm that you are 21 or older." },
      { status: 400 },
    );
  }

  if (!env.DB) {
    return json({ message: "Early access is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    // Check if this email already exists to handle duplicates properly
    const existing = await env.DB.prepare(
      "SELECT id FROM early_access_signups WHERE email = ?"
    )
      .bind(email)
      .first<{ id: number }>();

    if (existing) {
      // Email already exists - update their info but keep their original Founding Bud number (id)
      await env.DB.prepare(`
        UPDATE early_access_signups
        SET first_name = ?, location = ?, interests = ?
        WHERE email = ?
      `)
        .bind(firstName, location, interests, email)
        .run();

      // Return their existing Founding Bud number (their original id)
      return json({ 
        ok: true, 
        foundingBudNumber: existing.id,
        isReturning: true 
      });
    }

    // New signup - insert the record and let the database generate the auto-increment id
    // The database-generated id becomes their permanent Founding Bud number
    const result = await env.DB.prepare(`
      INSERT INTO early_access_signups (first_name, email, location, interests)
      VALUES (?, ?, ?, ?)
    `)
      .bind(firstName, email, location, interests)
      .run();

    // result.meta.last_row_id contains the auto-generated id from the insert
    const foundingBudNumber = (result.meta as { last_row_id?: number })?.last_row_id;

    if (!foundingBudNumber) {
      throw new Error("Could not retrieve generated ID");
    }

    return json({ ok: true, foundingBudNumber, isReturning: false });
  } catch (error) {
    console.error("early-access persistence failed", error);
    return json({ message: "We could not save your spot. Please try again later." }, { status: 503 });
  }
}
