import { env } from "cloudflare:workers";
import { acceptsJson, bodyIsTooLarge, cleanText, isValidEmail, json } from "../_shared/request";

type Signup = {
  email?: unknown;
  postalCode?: unknown;
  neighborhood?: unknown;
  find?: unknown;
  otherDetails?: unknown;
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

  const email = cleanText(data.email, 254).toLowerCase();
  const postalCode = cleanText(data.postalCode, 10);
  const neighborhood = cleanText(data.neighborhood, 120);
  const otherDetails = cleanText(data.otherDetails, 280);
  const find = Array.isArray(data.find)
    ? data.find.map((interest) => cleanText(interest, 40)).filter(Boolean).slice(0, 6)
    : [cleanText(data.find, 40)].filter(Boolean);

  if (cleanText(data.website, 200)) {
    return json({ ok: true });
  }

  const postalCodeLooksValid = !postalCode || /^[0-9]{5}(?:-[0-9]{4})?$/.test(postalCode);

  if (!isValidEmail(email) || data.adultConsent !== "yes" || find.length === 0 || !postalCodeLooksValid) {
    return json(
      {
        message:
          "Please enter a valid email, confirm that you are 21 or older, choose at least one friendship-focused option, and use a valid ZIP code if you include one.",
      },
      { status: 400 },
    );
  }

  if (!env.DB) {
    return json({ message: "The Founding Budz waitlist is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS founding_budz_waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        postal_code TEXT,
        neighborhood TEXT,
        goals TEXT NOT NULL,
        other_details TEXT,
        consented_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    await env.DB.prepare(`
      INSERT INTO founding_budz_waitlist (email, postal_code, neighborhood, goals, other_details)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        postal_code = excluded.postal_code,
        neighborhood = excluded.neighborhood,
        goals = excluded.goals,
        other_details = excluded.other_details,
        consented_at = CURRENT_TIMESTAMP
    `)
      .bind(email, postalCode, neighborhood, find.join(","), otherDetails)
      .run();

    return json({ ok: true });
  } catch (error) {
    console.error("founding-budz waitlist persistence failed", error);
    return json({ message: "We could not save your Founding Budz spot. Please try again later." }, { status: 503 });
  }
}
