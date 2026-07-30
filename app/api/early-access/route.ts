import { env } from "cloudflare:workers";

type Signup = {
  firstName?: unknown;
  email?: unknown;
  location?: unknown;
  interests?: unknown;
  adultConsent?: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as Signup;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const location = typeof data.location === "string" ? data.location.trim() : "";
  const interests = Array.isArray(data.interests)
    ? data.interests.join(",")
    : typeof data.interests === "string"
      ? data.interests
      : "";

  if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.adultConsent !== "yes") {
    return Response.json(
      { message: "Please enter your name and email and confirm that you are 21 or older." },
      { status: 400 },
    );
  }

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

  return Response.json({ ok: true });
}
