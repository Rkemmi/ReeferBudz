import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Founding Budz can help shape ReeferBudz from early access to the first Smoke Circles.",
};

const foundingSteps = [
  {
    number: "01",
    phase: "now",
    label: "Available now",
    title: "Join early access",
    copy: "Become a Founding Bud and tell us you want to help build the first ReeferBudz community.",
  },
  {
    number: "02",
    phase: "now",
    label: "Available now",
    title: "Confirm the 21+ requirement",
    copy: "Confirm that you are 21 or older. ReeferBudz is being created exclusively for adults.",
  },
  {
    number: "03",
    phase: "now",
    label: "Available now",
    title: "Help shape the community",
    copy: "Share the interests, Circle ideas, safety expectations, and friendship features that matter to you.",
  },
  {
    number: "04",
    phase: "design",
    label: "Being designed",
    title: "Build a profile",
    copy: "Create a friendship-first profile based on your interests, activities, availability, and privacy choices.",
  },
  {
    number: "05",
    phase: "design",
    label: "Being designed",
    title: "Discover common interests",
    copy: "Explore potential connections through shared interests and activities—not popularity or dating behavior.",
  },
  {
    number: "06",
    phase: "design",
    label: "Being designed",
    title: "Connect safely",
    copy: "Start conversations with clear privacy choices, reporting tools, blocking, and responsible meeting guidance.",
  },
  {
    number: "07",
    phase: "later",
    label: "Available later",
    title: "Help create the first Smoke Circles",
    copy: "As the community grows, Founding Budz can help turn shared interests into welcoming local Circle ideas.",
  },
  {
    number: "08",
    phase: "later",
    label: "The long-term goal",
    title: "Turn online connection into real friendship",
    copy: "Move at your own pace and build genuine friendships that can grow beyond the screen.",
  },
];

export default function HowItWorks() {
  return (
    <main>
      <div className="age-bar">
        <span className="age-badge">21+</span>
        A community for adults. Friendship and connection—never cannabis sales.
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="ReeferBudz home">
          <Image
            src="/brand/reeferbudz-wordmark.png"
            alt="ReeferBudz"
            width={320}
            height={116}
            priority
          />
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-current" href="/how-it-works">How It Works</a>
          <a href="/#community">Community</a>
          <a href="/#safety">Safety</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="/#our-story">Our Story</a>
          <a className="button button-small button-green" href="#join">
            Join Early Access
          </a>
        </div>
      </header>

      <section className="process-hero">
        <div className="process-hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            How ReeferBudz grows
          </p>
          <h1>From one idea<br />to the first circle.</h1>
          <p>
            ReeferBudz is not pretending the community already exists. Founding
            Budz will help shape it—and this is the path we’ll follow together.
          </p>
          <a className="button button-primary" href="#journey">
            Follow the journey <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="process-hero-art">
          <div className="process-orbit">
            <span>PROFILE</span>
            <span>CONNECT</span>
            <span>CIRCLE</span>
          </div>
          <Image
            src="/brand/reeferbudz-mascots.png"
            alt="The ReeferBudz mascots beginning the community journey"
            width={1024}
            height={682}
            priority
          />
        </div>
      </section>

      <section className="now-next">
        <div>
          <span className="status-dot" />
          <p>Available now</p>
          <strong>Join the Founding Budz early-access list.</strong>
        </div>
        <div>
          <span className="status-dot status-future" />
          <p>Being designed</p>
          <strong>Profiles, discovery, connections, messages, and Circles.</strong>
        </div>
        <div>
          <span className="status-dot status-goal" />
          <p>Available later</p>
          <strong>The first Smoke Circles and real-world friendship.</strong>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-intro">
          <p className="eyebrow">The founding journey</p>
          <h2>Eight clear steps.<br />No fake shortcuts.</h2>
          <p>
            We will build deliberately, protect the culture early, and only
            promise features when they are ready.
          </p>
        </div>
        <div className="journey-list">
          {foundingSteps.map((step) => (
            <article className={`journey-step journey-${step.phase}`} key={step.number}>
              <span className="journey-number">{step.number}</span>
              <div>
                <p>{step.label}</p>
                <h3>{step.title}</h3>
                <span>{step.copy}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section">
        <div className="principles-title">
          <p className="eyebrow">The rules of the road</p>
          <h2>What will not change as we grow.</h2>
        </div>
        <div className="principles-grid">
          <article><b>01</b><h3>Friendship first</h3><p>ReeferBudz is not designed as a dating or hookup platform.</p></article>
          <article><b>02</b><h3>No marketplace</h3><p>No cannabis sales, delivery, or transaction arrangements.</p></article>
          <article><b>03</b><h3>Adults only</h3><p>The community is intended exclusively for adults aged 21 and older.</p></article>
          <article><b>04</b><h3>Safety is foundational</h3><p>Privacy, reporting, blocking, and responsible meeting guidance are core features.</p></article>
        </div>
      </section>

      <section className="how-story-banner" id="join">
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-story">Take the first step</p>
          <h2>Your profile can wait.<br />Your voice matters now.</h2>
          <p>
            Join the Founding Budz and help decide what ReeferBudz should become
            before the first full community experience opens.
          </p>
          <a className="button button-primary" href="/#join">
            Join Early Access <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image
            src="/brand/reeferbudz-wordmark.png"
            alt="ReeferBudz"
            width={260}
            height={94}
            unoptimized
          />
          <p>Find Your Smoke Circle.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <a href="/how-it-works">How It Works</a>
            <a href="/#community">Smoke Circles</a>
            <a href="/#safety">Safety</a>
          </div>
          <div>
            <strong>Company</strong>
            <a href="/#about">About</a>
            <a href="/#guidelines">Community Guidelines</a>
            <a href="/#contact">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/#privacy">Privacy</a>
            <a href="/#terms">Terms</a>
            <a href="/#accessibility">Accessibility</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ReeferBudz™</span>
          <span>For adults 21+. No cannabis sales or transactions.</span>
        </div>
      </footer>
    </main>
  );
}
