import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Follow the honest path from Founding Bud to the first ReeferBudz Smoke Circles.",
};

const journey = [
  ["Join early access", "Confirm you are 21 or older and tell us you want to help build the first community.", "now"],
  ["Share what matters", "Tell us which interests, friendship features, safety expectations, and Circle ideas matter most.", "now"],
  ["Receive an invitation", "When early access is ready, Founding Budz will be invited into the first community experience.", "next"],
  ["Build your profile", "Share interests, activities, friendship goals, availability, and only the location details you are comfortable sharing.", "next"],
  ["Discover common ground", "Explore potential connections through shared interests—not dating behavior or popularity.", "later"],
  ["Help create Circles", "As the community grows, turn shared interests into welcoming local Smoke Circles.", "later"],
];

export default function HowItWorks() {
  return (
    <main className="story-how">
      <div className="age-bar"><span className="age-badge">21+</span>Adults only. Friendship, never cannabis sales.</div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="ReeferBudz home">
          <Image src="/brand/reeferbudz-wordmark.png" alt="ReeferBudz" width={320} height={116} priority unoptimized />
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-current" href="/how-it-works">How It Works</a>
          <a href="/#vision">The Vision</a>
          <a href="/#trust">Safety</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="/#story">Our Story</a>
          <a className="button button-small button-green" href="#join">Join Early Access</a>
        </div>
      </header>

      <section className="story-how-hero">
        <p className="eyebrow"><span className="eyebrow-dot" />How we build the first circle</p>
        <h1>One honest step<br />at a time.</h1>
        <p>
          Some parts of ReeferBudz are open now. Others are being designed.
          This is the real path from early supporter to a working community.
        </p>
        <a className="story-text-link" href="#journey">Follow the path ↓</a>
      </section>

      <section className="story-how-status" aria-label="Current development status">
        <div><b>Now</b><span>Early access and community input</span></div>
        <div><b>Next</b><span>Invitations, profiles, and privacy choices</span></div>
        <div><b>Later</b><span>Discovery, connection, and Smoke Circles</span></div>
      </section>

      <section className="story-journey" id="journey">
        <div className="story-journey-intro">
          <p className="story-section-number">THE JOURNEY</p>
          <p className="eyebrow">From voice to community</p>
          <h2>The path is simple.<br />The people shape it.</h2>
          <p>No fake activity. No invented members. No promises disguised as finished features.</p>
        </div>
        <ol>
          {journey.map(([title, copy, phase], index) => (
            <li key={title}>
              <span className={`story-journey-dot dot-${phase}`}>{String(index + 1).padStart(2, "0")}</span>
              <div><small>{phase}</small><h3>{title}</h3><p>{copy}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-how-promise">
        <p className="story-section-number">THE PROMISE</p>
        <h2>What will stay true as ReeferBudz grows.</h2>
        <div>
          <p><strong>Friendship first.</strong> Not a dating or hookup platform.</p>
          <p><strong>Adults only.</strong> Intended exclusively for people aged 21 and older.</p>
          <p><strong>No marketplace.</strong> No cannabis sales, delivery, or transaction arrangements.</p>
          <p><strong>Safety from day one.</strong> Privacy, reporting, blocking, and meeting guidance are foundational.</p>
        </div>
      </section>

      <section className="story-banner story-how-closing" id="join">
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-story">Take the first step</p>
          <h2>Your profile can wait.<br />Your voice matters now.</h2>
          <p>Join the Founding Budz and help decide what ReeferBudz should become.</p>
          <a className="button button-primary" href="/#join">Join Early Access <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src="/brand/reeferbudz-primary-logo.png" alt="ReeferBudz" width={360} height={244} unoptimized />
          <p>Find Your Smoke Circle.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><a href="/how-it-works">How It Works</a><a href="/#vision">The Vision</a><a href="/#trust">Safety</a></div>
          <div><strong>Company</strong><a href="/#story">Our Story</a><a href="/#guidelines">Community Guidelines</a><a href="/#contact">Contact</a></div>
          <div><strong>Legal</strong><a href="/#privacy">Privacy</a><a href="/#terms">Terms</a><a href="/#accessibility">Accessibility</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 ReeferBudz™</span><span>For adults 21+. No cannabis sales or transactions.</span></div>
      </footer>
    </main>
  );
}
