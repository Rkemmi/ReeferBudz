"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const latestAdultBirthDate = new Date();
  latestAdultBirthDate.setFullYear(latestAdultBirthDate.getFullYear() - 21);
  const maximumBirthDate = latestAdultBirthDate.toISOString().slice(0, 10);

  function continueSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/signup/emergency-contact");
  }

  return (
    <form className="signup-form account-form" onSubmit={continueSignup}>
      <label>
        Username
        <input
          name="username"
          autoComplete="username"
          required
          minLength={3}
          maxLength={30}
          pattern="[A-Za-z0-9._-]+"
          aria-describedby="username-help"
        />
        <small id="username-help">3–30 characters using letters, numbers, periods, underscores, or hyphens.</small>
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
      <label>
        Phone number
        <input name="phone" type="tel" autoComplete="tel" required maxLength={30} />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={12}
          aria-describedby="password-help"
        />
        <small id="password-help">Use at least 12 characters and avoid a password used on another account.</small>
      </label>
      <label>
        Date of birth
        <input
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
          min="1900-01-01"
          max={maximumBirthDate}
          required
        />
        <small>ReeferBudz is exclusively for adults age 21 and over.</small>
      </label>

      <section className="agreement-box" aria-labelledby="safety-agreement-title">
        <h2 id="safety-agreement-title">Safety Agreement</h2>
        <p>
          As part of signup, you agree to provide at least one trusted emergency
          contact on the next screen. If a hangout check-in indicates a possible
          emergency, ReeferBudz may share relevant safety information with that
          contact according to your settings.
        </p>
        <p>
          You are responsible for getting your contact’s permission before
          providing their information and for keeping it accurate. ReeferBudz
          does not replace emergency services.
        </p>
        <label className="check-label consent-label">
          <input name="safetyAgreement" type="checkbox" required />
          I understand and agree to provide an emergency contact on the next screen.
        </label>
      </section>

      <label className="check-label">
        <input name="termsAgreement" type="checkbox" required />
        I am at least 21 years old and agree to the Terms, Privacy Notice, and Community Guidelines.
      </label>

      <button className="button" type="submit">Continue to emergency contact →</button>
      <p className="form-note">
        This preview does not create or save an account yet.
      </p>
    </form>
  );
}

export function EmergencyContactForm() {
  const router = useRouter();

  function finishPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/welcome");
  }

  return (
    <form className="signup-form account-form" onSubmit={finishPreview}>
      <label>
        Contact’s full name
        <input name="contactName" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Relationship to you
        <input name="relationship" required maxLength={80} placeholder="Friend, sibling, partner…" />
      </label>
      <label>
        Contact’s phone number
        <input name="contactPhone" type="tel" autoComplete="tel" required maxLength={30} />
      </label>
      <label>
        Contact’s email <span>(optional)</span>
        <input name="contactEmail" type="email" autoComplete="email" maxLength={254} />
      </label>
      <label className="check-label consent-label">
        <input name="contactPermission" type="checkbox" required />
        I have this person’s permission to provide their information and identify them as my emergency contact.
      </label>
      <button className="button" type="submit">Save contact and continue →</button>
      <button className="text-button" type="button" onClick={() => router.back()}>
        ← Back to account details
      </button>
      <p className="form-note">
        This preview does not save emergency-contact information yet.
      </p>
    </form>
  );
}
