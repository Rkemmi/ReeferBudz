import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ReeferBudz | Find Your Smoke Circle",
  description:
    "A friendship-first community for cannabis-friendly adults 21 and over.",
};

const steps = [
  {
    number: "01",
    title: "Build your profile",
    copy: "Share your interests, friendship goals, favorite activities, and the kind of community you want.",
  },
  {
    number: "02",
    title: "Discover your Budz",
    copy: "Meet compatible adults nearby through shared interests, availability, and cannabis-friendly lifestyles.",
  },
  {
    number: "03",
    title: "Find your circle",
    copy: "Connect one-to-one or join local Smoke Circles built around friendship, activities, and belonging.",
  },
];

const communityPoints = [
  "Friendship first—not dating",
  "Private, respectful connections",
  "Local interest-based Smoke Circles",
  "Clear reporting and blocking tools",
];

export default function Home() {
  return (
    <main>
      <div className="age-bar">
        <span className="age-badge">21+</span>
        A community for adults. Friendship and connection—never cannabis sales.
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="ReeferBudz home">
          <Image
            src="/brand/reeferbudz-wordmark.png"
            alt="ReeferBudz"
            width={320}
            height={116}
            priority
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How It Works</a>
          <a href="#community">Community</a>
          <a href="#safety">Safety</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="#sign-in">
            Sign In
          </a>
          <a className="button button-small button-green" href="#join">
            Create Account
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Cannabis-friendly. Friendship-focused.
          </p>
          <h1>
            Find the people who
            <span> feel like your people.</span>
          </h1>
          <p className="hero-lead">
            ReeferBudz helps cannabis-friendly adults make genuine friends,
            discover local communities, and find their smoke circle.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#join">
              Find Your Smoke Circle
              <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#how-it-works">
              See How It Works
            </a>
          </div>
          <p className="microcopy">
            <span aria-hidden="true">✓</span> Free to join
            <span aria-hidden="true">•</span> Adults 21+
            <span aria-hidden="true">•</span> Community safety built in
          </p>
        </div>

        <div className="hero-art" aria-label="The ReeferBudz mascots">
          <div className="location-chip chip-one">
            <span className="pin" aria-hidden="true">●</span>
            New Budz nearby
          </div>
          <div className="location-chip chip-two">
            <span aria-hidden="true">✦</span>
            8 shared interests
          </div>
          <div className="mascot-stage">
            <div className="stage-ring" />
            <Image
              src="/brand/reeferbudz-mascots.png"
              alt="Two friendly ReeferBudz cannabis-leaf mascots greeting each other"
              width={1024}
              height={682}
              priority
            />
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="ReeferBudz principles">
        <p><strong>Built for belonging.</strong> Designed around real friendship.</p>
        <div>
          <span>21+ community</span>
          <span>Safety focused</span>
          <span>No sales or delivery</span>
        </div>
      </section>

      <section className="section how" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Your circle could be closer than you think.</h2>
          <p>
            A few thoughtful steps help you meet people with more in common
            than a ZIP code.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="community-art">
          <div className="circle-card circle-card-one">
            <div className="circle-icon">☀</div>
            <div>
              <strong>Lakefront Chillers</strong>
              <span>Outdoor hangs · Cleveland</span>
            </div>
          </div>
          <div className="circle-card circle-card-two">
            <div className="circle-icon">♫</div>
            <div>
              <strong>Vinyl & Vibes</strong>
              <span>Music lovers · 86 members</span>
            </div>
          </div>
          <div className="circle-card circle-card-three">
            <div className="circle-icon">✦</div>
            <div>
              <strong>Creative Budz</strong>
              <span>Art, ideas & good company</span>
            </div>
          </div>
        </div>
        <div className="community-copy">
          <p className="eyebrow">More than a match</p>
          <h2>Community grows around what you already love.</h2>
          <p>
            Smoke Circles make it easier to find your kind of people—whether
            you’re into live music, gaming, hiking, art, food, or relaxed local
            meetups.
          </p>
          <ul>
            {communityPoints.map((point) => (
              <li key={point}><span aria-hidden="true">✓</span>{point}</li>
            ))}
          </ul>
          <a className="inline-link" href="#join">
            Explore Smoke Circles <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="safety-section" id="safety">
        <div className="safety-mark" aria-hidden="true">
          <Image
            src="/brand/reeferbudz-emblem.png"
            alt=""
            width={512}
            height={512}
          />
        </div>
        <div className="safety-copy">
          <p className="eyebrow eyebrow-light">Safe by design</p>
          <h2>Good connections start with trust.</h2>
          <p>
            Age requirements, privacy choices, community rules, and simple
            reporting tools are built into the experience from day one.
          </p>
          <a href="#safety-center">Visit the Safety Center <span aria-hidden="true">→</span></a>
        </div>
        <div className="safety-points">
          <div><strong>21+</strong><span>Adults-only community</span></div>
          <div><strong>Private</strong><span>You control what others see</span></div>
          <div><strong>Protected</strong><span>Block and report anytime</span></div>
        </div>
      </section>

      <section className="join-section" id="join">
        <div>
          <p className="eyebrow">Your people are out there</p>
          <h2>Ready to find your smoke circle?</h2>
          <p>Create your profile and start building real community.</p>
        </div>
        <a className="button button-primary" href="#create-account">
          Create Your Free Account <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer>
        <div className="footer-brand">
          <Image
            src="/brand/reeferbudz-wordmark.png"
            alt="ReeferBudz"
            width={260}
            height={94}
          />
          <p>Find Your Smoke Circle.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <a href="#how-it-works">How It Works</a>
            <a href="#community">Smoke Circles</a>
            <a href="#safety">Safety</a>
          </div>
          <div>
            <strong>Company</strong>
            <a href="#about">About</a>
            <a href="#guidelines">Community Guidelines</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#accessibility">Accessibility</a>
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
