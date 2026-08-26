"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function LaunchListForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/launch-list", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message ?? "We could not save your email right now. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");
      setMessage("You're on the list. We'll let you know when ReeferBudz™ is ready to open its doors.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <form className="launch-list-form" onSubmit={submit} aria-busy={status === "sending"}>
      <label className="form-trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label htmlFor="launch-list-email">
        Email address
        <input
          id="launch-list-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
          maxLength={254}
        />
      </label>

      <label className="check-label consent-label launch-list-consent">
        <input name="adultConsent" type="checkbox" value="yes" required />
        I confirm that I am at least 21 years old and want launch updates from ReeferBudz™.
      </label>

      <button className="button launch-list-button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "KEEPING YOU POSTED..." : "KEEP ME POSTED"}
      </button>

      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
