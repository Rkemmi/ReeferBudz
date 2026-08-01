import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { href: "/how-it-works", label: "How It Works", key: "how-it-works" },
  { href: "/safety", label: "Safety", key: "safety" },
  { href: "/our-story", label: "Our Story", key: "our-story" },
] as const;

export type NavigationKey = (typeof navigation)[number]["key"];

const sceneArtwork = {
  gathering: "/brand/scenes/lakefront-circle-v2.png",
  path: "/brand/scenes/discovery-trail-v2.png",
  safety: "/brand/scenes/safety-path-v2.png",
  story: "/brand/scenes/community-clubhouse-v2.png",
  guidelines: "/brand/scenes/safety-path-v2.png",
  contact: "/brand/scenes/community-clubhouse-v2.png",
  privacy: "/brand/scenes/safety-path-v2.png",
  terms: "/brand/scenes/discovery-trail-v2.png",
  accessibility: "/brand/scenes/discovery-trail-v2.png",
  signup: "/brand/scenes/community-clubhouse-v2.png",
  celebration: "/brand/scenes/lakefront-circle-v2.png",
} as const;

export function AgeBar() {
  return (
    <div className="age-bar">
      <span className="age-badge">21+</span>
      <span>Adults only. Friendship and community—never cannabis sales.</span>
    </div>
  );
}

function NavigationLinks({ current }: { current?: NavigationKey }) {
  return (
    <>
      {navigation.map((item) => (
        <Link
          className={current === item.key ? "nav-current" : undefined}
          href={item.href}
          aria-current={current === item.key ? "page" : undefined}
          key={item.key}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader({ current }: { current?: NavigationKey }) {
  return (
    <>
      <AgeBar />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="ReeferBudz home">
          <Image
            src="/brand/reeferbudz-wordmark.svg"
            alt="ReeferBudz"
            width={320}
            height={116}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavigationLinks current={current} />
        </nav>
        <Link className="button button-small" href="/early-access">
          Join Early Access
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            <NavigationLinks current={current} />
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link className="button button-small" href="/early-access">
              Join Early Access
            </Link>
          </nav>
        </details>
      </header>
    </>
  );
}

export function PageShell({
  children,
  current,
}: {
  children: ReactNode;
  current?: NavigationKey;
}) {
  return (
    <>
      <SiteHeader current={current} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero">
      <div className="content-narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lead">{intro}</p>
      </div>
    </section>
  );
}

export function ClosingBanner({
  eyebrow,
  title,
  description,
  scene = "gathering",
  sceneLabel = "Community circle",
  mascotAlt = "The ReeferBudz mascots welcoming people into the community",
  actionLabel = "Join Early Access",
  actionHref = "/early-access",
}: {
  eyebrow: string;
  title: string;
  description: string;
  scene?: "gathering" | "path" | "safety" | "story" | "guidelines" | "contact" | "privacy" | "terms" | "accessibility" | "signup" | "celebration";
  sceneLabel?: string;
  mascotAlt?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <section className={`closing-banner closing-banner--${scene}`}>
      <div>
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="button" href={actionHref}>
          {actionLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="banner-scene">
        <Image
          src={sceneArtwork[scene]}
          alt={mascotAlt}
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
        />
        <span className="scene-label"><b aria-hidden="true">✦</b>{sceneLabel}</span>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Image
            src="/brand/reeferbudz-primary-on-dark.svg"
            alt="ReeferBudz — Find Your Smoke Circle."
            width={1511}
            height={1023}
          />
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/early-access">Early Access</Link>
          </div>
          <div>
            <strong>Community</strong>
            <Link href="/our-story">Our Story</Link>
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <strong>Legal & access</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ReeferBudz™</span>
        <span>For adults 21+. No cannabis sales or transactions.</span>
      </div>
    </footer>
  );
}
