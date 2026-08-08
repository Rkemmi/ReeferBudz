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
    await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS early_access_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      location TEXT,
      interests TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await env.DB.prepare(`
    INSERT INTO early_access_signups (first_name, email, location, interests)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      first_name = excluded.first_name,
      location = excluded.location,
      interests = excluded.interests
  `)
    .bind(firstName, email, location, interests)
    .run();

    return json({ ok: true });
  } catch (error) {
    console.error("early-access persistence failed", error);
    return json({ message: "We could not save your spot. Please try again later." }, { status: 503 });
  }
}
