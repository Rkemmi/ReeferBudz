import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "./components/site-chrome";
import { StaticImage as Image } from "./components/static-image";

export const metadata: Metadata = {
  title: "Find Your Smoke Circle",
  description: "A friendship-first community for cannabis-friendly adults 21+ to discover local connection, shared interests, and a more human social experience.",
};

const steps = [
  { number: "01", title: "Build a profile that feels like you", body: "Share your interests, friendship goals, and only the location detail you are comfortable showing." },
  { number: "02", title: "Discover compatible Budz", body: "Find real adults through shared interests and privacy-conscious local discovery—not dating-style swiping." },
  { number: "03", title: "Grow your circle at your pace", body: "Start with discovery, shape your profile, and help build a friendship-first community at a comfortable pace." },
];

export default function Home() {
  return <PageShell><div className="home-relaunch">
    <section className="home-stage">
      <Image className="home-stage-art" src="/brand/scenes/home-lakefront-v4.png" alt="The ReeferBudz mascots setting up chairs, games, music, and art beside the Cleveland lakefront" fill priority sizes="100vw" />
      <div className="home-stage-copy">
        <p className="home-kicker"><span>21+</span> Cleveland born · Friendship first</p>
        <h1>Find Your<br /><em>Smoke Circle.</em></h1>
        <p>ReeferBudz™ is for cannabis-friendly adults 21+ who want shared interests, local connection, and a more comfortable way to meet real people.</p>
        <div className="home-stage-actions">
          <Link className="button" href="/signup">Create your account <span aria-hidden="true">→</span></Link>
          <p className="home-cta-note">Start with profile setup and member onboarding.</p>
        </div>
        <ul className="home-trust-list" aria-label="Community commitments"><li>Friendship, not dating</li><li>No cannabis sales</li><li>Adults 21+ only</li></ul>
      </div>
    </section>

    <section className="home-promise" aria-label="What makes ReeferBudz different">
      <Image className="home-promise-budz" src="/brand/reeferbudz-mascots.svg" alt="The ReeferBudz mascot pair" width={76} height={51} />
      <p>COME AS YOU ARE</p><strong>Shared interests. Real conversation. Friendship first.</strong><Link href="/how-it-works">See how ReeferBudz works →</Link>
    </section>

    <section className="home-now" aria-label="What you can do right now">
      <div className="home-section-heading">
        <p className="eyebrow">What you can do now</p>
        <h2>Clear next steps. No fake promises.</h2>
        <p>Create an account, complete your member setup, and move through the current private-member path as it exists today.</p>
      </div>
      <div className="home-now-grid">
        <article>
          <span>01</span>
          <h3>Create your account</h3>
          <p>Start with account access and the current member onboarding flow.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Build your profile</h3>
          <p>Add your interests, preferences, and only the information you are comfortable sharing.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Explore what is live</h3>
          <p>See the current member experience without pretending every future feature is already ready.</p>
        </article>
      </div>
    </section>

    <section className="home-path">
      <div className="home-section-heading"><p className="eyebrow">How your circle grows</p><h2>From “I should get out more” to “these are my people.”</h2><p>The MVP is being shaped around a simple, comfortable path that starts with profile, discovery, and community direction.</p></div>
      <div className="home-path-grid">{steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
      <Link className="text-action" href="/how-it-works">Walk through the full experience →</Link>
    </section>

    <ClosingBanner eyebrow="Adults 21+ only" title="Pull up a chair. Your circle is waiting." description="Create your account and explore a friendship-first community built around shared interests, privacy, and real local connection." scene="gathering" sceneLabel="Cleveland lakefront community" mascotAlt="The ReeferBudz mascots welcoming adults into a warm Cleveland lakefront gathering" actionLabel="Create your account" actionHref="/signup" />

  </div></PageShell>;
}
