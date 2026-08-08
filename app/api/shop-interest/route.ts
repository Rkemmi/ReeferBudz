import { env } from "cloudflare:workers";
import { acceptsJson, bodyIsTooLarge, cleanText, isValidEmail, json } from "../_shared/request";

type Reservation = {
  firstName?: unknown;
  email?: unknown;
  quantity?: unknown;
  postalCode?: unknown;
  adultConsent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!acceptsJson(request) || bodyIsTooLarge(request)) {
    return json({ message: "This request could not be accepted." }, { status: 415 });
  }

  let data: Reservation;
  try {
    data = (await request.json()) as Reservation;
  } catch {
    return json({ message: "This request could not be read." }, { status: 400 });
  }

  const firstName = cleanText(data.firstName, 80);
  const email = cleanText(data.email, 254).toLowerCase();
  const quantity = Number(data.quantity);
  const postalCode = cleanText(data.postalCode, 10);

  if (cleanText(data.website, 200)) {
    return json({ ok: true });
  }

  if (
    !firstName ||
    !isValidEmail(email) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 5 ||
    data.adultConsent !== "yes"
  ) {
    return json(
      { message: "Please enter your name and email, choose a quantity, and confirm that you are 21 or older." },
      { status: 400 },
    );
  }

  if (!env.DB) {
    return json({ message: "Reservations are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
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

    return json({ ok: true });
  } catch (error) {
    console.error("sticker reservation persistence failed", error);
    return json({ message: "We could not save your reservation. Please try again later." }, { status: 503 });
  }
}
