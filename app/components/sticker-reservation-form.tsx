"use client";

import { FormEvent, useState } from "react";

export function StickerReservationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/shop-interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "We could not save your reservation. Please try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage("Your sticker pack is reserved—no payment has been taken.");
  }

  return (
    <form className="signup-form sticker-reservation-form" onSubmit={submit}>
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
        How many $10 packs would you probably want?
        <select name="quantity" defaultValue="1">
          <option value="1">1 pack</option>
          <option value="2">2 packs</option>
          <option value="3">3 packs</option>
          <option value="4">4 packs</option>
          <option value="5">5 packs</option>
        </select>
      </label>
      <label>
        ZIP code <span>(optional—helps estimate shipping)</span>
        <input name="postalCode" inputMode="numeric" autoComplete="postal-code" maxLength={10} />
      </label>
      <label className="check-label consent-label">
        <input name="adultConsent" type="checkbox" value="yes" required />
        I confirm that I am at least 21 and want launch updates about this sticker pack.
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Saving your reservation…" : "Reserve my pack—free →"}
      </button>
      <small>No card required. This is an interest reservation, not a purchase.</small>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
