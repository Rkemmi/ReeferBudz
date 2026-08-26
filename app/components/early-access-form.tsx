"use client";

import { FormEvent, useId, useMemo, useState } from "react";

const FIND_OPTIONS = [
  { value: "friends", label: "New friends" },
  { value: "activity-partners", label: "Activity partners" },
  { value: "smoke-circles", label: "Smoke Circles and community" },
  { value: "local-events", label: "Local events" },
  { value: "conversation", label: "Good conversation" },
  { value: "other", label: "Something else friendship-focused" },
] as const;

type FormStatus = "idle" | "sending" | "success" | "error";

export function EarlyAccessForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const helperId = useId();
  const zipHintId = useId();
  const checkboxHintId = useId();

  const selectedSummary = useMemo(() => {
    if (selectedCount === 0) {
      return "Choose at least one.";
    }

    if (selectedCount === 1) {
      return "1 option selected.";
    }

    return `${selectedCount} options selected.`;
  }, [selectedCount]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const find = formData.getAll("find").filter((value): value is string => typeof value === "string");

    if (find.length === 0) {
      setStatus("error");
      setMessage("Choose at least one thing you hope to find on ReeferBudz.");
      return;
    }

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          adultConsent: formData.get("adultConsent"),
          postalCode: formData.get("postalCode"),
          neighborhood: formData.get("neighborhood"),
          find,
          otherDetails: formData.get("otherDetails"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message ?? "We could not save your spot. Please try again.");
        return;
      }

      form.reset();
      setSelectedCount(0);
      setStatus("success");
      setMessage("You’re officially on the Founding Budz waitlist. We’ll reach out when the first 100 invitations start moving.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <form className="signup-form founding-budz-form" onSubmit={submit} aria-busy={status === "sending"} noValidate>
      <label className="form-trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="founding-budz-badge" aria-label="Founding Budz 2026 badge concept">
        <span>Founding Budz 2026</span>
        <strong>One of the first 100</strong>
      </div>

      <p className="founding-budz-helper" id={helperId}>
        Share only what helps us build the first Cleveland-first friendship waitlist. Email is required. ZIP code,
        neighborhood, and extra details are optional.
      </p>

      <label htmlFor="founding-budz-email">
        Email address
        <input
          id="founding-budz-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
          maxLength={254}
          aria-describedby={helperId}
        />
      </label>

      <div className="field-row founding-budz-location-row">
        <label htmlFor="founding-budz-postal-code">
          Cleveland-area ZIP code <span>(optional)</span>
          <input
            id="founding-budz-postal-code"
            name="postalCode"
            autoComplete="postal-code"
            inputMode="numeric"
            placeholder="44113"
            maxLength={10}
            pattern="[0-9]{5}(?:-[0-9]{4})?"
            aria-describedby={zipHintId}
          />
        </label>
        <label htmlFor="founding-budz-neighborhood">
          Neighborhood or area <span>(optional)</span>
          <input
            id="founding-budz-neighborhood"
            name="neighborhood"
            autoComplete="address-level2"
            placeholder="Ohio City, Lakewood, Tremont..."
            maxLength={120}
          />
        </label>
      </div>

      <p className="field-note" id={zipHintId}>
        ZIP codes help spot Cleveland-area clusters. We are not asking for a street address.
      </p>

      <fieldset aria-describedby={checkboxHintId}>
        <legend>What are you hoping to find through ReeferBudz?</legend>
        <p className="field-note" id={checkboxHintId}>
          Pick all that fit. {selectedSummary}
        </p>
        <div className="checkbox-grid">
          {FIND_OPTIONS.map((option) => (
            <label className="check-label interest-chip" key={option.value}>
              <input
                type="checkbox"
                name="find"
                value={option.value}
                onChange={(event) => {
                  setSelectedCount((count) => count + (event.currentTarget.checked ? 1 : -1));
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="founding-budz-other-details">
        Anything else you want us to know? <span>(optional)</span>
        <textarea
          id="founding-budz-other-details"
          name="otherDetails"
          rows={4}
          maxLength={280}
          placeholder="Examples: looking for chill local hangs, walking buddies, event heads-up, or a conversation-first circle."
        />
      </label>

      <label className="check-label consent-label">
        <input name="adultConsent" type="checkbox" value="yes" required />
        I confirm that I am 21 or older and want ReeferBudz to contact me about the Founding Budz waitlist, early invitations, and launch updates.
      </label>

      <p className="privacy-note">
        ReeferBudz is a friendship-first community waitlist. This form is not for cannabis sales, purchases, delivery, or dating.
      </p>

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Saving your spot..." : "Join the first 100 →"}
      </button>

      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
