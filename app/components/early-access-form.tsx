"use client";

import { FormEvent, useState } from "react";

export function EarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/early-access", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "We could not save your spot. Please try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage("You’re on the list. Welcome, Founding Bud.");
  }

  return (
    <form className="signup-form" onSubmit={submit}>
      <div className="field-row">
        <label>
          First name
          <input name="firstName" autoComplete="given-name" required maxLength={80} />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <label>
        Cleveland-area neighborhood or city <span>(optional)</span>
        <input name="location" autoComplete="address-level2" maxLength={120} />
      </label>
      <fieldset>
        <legend>What would you most like to find?</legend>
        <label className="check-label"><input type="checkbox" name="interests" value="local-friends" /> Local friends</label>
        <label className="check-label"><input type="checkbox" name="interests" value="interest-groups" /> Interest-based circles</label>
        <label className="check-label"><input type="checkbox" name="interests" value="events" /> Community events</label>
      </fieldset>
      <label className="check-label consent-label">
        <input name="adultConsent" type="checkbox" value="yes" required />
        I confirm that I am at least 21 years old and agree to receive early-access updates.
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Saving your spot…" : "Save my spot"}
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
