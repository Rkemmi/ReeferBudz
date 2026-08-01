import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageHero, PageShell } from "../components/site-chrome";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Let’s keep the conversation open."
        intro="Choose the destination that best matches what you need. We’ll expand these support options as early access grows."
      />
      <section className="contact-grid">
        <article><h2>General questions</h2><p>Questions about ReeferBudz, partnerships, or the Founding Budz program.</p><a className="text-action" href="mailto:hello@reeferbudz.com">hello@reeferbudz.com</a></article>
        <article><h2>Safety concerns</h2><p>Report concerning conduct or ask about planned community protections.</p><a className="text-action" href="mailto:safety@reeferbudz.com">safety@reeferbudz.com</a></article>
        <article><h2>Accessibility</h2><p>Tell us about a barrier or request an accessible alternative.</p><a className="text-action" href="mailto:accessibility@reeferbudz.com">accessibility@reeferbudz.com</a></article>
      </section>
      <section className="notice-panel">
        <h2>Need immediate help?</h2>
        <p>ReeferBudz does not provide emergency services. If you or someone else is in immediate danger, contact your local emergency services.</p>
        <Link className="button button-outline" href="/safety">Review Safety guidance</Link>
      </section>
      <ClosingBanner
        eyebrow="Pass the note"
        title="Say hello. We’re listening."
        description="Questions, ideas, and thoughtful feedback all help shape a better community."
        scene="contact"
        sceneLabel="Mailbox meetup"
        mascotAlt="The ReeferBudz mascots exchanging friendly notes at a community mailbox"
      />
    </PageShell>
  );
}
