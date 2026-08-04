import { env } from "cloudflare:workers";

type Reservation = {
  firstName?: unknown;
  email?: unknown;
  quantity?: unknown;
  postalCode?: unknown;
  adultConsent?: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as Reservation;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const quantity = Number(data.quantity);
  const postalCode = typeof data.postalCode === "string" ? data.postalCode.trim() : "";

  if (
    !firstName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 5 ||
    data.adultConsent !== "yes"
  ) {
    return Response.json(
      { message: "Please enter your name and email, choose a quantity, and confirm that you are 21 or older." },
      { status: 400 },
    );
  }

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS sticker_pack_reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      quantity INTEGER NOT NULL DEFAULT 1,
      postal_code TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await env.DB.prepare(`
    INSERT INTO sticker_pack_reservations (first_name, email, quantity, postal_code)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      first_name = excluded.first_name,
      quantity = excluded.quantity,
      postal_code = excluded.postal_code,
      updated_at = CURRENT_TIMESTAMP
  `)
    .bind(firstName, email, quantity, postalCode)
    .run();

  return Response.json({ ok: true });
}
