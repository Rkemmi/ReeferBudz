"use client";

import { FormEvent, useState } from "react";

export function EarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [foundingBudNumber, setFoundingBudNumber] = useState<number | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    setFoundingBudNumber(null);

    const form = event.currentTarget;
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as { message?: string; foundingBudNumber?: number; isReturning?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message ?? "We could not save your spot. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");

      if (result.foundingBudNumber) {
        setFoundingBudNumber(result.foundingBudNumber);
        if (result.isReturning) {
          setMessage(`Welcome back, Founding Bud #${result.foundingBudNumber}!`);
        } else {
          setMessage(`YOU'RE A FOUNDING BUD! Founding Bud #${result.foundingBudNumber}`);
        }
      } else {
        setMessage("You're on the list. Welcome, Founding Bud.");
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <form className="signup-form" onSubmit={submit} aria-busy={status === "sending"}>
      <label className="form-trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
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
        <legend>What sounds most like your kind of circle?</legend>
        <label className="check-label"><input type="checkbox" name="interests" value="local-friends" /> Local friends</label>
        <label className="check-label"><input type="checkbox" name="interests" value="interest-groups" /> Interest-based circles</label>
        <label className="check-label"><input type="checkbox" name="interests" value="events" /> Community events</label>
      </fieldset>
      <label className="check-label consent-label">
        <input name="adultConsent" type="checkbox" value="yes" required />
        I confirm that I am at least 21 years old and agree to receive early-access updates.
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Saving your spot…" : "Count me in →"}
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
      {foundingBudNumber && status === "success" && (
        <div className="founding-bud-reveal" aria-live="polite">
          <h3>YOU&apos;RE A FOUNDING BUD!</h3>
          <p className="bud-number">Founding Bud #{foundingBudNumber}</p>
        </div>
      )}
    </form>
  );
}
