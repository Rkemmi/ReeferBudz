import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingBanner, PageShell } from "./components/site-chrome";

export const metadata: Metadata = {
  title: "Find Your Smoke Circle",
  description:
    "A 21+ social community for cannabis-friendly adults to make friends, discover local connections, and find their smoke circle.",
};

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero">
        <div>
          <p className="eyebrow">Cleveland born · Friendship first</p>
          <h1>Find Your<br /><span>Smoke Circle.</span></h1>
          <p className="hero-lead">
            ReeferBudz™ is a 21-and-over social community helping cannabis-friendly
            adults turn shared interests into real friendship and community.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/early-access">Become a Founding Bud →</Link>
            <Link className="text-action" href="/how-it-works">See how it works</Link>
          </div>
          <small>Adults 21+ · Friendship, not dating · No cannabis sales</small>
        </div>
        <div className="hero-art">
          <Image
            src="/brand/reeferbudz-mascots.svg"
            alt="The canonical ReeferBudz high-five mascot pair"
            width={1024}
            height={682}
            priority
          />
        </div>
      </section>

      <section className="value-strip" aria-label="ReeferBudz values">
        <span>Friendship first</span><b>•</b><span>Adults 21+</span><b>•</b>
        <span>Shared interests</span><b>•</b><span>Safer meetups</span>
      </section>

      <section className="split-section" id="vision">
        <div>
          <p className="eyebrow">The vision</p>
          <h2>Belonging starts with something in common.</h2>
        </div>
        <div>
          <p>
            Music nights, lakefront walks, gaming sessions, art days, food
            adventures, and good conversation. ReeferBudz is designed around
            the things people already enjoy—not pressure to perform.
          </p>
          <Link className="text-action" href="/how-it-works">Follow the path →</Link>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">Built with care</p>
          <h2>Community only works when people feel protected.</h2>
        </div>
        <div className="card-grid">
          <article><span>01</span><h3>Adults only</h3><p>Age checks help keep the community exclusively 21 and over.</p></article>
          <article><span>02</span><h3>Consent at every step</h3><p>Boundaries, privacy choices, and meetup plans stay in your control.</p></article>
          <article><span>03</span><h3>Practical safety tools</h3><p>Guardian support, emergency contacts, and hangout alarms are part of the plan.</p></article>
        </div>
        <Link className="button button-outline" href="/safety">Visit the Safety Center</Link>
      </section>

      <ClosingBanner
        eyebrow="Founding Budz wanted"
        title="Pull up a chair. Your circle is waiting."
        description="Join early access and help shape the community before its first doors open."
      />
    </PageShell>
  );
}
