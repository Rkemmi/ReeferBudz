import { respondToGuardianVerification } from "../../../../db/guardian";

type VerificationInput = { token?: unknown; decision?: unknown };
export async function POST(request: Request) {
  const data = (await request.json()) as VerificationInput;
  const token = typeof data.token === "string" ? data.token.trim().slice(0, 100) : "";
  const decision = data.decision;
  if (!token || !["accepted", "declined"].includes(String(decision))) return Response.json({ message: "This Guardian verification link is invalid." }, { status: 400 });
  const updated = await respondToGuardianVerification(token, decision as "accepted" | "declined");
  if (!updated) return Response.json({ message: "This Guardian verification link is invalid or expired." }, { status: 410 });
  return Response.json({ ok: true, decision });
}
