import type { Metadata } from "next";
import Link from "next/link";
import { EarlyAccessForm } from "../components/early-access-form";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = {
  title: "Founding Budz Waitlist",
  description: "Join the first 100 Founding Budz and help shape a Cleveland-born, friendship-first ReeferBudz launch.",
};

export default function EarlyAccess() {
  return (
    <PageShell>
      <section className="early-hero">
        <div className="early-hero-copy">
          <p className="eyebrow">You found the front door</p>
          <h1>Be one of the first 100 Founding Budz.</h1>
          <p className="hero-lead">
            ReeferBudz™ is building a Cleveland-first, friendship-focused waitlist for adults 21+ who want real
            people, real plans, and a better way to find their circle.
          </p>
          <Link className="button" href="#save-my-spot">Pull up a chair →</Link>
          <p className="early-microcopy">Free to join · Adults 21+ · Cleveland first · No cannabis sales</p>
        </div>
        <div className="early-hero-art">
          <span className="orbit orbit-one">Metroparks hangs</span>
          <span className="orbit orbit-two">Lakefront meetups</span>
          <span className="orbit orbit-three">Neighborhood plans</span>
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
          <h2>Don’t just watch the launch. Help shape who the first community is for.</h2>
        </div>
        <div className="perk-grid">
          <article>
            <span aria-hidden="true">✦</span>
            <h3>Help guide the first 100</h3>
            <p>Tell us what kinds of Cleveland-area friendship experiences should come first.</p>
          </article>
          <article>
            <span aria-hidden="true">◎</span>
            <h3>Get first-wave updates</h3>
            <p>Founding Budz hear first when the waitlist starts turning into real invitations.</p>
          </article>
          <article>
            <span aria-hidden="true">♥</span>
            <h3>Keep it friendship-first</h3>
            <p>ReeferBudz is about connection, conversation, shared interests, and local community, not dating or transactions.</p>
          </article>
        </div>
      </section>

      <section className="interest-party" aria-label="Possible ReeferBudz interests">
        <p>What could your first circle look like?</p>
        <div>
          <span>Friend nights</span>
          <span>Game plans</span>
          <span>Smoke Circles</span>
          <span>Local events</span>
          <span>Walks & outdoors</span>
          <span>Creative hangs</span>
          <span>Good conversation</span>
        </div>
      </section>

      <section className="form-section early-form-section" id="save-my-spot">
        <div className="early-form-intro">
          <p className="eyebrow">Your invitation starts here</p>
          <h2>Claim your Founding Budz spot.</h2>
          <p>
            Tell us where you are in the Cleveland area and what you hope to
            find. We’ll use that to shape the first 100 Founding Budz
            invitations and send thoughtful launch updates.
          </p>
          <ul>
            <li>This is a waitlist for a future community opening, not instant member access</li>
            <li>Founding Budz may hear first about invitations, product updates, and feedback opportunities</li>
            <li>We only ask for a little information and do not ask for your exact address</li>
          </ul>
        </div>
        <div className="form-card">
          <span className="form-sticker">Founding Budz</span>
          <EarlyAccessForm />
        </div>
      </section>
      <ClosingBanner
        eyebrow="The door is open"
        title="Your place in the first 100 starts here."
        description="Raise your hand now and help shape the first Cleveland-born ReeferBudz community."
        scene="early"
        sceneLabel="Welcome gate"
        mascotAlt="The ReeferBudz mascots opening the entrance to the community"
        actionLabel="Join the waitlist"
        actionHref="#save-my-spot"
      />
    </PageShell>
  );
}
