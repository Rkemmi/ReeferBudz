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
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-route" aria-hidden="true">
          <span className="route-dot route-a" />
          <span className="route-dot route-b" />
          <span className="route-dot route-c" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Cleveland born · Community bound
          </p>
          <h1>
            Your people
            <span>are out there.</span>
            <em>Let’s find them.</em>
          </h1>
          <p className="hero-lead">
            A friendship-first community where cannabis-friendly adults meet
            through real interests, local energy, and the kind of connection
            that gets you off the couch.
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
          <div className="hero-city">CLEVELAND · 41.4993° N</div>
          <div className="location-chip chip-one">
            <span className="pin" aria-hidden="true">●</span>
            12 Budz in your orbit
          </div>
          <div className="location-chip chip-two">
            <span aria-hidden="true">✦</span>
            8 shared interests
          </div>
          <div className="location-chip chip-three">
            <span aria-hidden="true">○</span>
            Vinyl & Vibes · Friday
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

      <div className="interest-ribbon" aria-label="Popular ReeferBudz interests">
        <div>
          <span>LIVE MUSIC</span><b>✦</b>
          <span>GAMING</span><b>✦</b>
          <span>LAKEFRONT HANGS</span><b>✦</b>
          <span>ART & MAKING</span><b>✦</b>
          <span>FOOD ADVENTURES</span><b>✦</b>
          <span>OUTDOORS</span><b>✦</b>
          <span>GOOD CONVERSATION</span><b>✦</b>
        </div>
      </div>

      <section className="section how" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">The shortest route to your people</p>
          <h2>Less swiping.<br />More actually clicking.</h2>
          <p>
            ReeferBudz starts with who you are and what you genuinely enjoy—not
            a popularity contest.
          </p>
        </div>
        <div className="connection-trail" aria-hidden="true">
          <span />
          <span />
          <span />
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

      <section className="manifesto-break" aria-label="What makes ReeferBudz different">
        <span>NO DATING GAME.</span>
        <span>NO DEALER MARKETPLACE.</span>
        <strong>JUST YOUR PEOPLE.</strong>
      </section>

      <section className="community-section" id="community">
        <div className="community-art">
          <div className="orbit-label">YOUR CLEVELAND ORBIT</div>
          <div className="profile-card profile-one">
            <div className="profile-avatar avatar-orange">M</div>
            <div><strong>Maya, 29</strong><span>Art · Hiking · Live music</span></div>
            <b>92%</b>
          </div>
          <div className="profile-card profile-two">
            <div className="profile-avatar avatar-lime">J</div>
            <div><strong>Jordan, 34</strong><span>Gaming · Food · Vinyl</span></div>
            <b>88%</b>
          </div>
          <div className="circle-card circle-card-one">
            <div className="circle-icon">
              <Image src="/brand/icons/outdoor-setting.png" alt="" width={64} height={64} />
            </div>
            <div>
              <strong>Lakefront Chillers</strong>
              <span>Outdoor hangs · 2.4 mi</span>
            </div>
          </div>
          <div className="circle-card circle-card-two">
            <div className="circle-icon circle-icon-type">♫</div>
            <div>
              <strong>Vinyl & Vibes</strong>
              <span>Music lovers · 86 members</span>
            </div>
          </div>
          <div className="circle-card circle-card-three">
            <div className="circle-icon">
              <Image src="/brand/icons/smoke-circle.png" alt="" width={64} height={64} />
            </div>
            <div>
              <strong>Creative Budz</strong>
              <span>Art, ideas & good company</span>
            </div>
          </div>
        </div>
        <div className="community-copy">
          <p className="eyebrow">Your social orbit, reimagined</p>
          <h2>Not a feed.<br />A way into real life.</h2>
          <p>
            Find individual Budz and local Smoke Circles through the interests,
            energy, and plans you already care about.
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
          <p className="eyebrow eyebrow-light">The green-light standard</p>
          <h2>Meet boldly.<br />Connect carefully.</h2>
          <p>
            Age requirements, privacy choices, community rules, and simple
            reporting tools are built into the experience from day one.
          </p>
          <a href="#safety-center">Visit the Safety Center <span aria-hidden="true">→</span></a>
        </div>
        <div className="safety-points">
          <div><b>01</b><strong>21+</strong><span>Adults-only community</span></div>
          <div><b>02</b><strong>Private</strong><span>You control what others see</span></div>
          <div><b>03</b><strong>Protected</strong><span>Block and report anytime</span></div>
        </div>
      </section>

      <section className="story-banner" id="join">
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-story">There’s a place for you here</p>
          <h2>Pull up a chair.<br />Your circle is waiting.</h2>
          <p>
            Create your profile, meet your kind of people, and help shape a
            community that feels like home.
          </p>
          <a className="button button-primary" href="#create-account">
            Create Your Free Account <span aria-hidden="true">→</span>
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
