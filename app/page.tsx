import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ReeferBudz | Find Your Smoke Circle",
  description:
    "Help build a friendship-first community for cannabis-friendly adults 21 and over.",
};

export default function Home() {
  return (
    <main className="story-home">
      <div className="age-bar">
        <span className="age-badge">21+</span>
        Adults only. Friendship, never cannabis sales.
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="ReeferBudz home">
          <Image src="/brand/reeferbudz-wordmark.png" alt="ReeferBudz" width={320} height={116} priority unoptimized />
        </a>
        <nav aria-label="Main navigation">
          <a href="/how-it-works">How It Works</a>
          <a href="#vision">The Vision</a>
          <a href="#trust">Safety</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="#story">Our Story</a>
          <a className="button button-small button-green" href="#join">Join Early Access</a>
        </div>
      </header>

      <section className="story-home-hero">
        <div className="story-home-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />Cleveland born · Friendship first</p>
          <h1>Find Your<br /><span>Smoke Circle.</span></h1>
          <p>
            ReeferBudz is being built for cannabis-friendly adults who want
            genuine friends, shared interests, and a community that feels like
            their own.
          </p>
          <div className="story-actions">
            <a className="button button-primary" href="#join">Become a Founding Bud <span aria-hidden="true">→</span></a>
            <a className="story-text-link" href="/how-it-works">See how we’re building it</a>
          </div>
          <small>Early access · Adults 21+ · No cannabis sales</small>
        </div>
        <div className="story-home-mascots">
          <div className="story-sun" aria-hidden="true" />
          <Image
            src="/brand/reeferbudz-mascots.png"
            alt="The two friendly ReeferBudz mascots"
            width={1024}
            height={682}
            priority
            unoptimized
          />
          <span className="story-pin story-pin-one">Cleveland roots</span>
          <span className="story-pin story-pin-two">Friendship · Community · 21+</span>
        </div>
      </section>

      <div className="story-interest-line" aria-label="Community interests">
        <span>Music</span><b>✦</b><span>Gaming</span><b>✦</b><span>Outdoors</span><b>✦</b>
        <span>Art</span><b>✦</b><span>Food</span><b>✦</b><span>Good conversation</span>
      </div>

      <section className="story-problem" id="story">
        <p className="story-section-number">01 / WHY</p>
        <div>
          <p className="eyebrow">The reason ReeferBudz exists</p>
          <h2>Finding cannabis-friendly people should not feel this difficult.</h2>
        </div>
        <div className="story-problem-copy">
          <p>
            Dating apps are built around romance. General social networks make
            it hard to know who shares your lifestyle. And many adults simply
            do not have a comfortable way to meet nearby people who understand.
          </p>
          <p className="story-pullquote">
            ReeferBudz is not another feed to scroll. It is a way to find common
            ground—and eventually turn it into real friendship.
          </p>
        </div>
      </section>

      <section className="story-vision" id="vision">
        <div className="story-vision-copy">
          <p className="story-section-number">02 / THE VISION</p>
          <p className="eyebrow">Picture your future circle</p>
          <h2>A place to belong before there is even a plan.</h2>
          <p>
            Music nights. Lakefront hangs. Gaming sessions. Art days. Food
            adventures. Quiet conversation. Smoke Circles will grow around the
            things people already love—not around pressure to perform.
          </p>
        </div>
        <div className="story-interest-cloud" aria-label="Possible future Smoke Circle interests">
          <span className="cloud-big">Live music</span>
          <span>Hiking</span>
          <span className="cloud-orange">Gaming</span>
          <span>Food</span>
          <span className="cloud-big cloud-lime">Art & making</span>
          <span>Movies</span>
          <span>Lakefront days</span>
          <span className="cloud-orange">Good conversation</span>
        </div>
      </section>

      <section className="story-founding">
        <div className="story-founding-intro">
          <p className="story-section-number">03 / FOUNDING BUDZ</p>
          <p className="eyebrow">The community starts with you</p>
          <h2>Help define it before the doors open.</h2>
          <p>
            We will not pretend ReeferBudz already has members, activity, or
            established Circles. Early supporters can help shape what the first
            real community becomes.
          </p>
        </div>
        <ol className="story-founding-path">
          <li><b>1</b><span><strong>Join early access</strong>Tell us you want to be part of the first group.</span></li>
          <li><b>2</b><span><strong>Share what matters</strong>Help guide interests, safety expectations, and Circle ideas.</span></li>
          <li><b>3</b><span><strong>Build with us</strong>Receive an invitation when the first community experience is ready.</span></li>
        </ol>
      </section>

      <section className="story-trust" id="trust">
        <div>
          <p className="story-section-number">04 / TRUST</p>
          <p className="eyebrow">A safe foundation</p>
          <h2>Community only works when people feel protected.</h2>
        </div>
        <ul>
          <li><strong>21+</strong><span>Created exclusively for adults</span></li>
          <li><strong>Privacy</strong><span>You decide what others can see</span></li>
          <li><strong>No sales</strong><span>No cannabis transactions or delivery</span></li>
          <li><strong>Controls</strong><span>Reporting and blocking are foundational</span></li>
        </ul>
      </section>

      <section className="story-banner story-home-closing" id="join">
        <div className="story-banner-copy">
          <p className="eyebrow eyebrow-story">Founding Budz wanted</p>
          <h2>Pull up a chair.<br />Help build the circle.</h2>
          <p>Join early access and help shape the community before its first doors open.</p>
          <a className="button button-primary" href="#early-access">Join the Founding Budz <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src="/brand/reeferbudz-primary-logo.png" alt="ReeferBudz" width={360} height={244} unoptimized />
          <p>Find Your Smoke Circle.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><a href="/how-it-works">How It Works</a><a href="#vision">The Vision</a><a href="#trust">Safety</a></div>
          <div><strong>Company</strong><a href="#story">Our Story</a><a href="#guidelines">Community Guidelines</a><a href="#contact">Contact</a></div>
          <div><strong>Legal</strong><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#accessibility">Accessibility</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 ReeferBudz™</span><span>For adults 21+. No cannabis sales or transactions.</span></div>
      </footer>
    </main>
  );
}
