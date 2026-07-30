import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How It Works",
  description: "See how ReeferBudz grows from Founding Budz into real friendship and local Smoke Circles.",
};

export default function HowItWorks() {
  return (
    <main className="invite-how">
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

      <section className="invite-hero">
        <div className="invite-hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />Your circle starts here</p>
          <h1>Come as you are.<br /><span>Find who gets you.</span></h1>
          <p>
            ReeferBudz is building a friendship-first community around the
            things you already enjoy—and the people you have not met yet.
          </p>
          <div className="invite-actions">
            <a className="button button-primary" href="#join">I want in <span aria-hidden="true">→</span></a>
            <a className="invite-link" href="#path">Show me the path ↓</a>
          </div>
        </div>
        <div className="invite-hero-art">
          <div className="invite-sun" aria-hidden="true" />
          <Image
            src="/brand/reeferbudz-mascots.png"
            alt="The ReeferBudz mascots welcoming you to the community"
            width={1024}
            height={682}
            priority
            unoptimized
          />
          <span className="invite-bubble bubble-one">Music?</span>
          <span className="invite-bubble bubble-two">Gaming?</span>
          <span className="invite-bubble bubble-three">Good conversation?</span>
        </div>
      </section>

      <div className="invite-ribbon" aria-label="ReeferBudz community values">
        <span>Friendship first</span><b>✦</b><span>Adults 21+</span><b>✦</b>
        <span>Your pace</span><b>✦</b><span>Your interests</span><b>✦</b><span>Your circle</span>
      </div>

      <section className="invite-path" id="path">
        <div className="invite-path-intro">
          <p className="story-section-number">HOW IT GROWS</p>
          <h2>Three moments.<br />One real beginning.</h2>
          <p>You do not need a perfect profile or a packed social calendar. You only need a reason to say hello.</p>
        </div>

        <article className="invite-moment moment-one">
          <div className="moment-number">01</div>
          <div className="moment-copy">
            <small>RIGHT NOW</small>
            <h3>Raise your hand.</h3>
            <p>Join early access and tell us what would make this community feel worth showing up for.</p>
            <span>Join early access · Share your voice</span>
          </div>
          <div className="moment-word" aria-hidden="true">HELLO</div>
        </article>

        <article className="invite-moment moment-two">
          <div className="moment-number">02</div>
          <div className="moment-copy">
            <small>COMING NEXT</small>
            <h3>Find the common ground.</h3>
            <p>Build a profile around your interests, your friendship goals, and what you actually like doing.</p>
            <span>Create your profile · Discover shared interests</span>
          </div>
          <div className="moment-word" aria-hidden="true">SAME</div>
        </article>

        <article className="invite-moment moment-three">
          <div className="moment-number">03</div>
          <div className="moment-copy">
            <small>AS WE GROW</small>
            <h3>Turn a connection into a circle.</h3>
            <p>Start a conversation, move at your pace, and help shared interests grow into local Smoke Circles.</p>
            <span>Connect safely · Build real community</span>
          </div>
          <div className="moment-word" aria-hidden="true">US</div>
        </article>
      </section>

      <section className="invite-picture">
        <div>
          <p className="story-section-number">PICTURE THIS</p>
          <h2>You arrive knowing<br />you already have something in common.</h2>
        </div>
        <p>
          A listening party. A game night. A lakefront walk. A creative meetup.
          ReeferBudz is not about collecting matches. It is about making the
          first hello feel easier.
        </p>
      </section>

      <section className="invite-trust">
        <p className="eyebrow">The non-negotiables</p>
        <h2>Welcoming does not mean careless.</h2>
        <div>
          <span><b>21+</b> Adults only</span>
          <span><b>Friends</b> Not dating</span>
          <span><b>No sales</b> No transactions</span>
          <span><b>Your control</b> Privacy and safety tools</span>
        </div>
      </section>

      <section className="story-banner story-how-closing invite-closing" id="join">
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-story">The circle is still forming</p>
          <h2>There is room<br />for you in it.</h2>
          <p>Become a Founding Bud and help turn ReeferBudz into the community you would actually join.</p>
          <a className="button button-primary" href="/#join">Save my spot <span aria-hidden="true">→</span></a>
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
