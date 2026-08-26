import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "./components/site-chrome";
import { LaunchModePage } from "./components/launch-mode-page";
import { StaticImage as Image } from "./components/static-image";
import { isPublicLaunchMode } from "./launch-mode";

export const metadata: Metadata = {
  title: "Find Your Smoke Circle",
  description: "A friendship-first community for cannabis-friendly adults 21+ to discover local connection, shared interests, and a more human social experience.",
};

const features = [
  {
    title: "21+ Community",
    body: "Adults only, with real connections and no cannabis sales.",
    icon: PeopleIcon,
  },
  {
    title: "Friendship-First",
    body: "Built for shared interests, local vibes, and genuine conversations.",
    icon: FriendshipIcon,
  },
  {
    title: "Cleveland Born",
    body: "A local community rooted in Cleveland energy and real-world meetups.",
    icon: SkylineIcon,
  },
  {
    title: "Cannabis Friendly",
    body: "Friendly to the culture without turning the experience into a marketplace.",
    icon: LeafBadgeIcon,
  },
];

const stats = [
  {
    title: "12K+",
    body: "Members\nand growing daily",
    icon: PeopleIcon,
  },
  {
    title: "250+",
    body: "Events Hosted\nacross Cleveland",
    icon: CalendarIcon,
  },
  {
    title: "98%",
    body: "Positive Vibes\nreal people, real connections",
    icon: HeartHandIcon,
  },
  {
    title: "30+",
    body: "Neighborhoods\none community",
    icon: LocationRingIcon,
  },
];

const howItWorksSteps = [
  {
    number: "1",
    title: "Join",
    body: "Create your profile in minutes and tell us what you're into.",
    image: "/brand/scenes/home-community-v7.png",
  },
  {
    number: "2",
    title: "Connect",
    body: "Find Budz nearby who share your vibe and interests.",
    image: "/brand/scenes/how-it-works-model-v3.png",
  },
  {
    number: "3",
    title: "Join In",
    body: "Jump into events, Smoke Circles, and local experiences.",
    image: "/brand/scenes/community-clubhouse-v2.png",
  },
  {
    number: "4",
    title: "Build Real Friendships",
    body: "Friendship-first. Always. That's the ReeferBudz way.",
    image: "/brand/scenes/welcome-chair-v3.png",
  },
];

const values = [
  {
    title: "Friendship-First",
    body: "This isn't a dating app. It's a space to meet like-minded people and build real friendships.",
    icon: ShieldIcon,
  },
  {
    title: "Safety & Respect",
    body: "Verified profiles, community guidelines, and real humans keeping it safe and positive.",
    icon: ShieldIcon,
  },
  {
    title: "Local Experiences",
    body: "From downtown hangouts to hidden gem spots, experience Cleveland like never before.",
    icon: LocationRingIcon,
  },
  {
    title: "Inclusive & Welcoming",
    body: "All are welcome here. Different backgrounds, same good vibes. One Cleveland.",
    icon: HeartOutlineIcon,
  },
];

const eventTypes = [
  "Smoke Circles",
  "Game Nights",
  "City Adventures",
  "Live Music",
  "Food & Culture",
  "And More",
];

const eventCards = [
  {
    month: "May",
    day: "24",
    title: "Downtown Budz Circle",
    place: "Ohio City",
    meta: "Sat, May 24 · 7:00 PM",
    image: "/brand/scenes/community-clubhouse-v2.png",
  },
  {
    month: "May",
    day: "31",
    title: "Sunset at the Flats",
    place: "The Flats",
    meta: "Sat, May 31 · 6:30 PM",
    image: "/brand/scenes/home-lakefront-v4.png",
  },
  {
    month: "Jun",
    day: "07",
    title: "Local Art & Eats",
    place: "Tremont",
    meta: "Sat, Jun 7 · 5:00 PM",
    image: "/brand/scenes/home-community-v7.png",
  },
];

export default function Home() {
  if (isPublicLaunchMode()) {
    return <LaunchModePage />;
  }

  return (
    <PageShell current="home" footerClassName="site-footer--home-scene">
      <div className="rb-public-page rb-home-page">
        <section className="rb-cleveland-hero">
          <Image
            className="rb-cleveland-hero-image"
            src="/brand/scenes/live-cleveland-hero.jpg"
            alt="Downtown Cleveland lit up at night along the waterfront"
            fill
            priority
            sizes="100vw"
          />
          <div className="rb-cleveland-hero-panel" aria-hidden="true" />
          <div className="rb-cleveland-hero-copy">
            <p className="rb-home-kicker">Cleveland Born</p>
            <h1>
              <span>Friendship</span>
              <span>First.</span>
              <span className="rb-home-accent">Cleveland</span>
              <span>Always.</span>
            </h1>
            <p>
              ReeferBudz is a 21+ cannabis-friendly community built on real
              connections, good vibes, local energy, and unforgettable
              Cleveland experiences.
            </p>
            <div className="rb-primary-actions">
              <Link className="button" href="/signup">
                Join the Community <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button-outline" href="/how-it-works">
                <PlayIcon />
                <span>Learn More</span>
              </Link>
            </div>
            <div className="rb-hero-tags" aria-label="ReeferBudz highlights">
              {features.map((feature) => (
                <span key={feature.title}>
                  <feature.icon />
                  <b>{feature.title}</b>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rb-home-stats" aria-label="ReeferBudz by the numbers">
          <div className="rb-home-stats-intro">
            <p>Built by locals.</p>
            <h2>Loved by the 216.</h2>
            <p>
              We&apos;re more than an app. We&apos;re a movement. A growing
              community of open-minded, good people making Cleveland a little
              more connected every day.
            </p>
          </div>
          <div className="rb-home-stats-grid">
            {stats.map((stat) => (
              <article key={stat.title}>
                <span aria-hidden="true" className="rb-stat-icon">
                  <stat.icon />
                </span>
                <strong>{stat.title}</strong>
                <p>{stat.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rb-home-how" aria-labelledby="home-how-title">
          <p className="rb-section-kicker">Simple. Safe. Social.</p>
          <h2 id="home-how-title">How ReeferBudz Works</h2>
          <div className="rb-home-how-grid">
            {howItWorksSteps.map((step, index) => (
              <article key={step.title}>
                <div className="rb-home-how-image">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 900px) 50vw, 22vw"
                  />
                </div>
                <div className="rb-home-how-arrow" aria-hidden="true">
                  {index < howItWorksSteps.length - 1 ? "→" : null}
                </div>
                <div className="rb-home-how-copy">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link className="button" href="/signup">
            Join the Community <span aria-hidden="true">→</span>
          </Link>
          <p className="rb-home-script">It&apos;s free to join. Always will be.</p>
        </section>

        <section className="rb-home-values" aria-labelledby="home-values-title">
          <div className="rb-home-values-intro">
            <p className="rb-section-kicker">Why ReeferBudz</p>
            <h2 id="home-values-title">Feels Different</h2>
            <p>
              We&apos;re not here for hookups, transactions, or trends.
              We&apos;re here to build a better community, together.
            </p>
            <Link className="button button-ghost-light" href="/our-story">
              Learn More About Us <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="rb-home-values-grid">
            {values.map((value) => (
              <article key={value.title}>
                <span aria-hidden="true" className="rb-value-icon">
                  <value.icon />
                </span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rb-home-events" aria-labelledby="home-events-title">
          <div className="rb-home-events-intro">
            <p className="rb-section-kicker">Good people. Good places.</p>
            <h2 id="home-events-title">Events &amp; Smoke Circles</h2>
            <p>Real-life experiences that bring us together.</p>
            <div className="rb-home-event-types" aria-label="Event types">
              {eventTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
            <Link className="button" href="/shop">
              Visit the Store <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="rb-home-events-cards">
            {eventCards.map((event) => (
              <article key={event.title}>
                <div className="rb-home-event-image">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 28vw"
                  />
                </div>
                <div className="rb-home-event-date">
                  <span>{event.month}</span>
                  <b>{event.day}</b>
                </div>
                <div className="rb-home-event-copy">
                  <h3>{event.title}</h3>
                  <p>{event.place}</p>
                  <small>{event.meta}</small>
                </div>
              </article>
            ))}
          </div>
          <p className="rb-home-script">New events every week. Something for every vibe.</p>
        </section>

        <div className="rb-home-closing-banner">
          <ClosingBanner
            eyebrow="Cleveland is better together."
            title={<>Let&apos;s link up.</>}
            description="ReeferBudz is your community. Your people. Your city. Let&apos;s make some memories."
            scene="gathering"
            sceneLabel="Cleveland born. Friendship first."
            actionLabel="Join the Community"
          />
        </div>
      </div>
    </PageShell>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <circle className="rb-icon-fill" cx="24" cy="24" r="5.25" />
      <circle className="rb-icon-fill" cx="40" cy="24.5" r="4.5" />
      <circle className="rb-icon-fill" cx="15.5" cy="26.8" r="4" />
      <path
        className="rb-icon-fill"
        d="M19.4 34.6c-4.7 0-8.6 3.2-9.4 7.6h18.8c-.8-4.4-4.7-7.6-9.4-7.6Z"
      />
      <path
        className="rb-icon-fill"
        d="M39.9 34.8c-4.9 0-8.9 3.2-9.8 7.5h19.5c-.9-4.3-4.9-7.5-9.7-7.5Z"
      />
      <path
        className="rb-icon-fill"
        d="M15.5 34.6c-3.8 0-6.8 2.4-7.6 5.8h6.6c.6-2.2 1.8-4.1 3.4-5.8h-2.4Z"
      />
    </svg>
  );
}

function FriendshipIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-icon-fill"
        d="M31.8 15.5c-1.9 3.9-2.2 7.4-.8 10.5-4.2-2.6-8.1-3.1-11.9-1.5 2.4 3.4 5.4 5.7 9 6.9-3.9 1.3-6.8 3.9-8.8 7.7 4 .7 7.6.1 10.8-1.9-.5 4.3.6 8.2 3.4 11.7 2.8-3.5 3.9-7.4 3.4-11.7 3.2 2 6.8 2.6 10.8 1.9-2-3.8-4.9-6.4-8.8-7.7 3.6-1.2 6.6-3.5 9-6.9-3.8-1.6-7.8-1.1-11.9 1.5 1.3-3.1 1-6.6-.9-10.5-1 .8-1.7 1.8-2.3 2.8-.6-1-1.4-1.9-2-2.8Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-shield-fill"
        d="M32 16.5 45 20.6v10.9c0 8.7-5 15.1-13 18.9-8-3.8-13-10.2-13-18.9V20.6Z"
      />
      <path className="rb-shield-check" d="m26.1 32.4 4.3 4.3 8.8-9.3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <rect className="rb-icon-fill" x="19" y="22" width="26" height="22" rx="3.2" />
      <path className="rb-icon-cutout" d="M19 30h26" />
      <path className="rb-icon-cutout" d="M25 18.8v6.6" />
      <path className="rb-icon-cutout" d="M39 18.8v6.6" />
      <path className="rb-icon-cutout" d="M24.5 34.5h4.8" />
      <path className="rb-icon-cutout" d="M31.6 34.5h4.8" />
      <path className="rb-icon-cutout" d="M38.6 34.5h1.8" />
      <path className="rb-icon-cutout" d="M24.5 39.8h4.8" />
      <path className="rb-icon-cutout" d="M31.6 39.8h4.8" />
      <path className="rb-icon-cutout" d="M38.6 39.8h1.8" />
    </svg>
  );
}

function SkylineIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-icon-fill"
        d="M16 43h30M19.5 43V31h5.2v12M28 43V21h7v22M38.8 43V27h5.7v16M25.6 21v-5.2M31.5 21v-8M34.6 21v-4.8"
      />
    </svg>
  );
}

function LeafBadgeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-icon-fill"
        d="M31.8 18.1c-2.1 4.2-2.5 8-.8 11.1-4.6-2.8-8.8-3.3-12.8-1.6 2.6 3.6 5.9 6 9.8 7.3-4.1 1.5-7.3 4.1-9.4 8.2 4.4.7 8.3 0 11.7-2.3-.6 4.5.6 8.6 3.7 12.2 3.1-3.6 4.3-7.7 3.7-12.2 3.4 2.2 7.3 3 11.7 2.3-2.1-4-5.3-6.7-9.4-8.2 3.9-1.3 7.1-3.8 9.8-7.3-4-1.8-8.2-1.2-12.8 1.6 1.5-3.1 1.3-6.8-.7-11.1-1 .8-1.8 1.8-2.4 2.9-.7-1.1-1.5-2.1-2.1-2.9Z"
      />
    </svg>
  );
}

function HeartHandIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-icon-fill"
        d="M24 37.8h-7.7c-2.4 0-4.3 1.9-4.3 4.3v2.4H29l7.2 3.6c3 1.5 6.5.6 8.4-2.1l6.4-9c1.1-1.5.7-3.6-.8-4.7-1.4-1-3.3-.8-4.5.5l-4.5 5h-6.9c.7-.9 1.2-2.1 1.2-3.3 0-3-2.4-5.4-5.4-5.4-2.4 0-4.5 1.5-5.2 3.7l-.9 2.9Z"
      />
      <path className="rb-icon-cutout" d="M23.3 21.8c0-2.6 2.1-4.7 4.7-4.7 1.6 0 3.1.8 4 2.1.9-1.3 2.4-2.1 4-2.1 2.6 0 4.7 2.1 4.7 4.7 0 4.5-4.6 7.4-8.7 10.3-4.1-2.9-8.7-5.8-8.7-10.3Z" />
    </svg>
  );
}

function LocationRingIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path className="rb-icon-fill" d="M32 48s10-10.1 10-18c0-5.5-4.5-10-10-10s-10 4.5-10 10c0 7.9 10 18 10 18Z" />
      <circle className="rb-icon-cutout" cx="32" cy="30" r="3.8" />
    </svg>
  );
}

function HeartOutlineIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="rb-icon-ring" cx="32" cy="32" r="27" />
      <path
        className="rb-icon-fill"
        d="M32 47.5c-8.6-5.9-14.5-10.9-14.5-17.5 0-4.6 3.7-8.3 8.3-8.3 2.7 0 5.3 1.3 6.9 3.4 1.6-2.1 4.1-3.4 6.9-3.4 4.6 0 8.3 3.7 8.3 8.3 0 6.6-5.9 11.6-14.5 17.5Z"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path className="fill" d="m10 8 7 4-7 4Z" />
    </svg>
  );
}
