import type { Metadata } from "next";
import { EarlyAccessForm } from "../components/early-access-form";
import { PageHero, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Join Early Access",
  description: "Become a Founding Bud and help shape the first ReeferBudz community experience.",
};

export default function EarlyAccess() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Founding Budz"
        title="Help build the circle before the doors open."
        intro="Share what you hope to find, receive thoughtful progress updates, and be among the first considered for community access."
      />
      <section className="form-section">
        <div>
          <h2>Save your spot</h2>
          <p>We’ll use your information only for early-access planning and updates. Joining the list does not guarantee admission or a specific launch date.</p>
        </div>
        <EarlyAccessForm />
      </section>
    </PageShell>
  );
}
