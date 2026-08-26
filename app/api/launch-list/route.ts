import { env } from "cloudflare:workers";
import { acceptsJson, bodyIsTooLarge, cleanText, isValidEmail, json } from "../_shared/request";

type LaunchListSignup = {
  email?: unknown;
  adultConsent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!acceptsJson(request) || bodyIsTooLarge(request)) {
    return json({ message: "This request could not be accepted." }, { status: 415 });
  }

  let data: LaunchListSignup;
  try {
    data = (await request.json()) as LaunchListSignup;
  } catch {
    return json({ message: "This request could not be read." }, { status: 400 });
  }

  const email = cleanText(data.email, 254).toLowerCase();

  if (cleanText(data.website, 200)) {
    return json({ ok: true });
  }

  if (!isValidEmail(email) || data.adultConsent !== "yes") {
    return json(
      { message: "Please enter a valid email address and confirm that you are 21 or older." },
      { status: 400 },
    );
  }

  if (!env.DB) {
    return json({ message: "The launch list is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS launch_list_signups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        consented_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    await env.DB.prepare(`
      INSERT INTO launch_list_signups (email)
      VALUES (?)
      ON CONFLICT(email) DO NOTHING
    `)
      .bind(email)
      .run();

    return json({ ok: true });
  } catch (error) {
    console.error("launch-list persistence failed", error);
    return json({ message: "We could not save your email right now. Please try again later." }, { status: 503 });
  }
}
