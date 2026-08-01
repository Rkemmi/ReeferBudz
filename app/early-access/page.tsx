import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EarlyAccessForm } from "../components/early-access-form";
import { ClosingBanner, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Join Early Access",
  description: "Become a Founding Bud and help shape the first ReeferBudz community experience.",
};

export default function EarlyAccess() {
  return (
    <PageShell>
      <section className="early-hero">
        <div className="early-hero-copy">
          <p className="eyebrow">You found the front door</p>
          <h1>Your future circle could start right here.</h1>
          <p className="hero-lead">
            Be one of the Founding Budz helping shape a friendship-first
            community for cannabis-friendly adults.
          </p>
          <Link className="button" href="#save-my-spot">Pull up a chair →</Link>
          <p className="early-microcopy">Free to join · Adults 21+ · No cannabis sales</p>
        </div>
        <div className="early-hero-art">
          <span className="orbit orbit-one">Music nights</span>
          <span className="orbit orbit-two">Game days</span>
          <span className="orbit orbit-three">Lakefront hangs</span>
          <Image
            src="/brand/reeferbudz-mascots.svg"
            alt="The canonical ReeferBudz mascot pair celebrating a new connection"
            width={1024}
            height={682}
            priority
          />
        </div>
      </section>

      <section className="founder-perks">
        <div className="section-heading">
          <p className="eyebrow">Why join early?</p>
          <h2>Don’t just wait for the community. Help give it a personality.</h2>
        </div>
        <div className="perk-grid">
          <article>
            <span aria-hidden="true">✦</span>
            <h3>Shape the experience</h3>
            <p>Tell us which interests, safety tools, and local Circle ideas matter most.</p>
          </article>
          <article>
            <span aria-hidden="true">◎</span>
            <h3>Get the first invite</h3>
            <p>Be among the first people considered when the early community opens.</p>
          </article>
          <article>
            <span aria-hidden="true">♥</span>
            <h3>Find your kind of people</h3>
            <p>Help build a space where friendship starts with something genuinely shared.</p>
          </article>
        </div>
      </section>

      <section className="interest-party" aria-label="Possible ReeferBudz interests">
        <p>What could your circle be into?</p>
        <div>
          <span>Live music</span>
          <span>Gaming</span>
          <span>Art & making</span>
          <span>Food adventures</span>
          <span>Outdoors</span>
          <span>Movies</span>
          <span>Good conversation</span>
        </div>
      </section>

      <section className="form-section early-form-section" id="save-my-spot">
        <div className="early-form-intro">
          <p className="eyebrow">Your invitation starts here</p>
          <h2>Save your spot in the circle.</h2>
          <p>
            Tell us just enough to say hello. We’ll send thoughtful progress
            updates and let you know when the first community experience is
            ready.
          </p>
          <ul>
            <li>No spam or sold information</li>
            <li>No pressure to be “social enough”</li>
            <li>Unsubscribe whenever you want</li>
          </ul>
        </div>
        <div className="form-card">
          <span className="form-sticker">Founding Bud</span>
          <EarlyAccessForm />
        </div>
      </section>
      <ClosingBanner
        eyebrow="The door is open"
        title="Your seat in the circle starts here."
        description="Raise your hand now and help give the first ReeferBudz community its personality."
        scene="signup"
        sceneLabel="Welcome gate"
        mascotAlt="The ReeferBudz mascots opening the entrance to the community"
        actionLabel="Save my spot"
        actionHref="#save-my-spot"
      />
    </PageShell>
  );
}
