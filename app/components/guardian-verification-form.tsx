"use client";
import { useState } from "react";
export function GuardianVerificationForm({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "accepted" | "declined" | "error">("idle"); const [message, setMessage] = useState("");
  async function respond(decision: "accepted" | "declined") { setStatus("sending"); const response = await fetch("/api/guardian/contact-verification", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, decision }) }); const result = (await response.json()) as { message?: string }; if (!response.ok) { setStatus("error"); setMessage(result.message ?? "This verification could not be completed."); return; } setStatus(decision); setMessage(decision === "accepted" ? "You’re verified as this member’s Guardian emergency contact." : "You declined. ReeferBudz will not send Guardian alerts to you."); }
  if (status === "accepted" || status === "declined") return <p className="guardian-verification-result" role="status">{message}</p>;
  return <div className="guardian-verification-actions"><button className="button" type="button" onClick={() => respond("accepted")} disabled={status === "sending"}>Accept Guardian alerts</button><button className="button button-outline" type="button" onClick={() => respond("declined")} disabled={status === "sending"}>Decline</button>{message && <p className="form-error" role="alert">{message}</p>}</div>;
}
