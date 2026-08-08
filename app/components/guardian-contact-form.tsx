"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { GuardianContactView } from "../../db/guardian";

export function GuardianContactForm({ contact }: { contact: GuardianContactView | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "removing" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("saving"); setMessage(""); const form = new FormData(event.currentTarget);
    const response = await fetch("/api/member/guardian/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.get("name"), phone: form.get("phone"), email: form.get("email"), listingConsent: form.get("listingConsent") === "on", verificationConsent: form.get("verificationConsent") === "on" }) });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) { setStatus("error"); setMessage(result.message ?? "We couldn’t save this Guardian contact."); return; }
    setStatus("saved"); setMessage(result.message ?? "Guardian contact saved."); router.refresh();
  }
  async function remove() {
    if (!window.confirm("Remove this emergency contact and withdraw Guardian contact consent?")) return;
    setStatus("removing"); setMessage(""); const response = await fetch("/api/member/guardian/contact", { method: "DELETE" });
    if (!response.ok) { setStatus("error"); setMessage("We couldn’t remove this contact."); return; }
    setStatus("saved"); setMessage("Emergency contact removed and Guardian contact consent withdrawn."); router.refresh();
  }
  return <div className="guardian-workspace">
    {contact ? <section className="guardian-status-card" aria-labelledby="guardian-contact-status"><p className="onboarding-step">Current emergency contact</p><div className="guardian-status-heading"><h2 id="guardian-contact-status">{contact.name}</h2><span className={`guardian-status guardian-status--${contact.verificationStatus}`}>{contact.verificationStatus}</span></div><dl><div><dt>Phone</dt><dd>{contact.maskedPhone}</dd></div>{contact.maskedEmail && <div><dt>Email</dt><dd>{contact.maskedEmail}</dd></div>}<div><dt>Member consent recorded</dt><dd>{new Date(contact.memberConsentAt).toLocaleDateString()}</dd></div></dl>{contact.verificationStatus === "pending" && <p className="guardian-warning">Verification delivery is not connected yet. Guardian sessions remain unavailable.</p>}<button className="button button-outline" type="button" onClick={remove} disabled={status === "removing"}>{status === "removing" ? "Removing…" : "Remove emergency contact"}</button></section> : null}
    <form className="settings-card guardian-contact-form" onSubmit={submit}><p className="onboarding-step">{contact ? "Replace contact" : "Emergency contact"}</p><h2>{contact ? "Choose a different trusted person" : "Choose someone you trust"}</h2><p>This information is restricted safety data. It is never shown on your profile or shared with other members.</p><label>Emergency contact name<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label><label>Emergency contact phone number<input name="phone" type="tel" required maxLength={18} placeholder="+12165551234" autoComplete="tel" /><span>Required. Include + and the country code.</span></label><label>Emergency contact email <span>Optional</span><input name="email" type="email" maxLength={254} autoComplete="email" /></label><div className="guardian-consent-box"><strong>Before you continue</strong><label className="check-label"><input name="listingConsent" type="checkbox" required />I have permission to list this person as my emergency contact.</label><label className="check-label"><input name="verificationConsent" type="checkbox" required />I understand Guardian alerts cannot begin until this contact accepts verification.</label></div><div className="guardian-limit"><strong>Guardian is not active yet</strong><p>This setup does not enable live location, monitoring, emergency response, or Guardian alerts. Those functions remain blocked until the complete Guardian system is built and tested.</p></div>{message && <p className={status === "error" ? "form-error" : "form-success"} role="status">{message}</p>}<button className="button" type="submit" disabled={status === "saving"}>{status === "saving" ? "Saving securely…" : contact ? "Replace and request verification" : "Save and request verification"}</button></form>
  </div>;
}
