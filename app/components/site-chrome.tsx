import Link from "next/link";
import type { ReactNode } from "react";
import { StaticImage as Image } from "./static-image";
import { MobileSiteMenu } from "./mobile-site-menu";

const navigation = [
  { href: "/", label: "Home", key: "home" },
  { href: "/our-story", label: "About", key: "our-story" },
  { href: "/shop", label: "Store", key: "shop" },
  { href: "/how-it-works", label: "How It Works", key: "how-it-works" },
  { href: "/contact", label: "Contact", key: "contact" },
  { href: "/safety", label: "Safety", key: "safety" },
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
      <span>Adults 21+. Friendship and community, never cannabis sales.</span>
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
            src="/brand/reeferbudz-primary-transparent-v2.png"
            alt="ReeferBudz — Find Your Smoke Circle."
            width={1200}
            height={812}
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
          Join the Community
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
  footerClassName,
}: {
  children: ReactNode;
  current?: NavigationKey;
  footerFeature?: ReactNode;
  footerClassName?: string;
}) {
  return (
    <>
      <SiteHeader current={current} />
      <main>{children}</main>
      <SiteFooter feature={footerFeature} className={footerClassName} />
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
  title: ReactNode;
  description: ReactNode;
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

export function SiteFooter({
  feature,
  className,
}: {
  feature?: ReactNode;
  className?: string;
}) {
  const footerClasses = ["site-footer", feature ? "site-footer--featured" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={footerClasses}>
      {feature}
      <div className="footer-main">
        <div className="footer-brand">
          <Image
            src="/brand/reeferbudz-primary-logo.png"
            alt="ReeferBudz — Find Your Smoke Circle."
            width={800}
            height={531}
          />
          <div className="footer-social" aria-label="ReeferBudz social channels">
            <a href="#" aria-label="Instagram">
              <SocialIcon kind="instagram" />
            </a>
            <a href="#" aria-label="TikTok">
              <SocialIcon kind="tiktok" />
            </a>
            <a href="#" aria-label="Facebook">
              <SocialIcon kind="facebook" />
            </a>
            <a href="#" aria-label="X">
              <SocialIcon kind="x" />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/early-access">Founding Budz</Link>
            <Link href="/signup">Create Account</Link>
            <Link href="/member-preview">Member Preview</Link>
            <Link href="/shop">Prelaunch Merch</Link>
          </div>
          <div>
            <strong>Community</strong>
            <Link href="/our-story">Our Story</Link>
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link href="/safety">Safety Center</Link>
            <Link href="/early-access">Early Access</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <strong>Legal & access</strong>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/login">Member Sign In</Link>
          </div>
        </div>
        <aside className="footer-cleveland-card">
          <strong>Cleveland born.<br />Friendship first.</strong>
          <SkylineIcon />
        </aside>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-note">
          <span className="age-badge">21+</span>
          <span>Adults 21+. Friendship and community-never cannabis sales.</span>
        </div>
        <LeafMark />
        <div className="footer-copyright">
          <span>© 2026 ReeferBudz™</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: "instagram" | "tiktok" | "facebook" | "x" }) {
  switch (kind) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.25" cy="6.75" r="1" className="fill" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4v10.1a3.6 3.6 0 1 1-2.6-3.45" />
          <path d="M14 4c1.08 2.16 2.57 3.5 5 3.85" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.4 20v-7.1h2.4l.4-2.8h-2.8V8.3c0-.81.23-1.36 1.4-1.36h1.5V4.43c-.26-.04-1.15-.11-2.18-.11-2.16 0-3.64 1.32-3.64 3.74v2.08H8v2.8h2.48V20z" className="fill" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
  }
}

function SkylineIcon() {
  return (
    <svg className="footer-skyline" viewBox="0 0 220 42" aria-hidden="true">
      <path d="M4 36h12v-5h6V20h7v16h10V26h5V12h8v24h12V18h4V9h7v27h11V24h6V15h8v21h12V28h5V17h10v19h14V22h5V12h9v24h9" />
      <path d="M3 36c13-3 23-4 31-2 6 2 15 2 24-2 8-4 16-5 24-2 8 3 16 4 25 0 10-5 18-5 25-1 8 4 17 5 29 1 10-4 23-4 38 1" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg className="footer-leaf-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5c2 7 2.28 12.53.82 16.6 2.79-3.27 6.96-6.47 12.52-9.6-.63 7.2-2.83 12.54-6.59 16.01 4.43-1.07 8.62-.85 12.58.66-4.35 5.12-9.36 8.02-15.05 8.7 2.27 2 4.07 4.5 5.4 7.5-4.61-.3-8.07-1.84-10.38-4.63L24 43l-1.3-2.76c-2.31 2.79-5.77 4.33-10.38 4.63 1.33-3 3.13-5.5 5.4-7.5-5.69-.68-10.7-3.58-15.05-8.7 3.96-1.51 8.15-1.73 12.58-.66C11.49 24.54 9.29 19.2 8.66 12c5.56 3.13 9.73 6.33 12.52 9.6C19.72 17.53 20 12 22 5Z" className="fill" />
      <path d="M24 10v24" />
      <path d="M18 18c3 2 5 5 6 9" />
      <path d="M30 18c-3 2-5 5-6 9" />
    </svg>
  );
}
