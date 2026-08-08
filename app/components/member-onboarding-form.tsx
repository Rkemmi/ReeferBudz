"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const interestOptions = ["Live music", "Gaming", "Outdoors", "Food", "Art", "Sports", "Wellness", "Movies"];

export function MemberOnboardingForm({ email, suggestedName }: { email: string; suggestedName: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/member/onboarding", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        displayName: form.get("displayName"),
        birthDate: form.get("birthDate"),
        adultAttestation: form.get("adultAttestation") === "on",
        guidelinesAcceptance: form.get("guidelinesAcceptance") === "on",
        bio: form.get("bio"),
        friendshipGoals: form.get("friendshipGoals"),
        interests: form.getAll("interests"),
        city: form.get("city"),
        region: form.get("region"),
        locationVisibility: form.get("locationVisibility"),
        discoverable: form.get("discoverable") === "on",
      }),
    });
    const result = (await response.json()) as { message?: string; redirectTo?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "We couldn’t save your profile. Please try again.");
      return;
    }
    router.push(result.redirectTo ?? "/member");
    router.refresh();
  }

  const latestAdultBirthDate = new Date();
  latestAdultBirthDate.setFullYear(latestAdultBirthDate.getFullYear() - 21);

  return (
    <form className="member-onboarding-form" onSubmit={submit}>
      <section aria-labelledby="account-step">
        <p className="onboarding-step">1 · Account and age</p>
        <h2 id="account-step">Confirm the person behind the profile</h2>
        <div className="confirmed-email"><strong>Email confirmed through sign-in</strong><span>{email}</span></div>
        <p className="field-help">This confirms control of your sign-in email. It is not identity or legal-age verification.</p>
        <label>Display name<input name="displayName" defaultValue={suggestedName} required minLength={2} maxLength={50} autoComplete="nickname" /></label>
        <label>Date of birth<input name="birthDate" type="date" min="1900-01-01" max={latestAdultBirthDate.toISOString().slice(0, 10)} required autoComplete="bday" /></label>
        <label className="check-label"><input name="adultAttestation" type="checkbox" required />I attest that I am at least 21 years old. I understand this is self-attestation, not verified identity or age.</label>
      </section>

      <section aria-labelledby="guidelines-step">
        <p className="onboarding-step">2 · Community promise</p>
        <h2 id="guidelines-step">Friendship first, always</h2>
        <p>ReeferBudz does not allow cannabis sales, delivery or transactions; dating or hookup solicitation; unsafe consumption; or impaired driving.</p>
        <label className="check-label"><input name="guidelinesAcceptance" type="checkbox" required />I have read and accept the <a className="text-action" href="/community-guidelines" target="_blank" rel="noreferrer">Community Guidelines</a>.</label>
      </section>

      <section aria-labelledby="profile-step">
        <p className="onboarding-step">3 · Your profile</p>
        <h2 id="profile-step">Help your future Budz know you</h2>
        <label>About you<textarea name="bio" required minLength={20} maxLength={500} rows={5} placeholder="Share a little about your interests, energy, and what makes a good hangout for you." /></label>
        <fieldset><legend>Interests <span>Choose at least one</span></legend><div className="interest-checks">{interestOptions.map((interest) => <label key={interest} className="check-chip"><input type="checkbox" name="interests" value={interest} />{interest}</label>)}</div></fieldset>
        <label>Friendship goals<textarea name="friendshipGoals" required minLength={10} maxLength={240} rows={3} placeholder="For example: local friends for concerts, game nights, and relaxed group hangs." /></label>
      </section>

      <section aria-labelledby="privacy-step">
        <p className="onboarding-step">4 · Location and privacy</p>
        <h2 id="privacy-step">Share only what feels right</h2>
        <div className="field-pair"><label>City <span>(optional)</span><input name="city" maxLength={80} autoComplete="address-level2" /></label><label>State or region <span>(optional)</span><input name="region" maxLength={80} autoComplete="address-level1" /></label></div>
        <fieldset><legend>Profile location</legend><label className="radio-label"><input type="radio" name="locationVisibility" value="region_only" defaultChecked />Show my state or region only</label><label className="radio-label"><input type="radio" name="locationVisibility" value="city_region" />Show my city and state or region</label><label className="radio-label"><input type="radio" name="locationVisibility" value="hidden" />Hide my location</label></fieldset>
        <label className="check-label"><input name="discoverable" type="checkbox" defaultChecked />Let eligible members find my profile in Discover Budz.</label>
        <p className="field-help">Never add a street address. ReeferBudz will not show your birth date or email on your public member profile.</p>
      </section>

      {message && <p className="form-error" role="alert">{message}</p>}
      <button className="button" type="submit" disabled={status === "saving"}>{status === "saving" ? "Creating your profile…" : "Create profile and enter Member Home →"}</button>
    </form>
  );
}
