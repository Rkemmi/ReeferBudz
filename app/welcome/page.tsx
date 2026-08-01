import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "../components/site-chrome";

export const metadata: Metadata = { title: "Welcome" };

export default function Welcome() {
  return (
    <PageShell>
      <section className="welcome-panel">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Signup preview complete</p>
        <h1>Your seat is waiting.</h1>
        <p className="hero-lead">
          The account and emergency-contact steps are complete. Secure account
          creation, email confirmation, and age verification will be connected
          before this flow opens publicly.
        </p>
        <Link className="button" href="/">Return home</Link>
      </section>
      <ClosingBanner
        eyebrow="You made it"
        title="High five. Your chair is saved."
        description="The mascots are hanging the welcome sign while the first community circle takes shape."
        scene="celebration"
        sceneLabel="Welcome sign celebration"
        mascotAlt="The ReeferBudz mascots celebrating after hanging a welcome sign"
        actionLabel="Return home"
        actionHref="/"
      />
    </PageShell>
  );
}
