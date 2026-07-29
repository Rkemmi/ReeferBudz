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
    title: "Bring what you’re into",
    copy: "Share the interests, activities, and friendship energy you want your future circle to grow around.",
  },
  {
    number: "02",
    title: "Help shape the culture",
    copy: "Founding Budz will help establish the tone, community expectations, and kinds of circles ReeferBudz creates.",
  },
  {
    number: "03",
    title: "Build the first circles",
    copy: "As the community opens, meet through shared interests and help turn local ideas into real friendships.",
  },
];

const communityPoints = [
  "Influence the first community features",
  "Suggest early Smoke Circle themes",
  "Help establish respectful community norms",
  "Receive an invitation when early access opens",
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
            Our Story
          </a>
          <a className="button button-small button-green" href="#join">
            Join Early Access
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
            The first circle starts here
          </p>
          <h1>
            Don’t join
            <span>another network.</span>
            <em>Help build your community.</em>
          </h1>
          <p className="hero-lead">
            ReeferBudz is being created for cannabis-friendly adults who want
            genuine friendship—not dating, selling, or another empty feed.
            Become a Founding Bud and help shape what comes next.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#join">
              Become a Founding Bud
              <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#how-it-works">
              See How It Works
            </a>
          </div>
          <p className="microcopy">
            <span aria-hidden="true">✓</span> Early access
            <span aria-hidden="true">•</span> Adults 21+
            <span aria-hidden="true">•</span> Friendship first
          </p>
        </div>

        <div className="hero-art" aria-label="The ReeferBudz mascots">
          <div className="hero-city">CLEVELAND · 41.4993° N</div>
          <div className="location-chip chip-one">
            <span className="pin" aria-hidden="true">●</span>
            Built with Cleveland roots
          </div>
          <div className="location-chip chip-two">
            <span aria-hidden="true">✦</span>
            Shaped by Founding Budz
          </div>
          <div className="location-chip chip-three">
            <span aria-hidden="true">○</span>
            Friendship · Community · 21+
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
          <p className="eyebrow">Build it with us</p>
          <h2>The community begins before the doors open.</h2>
          <p>
            This is your chance to influence a friendship-first platform from
            its earliest days—not arrive after someone else has defined it.
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
        <span>FRIENDSHIP FIRST.</span>
        <span>NO SALES.</span>
        <strong>BUILT TOGETHER.</strong>
      </section>

      <section className="community-section" id="community">
        <div className="community-art">
          <div className="orbit-label">WHAT WE COULD BUILD TOGETHER</div>
          <div className="profile-card profile-one">
            <div className="profile-avatar avatar-orange">01</div>
            <div><strong>Interest-led discovery</strong><span>Find common ground before saying hello</span></div>
            <b>IDEA</b>
          </div>
          <div className="profile-card profile-two">
            <div className="profile-avatar avatar-lime">02</div>
            <div><strong>Community-made circles</strong><span>Local groups shaped by the people inside them</span></div>
            <b>IDEA</b>
          </div>
          <div className="circle-card circle-card-one">
            <div className="circle-icon">
              <Image src="/brand/icons/outdoor-setting.png" alt="" width={64} height={64} />
            </div>
            <div>
              <strong>Lakefront Hangouts</strong>
              <span>Future circle idea · Outdoors</span>
            </div>
          </div>
          <div className="circle-card circle-card-two">
            <div className="circle-icon circle-icon-type">♫</div>
            <div>
              <strong>Vinyl & Vibes</strong>
              <span>Future circle idea · Music</span>
            </div>
          </div>
          <div className="circle-card circle-card-three">
            <div className="circle-icon">
              <Image src="/brand/icons/smoke-circle.png" alt="" width={64} height={64} />
            </div>
            <div>
              <strong>Creative Budz</strong>
              <span>Future circle idea · Art and making</span>
            </div>
          </div>
        </div>
        <div className="community-copy">
          <p className="eyebrow">A preview, not a promise</p>
          <h2>Imagine what your circle could become.</h2>
          <p>
            These are community possibilities—not fake members or invented
            activity. Founding Budz will help decide which experiences matter
            most and what the first Smoke Circles should become.
          </p>
          <ul>
            {communityPoints.map((point) => (
              <li key={point}><span aria-hidden="true">✓</span>{point}</li>
            ))}
          </ul>
          <a className="inline-link" href="#join">
            Help shape the first circles <span aria-hidden="true">→</span>
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
            Founding the community does not mean compromising safety. Age
            requirements, privacy choices, community rules, and reporting tools
            are part of the foundation.
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
          <p className="eyebrow eyebrow-story">Founding Budz wanted</p>
          <h2>Pull up a chair.<br />Help build the circle.</h2>
          <p>
            Join early access and be among the first adults invited to help
            shape the ReeferBudz community.
          </p>
          <a className="button button-primary" href="#create-account">
            Join the Founding Budz <span aria-hidden="true">→</span>
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
