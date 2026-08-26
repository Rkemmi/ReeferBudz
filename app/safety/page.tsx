import type { Metadata } from "next";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = {
  title: "Safety Center",
  description:
    "Learn ReeferBudz's safety principles, privacy boundaries, and adults-only friendship-first community expectations.",
};

const topSafetyCards = [
  {
    title: "Adults Only.",
    body: (
      <>
        <p>ReeferBudz™ is for adults age 21 and older.</p>
        <p>
          Members must meet the platform&apos;s age requirements to create and
          maintain an account.
        </p>
      </>
    ),
  },
  {
    title: "Share at your own pace.",
    body: (
      <>
        <p>
          Building trust with someone doesn&apos;t mean you have to share everything
          right away.
        </p>
        <ul>
          <li>Your exact home address</li>
          <li>Your phone number</li>
          <li>Your workplace</li>
          <li>Financial information</li>
          <li>Passwords or account information</li>
          <li>Your precise location</li>
        </ul>
      </>
    ),
  },
  {
    title: "Make your first meetup a smart one.",
    body: (
      <>
        <ul>
          <li>Meet somewhere public</li>
          <li>Tell someone you trust where you&apos;re going</li>
          <li>Arrange your own transportation</li>
          <li>Keep your phone with you</li>
          <li>Protect your personal belongings</li>
          <li>Know your limits</li>
        </ul>
        <p>You never have to meet someone before you&apos;re ready.</p>
      </>
    ),
  },
  {
    title: "Friendship should never feel forced.",
    body: (
      <>
        <p>
          Respect another person&apos;s boundaries, decisions, privacy, and right
          to say no.
        </p>
        <p>No member ever owes another member:</p>
        <ul>
          <li>A friendship</li>
          <li>A meetup</li>
          <li>A response</li>
          <li>Personal information</li>
          <li>Their phone number</li>
          <li>Their exact location</li>
        </ul>
      </>
    ),
  },
];

const lowerSafetyCards = [
  {
    title: "Your circle. Your boundaries.",
    body: "If another member makes you uncomfortable, you should be able to end interaction. Reporting, blocking, and deeper safety tooling are part of the product direction, but not every safety control is fully live across the member experience yet.",
  },
  {
    title: "Keep your exact location private.",
    body: "Knowing that another Bud is nearby doesn’t mean they need to know exactly where you are. ReeferBudz™ is built around general location sharing, not exposing exact addresses or precise live location.",
  },
  {
    title: "Friendship & community, never cannabis sales.",
    body: "ReeferBudz™ is a cannabis-friendly social community. It is not a cannabis marketplace, does not sell ReeferBudz™, and does not arrange transactions, delivery, or illegal activity.",
  },
  {
    title: "Good friends look out for each other.",
    body: "Community safety isn’t just about rules. It’s about treating people with respect, paying attention when something doesn’t feel right, respecting someone’s boundaries, and helping create the kind of community you’d want your own friends to be part of.",
  },
  {
    title: "Trust your instincts.",
    body: "You can stop communicating with someone at any time. You can decline a meetup. You can leave an event. You can block someone. Your safety is more important than avoiding an awkward moment.",
  },
];

export default function Safety() {
  return (
    <PageShell current="safety">
      <div className="rb-public-page rb-safety-page">
        <section className="rb-cleveland-hero rb-cleveland-hero--safety">
          <Image
            className="rb-cleveland-hero-image"
            src="/brand/scenes/live-cleveland-hero.jpg"
            alt="Downtown Cleveland at night behind the ReeferBudz safety page"
            fill
            priority
            sizes="100vw"
          />
          <div className="rb-cleveland-hero-copy">
            <p className="rb-eyebrow">Safety</p>
            <h1>
              <span>Your Safety</span>
              <span className="rb-home-accent">Comes First.</span>
            </h1>
            <p>
              Meeting new people should feel exciting, not uncomfortable.
              ReeferBudz™ is built around friendship, respect, privacy, personal
              boundaries, and helping adults 21+ make safer connections.
            </p>
          </div>
          <aside className="rb-cleveland-card">
            <strong>Cleveland, OH</strong>
            <p>Cleveland born.<br />Friendship first.</p>
          </aside>
        </section>

        <section className="rb-safety-board rb-safety-board--top">
          <article className="rb-safety-callout">
            <h2>
              <span>Stay safe.</span>
              <span>Find your people.</span>
            </h2>
            <p>
              Building real friendships starts with feeling comfortable and
              respected.
            </p>
            <p>
              ReeferBudz™ gives adults 21+ a place to connect with
              cannabis-friendly people while encouraging everyone to protect
              their privacy, respect boundaries, and look out for one another.
            </p>
          </article>
          {topSafetyCards.map((card) => (
            <article key={card.title} className="rb-safety-card">
              <h3>{card.title}</h3>
              {card.body}
            </article>
          ))}
        </section>

        <section className="rb-policy-grid rb-policy-grid--three">
          <article className="rb-policy-card">
            <h2>What ReeferBudz does not do</h2>
            <p>
              ReeferBudz is not emergency services and should never be treated
              as a substitute for local emergency help.
            </p>
          </article>
          <article className="rb-policy-card">
            <h2>What ReeferBudz does not do</h2>
            <p>
              ReeferBudz does not currently use a third-party identity or legal
              age-verification provider. Age is self-attested during member
              setup.
            </p>
          </article>
          <article className="rb-policy-card">
            <h2>What ReeferBudz does not do</h2>
            <p>
              ReeferBudz does not expose exact home addresses, provide precise
              live location sharing, or facilitate cannabis sales, delivery, or
              transactions.
            </p>
          </article>
        </section>

        <section className="rb-safety-board rb-safety-board--bottom">
          {lowerSafetyCards.map((card) => (
            <article key={card.title} className="rb-safety-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </section>

        <ClosingBanner
          eyebrow="Look out for"
          title={
            <>
              <span>Your Budz.</span>
            </>
          }
          description={
            <>
              Good friendships respect boundaries,
              <br />
              communicate clearly, and look out for
              <br />
              one another.
            </>
          }
          scene="safety"
          sceneLabel="Safety tips"
          mascotAlt="The ReeferBudz mascots sharing safety tips in Cleveland"
        />
      </div>
    </PageShell>
  );
}
