import type { Metadata } from "next";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = { title: "Our Story" };

const storyValues = [
  {
    title: "Friendship",
    body: "Real friendships can begin with one conversation.",
    icon: "chat",
  },
  {
    title: "Community",
    body: "Everyone deserves the opportunity to find people who make them feel like they belong.",
    icon: "group",
  },
  {
    title: "Safety",
    body: "Connection should never come at the expense of privacy or personal boundaries.",
    icon: "shield",
  },
  {
    title: "Respect",
    body: "Every member deserves to be treated with kindness, dignity, and respect.",
    icon: "handshake",
  },
  {
    title: "Authenticity",
    body: "Be yourself. Find people who appreciate you for who you really are.",
    icon: "leaf",
  },
  {
    title: "Responsibility",
    body: "ReeferBudz™ supports responsible cannabis culture while keeping sales and transactions off the platform.",
    icon: "badge",
  },
] as const;

export default function OurStory() {
  return (
    <PageShell current="our-story">
      <div className="rb-public-page rb-story-page">
        <section className="rb-cleveland-hero rb-cleveland-hero--story">
          <Image
            className="rb-cleveland-hero-image"
            src="/brand/scenes/live-cleveland-hero.jpg"
            alt="Downtown Cleveland at night behind the ReeferBudz story"
            fill
            priority
            sizes="100vw"
          />
          <div className="rb-cleveland-hero-copy">
            <p className="rb-eyebrow">Our story</p>
            <p>
              <strong>How</strong>
              <br />
              <span className="rb-home-accent">ReeferBudz™</span>
              <br />
              <strong>began.</strong>
            </p>
            <p>
              ReeferBudz™ was created with one simple idea:
              <span className="rb-story-highlight-inline"> Making real friends as an adult shouldn&apos;t be so hard.</span>
            </p>
            <p>
              We&apos;re building a place where cannabis-friendly adults 21+ can
              find genuine friendship, shared interests, and a community where
              they feel welcome.
            </p>
          </div>
          <aside className="rb-cleveland-card">
            <strong>
              <LocationPinIcon />
              <span>Cleveland, OH</span>
            </strong>
            <p>Cleveland born.<br />Friendship first.</p>
            <SkylineLineIcon />
          </aside>
        </section>

        <section className="rb-story-flow">
          <section className="rb-story-columns rb-story-columns--locked">
            <article className="rb-story-panel">
              <div className="rb-story-panel-title">
                <MissionIcon />
                <div>
                  <p className="rb-eyebrow">Our mission</p>
                  <h2>Build real connections.</h2>
                </div>
              </div>
              <p>
                ReeferBudz™ exists to help adults 21+ build genuine, platonic
                friendships in a welcoming cannabis-friendly community.
              </p>
              <p>
                It&apos;s about finding people who share your interests, discovering
                things to do together, joining Smoke Circles, and turning online
                introductions into real friendships.
              </p>
            </article>
            <article className="rb-story-panel">
              <div className="rb-story-panel-title">
                <JourneyIcon />
                <div>
                  <p className="rb-eyebrow">Our journey</p>
                  <h2>Built from a real frustration.</h2>
                </div>
              </div>
              <p>
                ReeferBudz™ officially began in Cleveland, Ohio on July 12,
                2026. The idea came from something simple and personal: making
                real friends as an adult can feel harder than it should.
              </p>
              <ul className="rb-story-checklist">
                <li>Cleveland is where the first version takes root.</li>
                <li>The goal is friendship, not dating or hookups.</li>
                <li>The platform does not exist to sell cannabis.</li>
                <li>The point is helping real people find real community.</li>
              </ul>
              <p>
                ReeferBudz™ started with the belief that shared interests,
                better boundaries, and a warmer first hello can make friendship
                feel possible again. Cleveland is where that work begins.
              </p>
            </article>
            <article className="rb-story-panel">
              <div className="rb-story-panel-title">
                <CommunityIcon />
                <div>
                  <p className="rb-eyebrow">Our community</p>
                  <h2>More than an app.</h2>
                </div>
              </div>
              <p>
                ReeferBudz™ is being built to become a community where adults can
                discover people with shared interests, move at their own pace,
                and build friendships that feel natural instead of forced.
              </p>
              <p className="rb-story-highlight">
                Friendship is what brings the community together.
              </p>
            </article>
          </section>

          <section className="rb-values-strip rb-values-strip--locked" aria-label="Community values">
            {storyValues.map((value) => (
              <article key={value.title}>
                <div className="rb-value-icon">
                  <ValueIcon kind={value.icon} />
                </div>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </article>
            ))}
          </section>
        </section>

        <ClosingBanner
          eyebrow="Together"
          title={
            <>
              <span>Together</span>
              <span className="closing-banner-accent">We grow.</span>
            </>
          }
          description={
            <>
              Every friendship starts somewhere.
              <br />
              One conversation.
              <br />
              One shared interest.
              <br />
              One invitation to hang out.
              <br />
              <br />
              Sometimes that&apos;s all it takes to find someone who becomes part of your circle.
            </>
          }
          scene="story"
          sceneLabel="Cleveland roots"
          mascotAlt="The ReeferBudz mascots celebrating a friendship milestone in Cleveland"
        />
      </div>
    </PageShell>
  );
}

function MissionIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="21" />
      <circle cx="32" cy="32" r="11" />
      <circle cx="32" cy="32" r="3" className="fill" />
      <path d="M42 14 50 12 48 20" />
      <path d="m37 27 11-9" />
    </svg>
  );
}

function JourneyIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M10 48 24 24l8 12 10-18 12 30Z" />
      <path d="M32 18v10" />
      <path d="m32 18 7 4-7 4-7-4Z" className="fill" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="20" cy="22" r="6" />
      <circle cx="32" cy="18" r="7" />
      <circle cx="46" cy="22" r="6" />
      <path d="M11 45c0-5 4-9 9-9s9 4 9 9" />
      <path d="M21 48c0-6 5-11 11-11s11 5 11 11" />
      <path d="M37 45c0-5 4-9 9-9s9 4 9 9" />
    </svg>
  );
}

function ValueIcon({
  kind,
}: {
  kind: "chat" | "group" | "shield" | "handshake" | "leaf" | "badge";
}) {
  switch (kind) {
    case "chat":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 17h36v22H29L18 48v-9h-4Z" />
          <path d="M22 25h20" />
          <path d="M22 31h14" />
        </svg>
      );
    case "group":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="22" cy="24" r="6" />
          <circle cx="42" cy="24" r="6" />
          <path d="M14 45c0-5 4-9 8-9h0c4 0 8 4 8 9" />
          <path d="M34 45c0-5 4-9 8-9h0c4 0 8 4 8 9" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 10 48 16v12c0 10-6 18-16 23-10-5-16-13-16-23V16z" />
          <path d="m25 30 5 5 9-10" />
        </svg>
      );
    case "handshake":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M11 32 22 21c4-4 10-4 14 0l2 2c4 4 10 4 14 0l1-1" />
          <path d="m11 32 13 13 7-7" />
          <path d="m29 42 5 5 12-12" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 11c2 6 2 10.4.7 13.6 2.1-2.3 5.3-4.6 9.5-7-.5 5.5-2.2 9.6-5 12.3 3.4-.8 6.6-.6 9.5.5-3.3 3.9-7.1 6.1-11.4 6.6 1.7 1.5 3.1 3.4 4.1 5.8-3.5-.2-6.1-1.4-7.9-3.5L32 42l-1-2.1c-1.8 2.1-4.4 3.3-7.9 3.5 1-2.3 2.4-4.3 4.1-5.8-4.3-.5-8.1-2.7-11.4-6.6 3-1.1 6.2-1.3 9.5-.5-2.8-2.6-4.5-6.7-5-12.3 4.2 2.4 7.4 4.7 9.5 7-1.3-3.2-1.1-7.6.2-13.6Z" className="fill" />
          <path d="M32 16v18" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 11 47 17v11c0 9-5.8 16.2-15 21-9.2-4.8-15-12-15-21V17z" />
          <path d="m25 30 5 5 9-10" />
        </svg>
      );
  }
}

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 25s8-8.3 8-14.8a8 8 0 1 0-16 0C6 16.7 14 25 14 25Z" className="fill" />
      <circle cx="14" cy="10.3" r="2.6" />
    </svg>
  );
}

function SkylineLineIcon() {
  return (
    <svg className="rb-cleveland-skyline" viewBox="0 0 180 28" aria-hidden="true">
      <path d="M3 24h10v-3h4v-8h6v11h8V16h4V7h6v17h10V14h4V5h6v19h9V15h5v-6h7v15h10V18h3v-5h7v11h11V17h4v-7h7v14h10" />
      <path d="M2 24c11-2 18-3 24-1 5 2 11 2 19-1 8-4 14-4 20-1 7 3 13 4 21 1 7-3 14-3 20 0 7 3 15 3 24 0 8-3 17-3 28 1" />
    </svg>
  );
}
