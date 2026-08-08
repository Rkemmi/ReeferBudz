import { getChatGPTUser } from "../../../../chatgpt-auth";
import { findMemberByEmail } from "../../../../../db/members";
import { createOrReplaceGuardianContact, findGuardianContact, removeGuardianContact } from "../../../../../db/guardian";

type GuardianContactInput = { name?: unknown; phone?: unknown; email?: unknown; listingConsent?: unknown; verificationConsent?: unknown };
const clean = (value: unknown, maximum: number) => typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ message: "Sign in to continue." }, { status: 401 });
  const member = await findMemberByEmail(user.email);
  if (!member) return Response.json({ message: "Complete member setup first." }, { status: 409 });
  return Response.json({ contact: await findGuardianContact(member.id) });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ message: "Sign in to continue." }, { status: 401 });
  const member = await findMemberByEmail(user.email);
  if (!member) return Response.json({ message: "Complete member setup first." }, { status: 409 });
  const data = (await request.json()) as GuardianContactInput;
  const name = clean(data.name, 80);
  const phone = clean(data.phone, 18).replace(/[\s().-]/gu, "");
  const email = clean(data.email, 254).toLowerCase();
  if (name.length < 2 || !/^\+[1-9]\d{7,14}$/u.test(phone)) return Response.json({ message: "Enter the contact’s name and a complete phone number beginning with + and country code." }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) return Response.json({ message: "Enter a valid email address or leave it blank." }, { status: 400 });
  if (data.listingConsent !== true || data.verificationConsent !== true) return Response.json({ message: "Confirm both Guardian consent statements before continuing." }, { status: 400 });
  try {
    const created = await createOrReplaceGuardianContact({ memberId: member.id, name, phone, email: email || null });
    return Response.json({ ok: true, contactId: created.contactId, verificationStatus: "pending", deliveryStatus: "not_configured", message: "Contact saved securely. Verification delivery is not connected yet, so Guardian cannot be activated." });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("encryption") ? "Guardian secure storage is not configured yet. No contact details were saved." : "We couldn’t save this Guardian contact.";
    return Response.json({ message }, { status: 503 });
  }
}

export async function DELETE() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ message: "Sign in to continue." }, { status: 401 });
  const member = await findMemberByEmail(user.email);
  if (!member) return Response.json({ message: "Complete member setup first." }, { status: 409 });
  await removeGuardianContact(member.id);
  return Response.json({ ok: true });
}
