import Link from "next/link";
import type { ReactNode } from "react";
import { StaticImage as Image } from "./static-image";
import { MobileSiteMenu } from "./mobile-site-menu";

const navigation = [
  { href: "/how-it-works", label: "How It Works", key: "how-it-works" },
  { href: "/safety", label: "Safety", key: "safety" },
  { href: "/our-story", label: "Our Story", key: "our-story" },
] as const;

export type NavigationKey = (typeof navigation)[number]["key"];

const sceneArtwork = {
  gathering: "/brand/scenes/home-community-v7.png",
  path: "/brand/scenes/how-it-works-model-v3.png",
  safety: "/brand/scenes/safety-prep-v3.png",
  story: "/brand/scenes/our-story-scrapbook-v3.png",
  guidelines: "/brand/scenes/community-guidelines-circle-v3.png",
  contact: "/brand/scenes/contact-mailbox-v3.png",
  privacy: "/brand/scenes/privacy-nook-v3.png",
  terms: "/brand/scenes/terms-game-night-v3.png",
  accessibility: "/brand/scenes/accessibility-path-v3.png",
  early: "/brand/scenes/early-access-door-v3.png",
  signup: "/brand/scenes/signup-interests-v3.png",
  emergency: "/brand/scenes/emergency-checkin-v3.png",
  celebration: "/brand/scenes/welcome-chair-v3.png",
} as const;

const mobileSceneArtwork: Partial<Record<SceneKey, string>> = {
  gathering: "/brand/scenes/home-community-mobile-v7.png",
};

export type SceneKey = keyof typeof sceneArtwork;

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
        <Link className="header-signin" href="/login">
          Sign In
        </Link>
        <Link className="button button-small" href="/signup">
          Create Account
        </Link>
        <MobileSiteMenu />
      </header>
    </>
  );
}

export function PageShell({
  children,
  current,
  footerFeature,
}: {
  children: ReactNode;
  current?: NavigationKey;
  footerFeature?: ReactNode;
}) {
  return (
    <>
      <SiteHeader current={current} />
      <main>{children}</main>
      <SiteFooter feature={footerFeature} />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  tone = "gathering",
  accent = "A ReeferBudz moment",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  tone?: SceneKey;
  accent?: string;
}) {
  return (
    <section className={`page-hero page-hero--${tone}`}>
      <div className="content-narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lead">{intro}</p>
      </div>
      <div className="page-hero-accent" aria-hidden="true">
        <span>{accent}</span>
        <Image src="/brand/reeferbudz-mascots.svg" alt="" width={1024} height={682} />
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
  actionLabel = "Create Account",
  actionHref = "/signup",
}: {
  eyebrow: string;
  title: string;
  description: string;
  scene?: SceneKey;
  sceneLabel?: string;
  mascotAlt?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <>
      <div className="closing-banner-anchor" id="closing-banner" />
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
            className={mobileSceneArtwork[scene] ? "banner-scene-desktop" : undefined}
            src={sceneArtwork[scene]}
            alt={mascotAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          {mobileSceneArtwork[scene] ? (
            <Image
              className="banner-scene-mobile"
              src={mobileSceneArtwork[scene]}
              alt={mascotAlt}
              fill
              priority
              sizes="100vw"
            />
          ) : null}
          <span className="scene-label"><b aria-hidden="true">✦</b>{sceneLabel}</span>
        </div>
      </section>
    </>
  );
}

export function SiteFooter({ feature }: { feature?: ReactNode }) {
  return (
    <footer className={feature ? "site-footer--featured" : undefined}>
      {feature}
      <div className="footer-main">
        <div className="footer-brand">
          <Image
            src="/brand/reeferbudz-primary-transparent-v2.png"
            alt="ReeferBudz — Find Your Smoke Circle."
            width={800}
            height={531}
          />
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/signup">Create Account</Link>
            <Link href="/login">Log In</Link>
            <Link href="/shop">Shop</Link>
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
