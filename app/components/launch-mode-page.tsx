import Link from "next/link";
import { LaunchListForm } from "./launch-list-form";
import { StaticImage as Image } from "./static-image";

const trustPoints = [
  "Not a dispensary.",
  "Not a cannabis marketplace.",
  "Not a delivery service.",
];

const reassurances = [
  {
    title: "Friendship-first",
    body: "Built for adults who want real connection, not dating-app pressure.",
  },
  {
    title: "Cleveland-rooted",
    body: "Made for local people, local spots, and real-life plans worth showing up for.",
  },
  {
    title: "Launch-list only",
    body: "This is email signup for updates only. You are not creating a full member account yet.",
  },
];

export function LaunchModePage() {
  return (
    <main className="launch-mode-page">
      <section className="launch-email-shell">
        <header className="launch-email-topbar">
          <Link className="launch-brand" href="/" aria-label="ReeferBudz home">
            <Image
              src="/brand/reeferbudz-primary-logo.png"
              alt="ReeferBudz — Find Your Smoke Circle."
              width={1200}
              height={812}
              priority
            />
          </Link>

          <div className="launch-email-pills" aria-label="Launch details">
            <span className="age-badge">21+</span>
            <span className="launch-top-pill">Cleveland-born</span>
            <span className="launch-top-pill">Launch list</span>
          </div>
        </header>

        <section className="launch-email-hero">
          <div className="launch-email-copy">
            <p className="launch-overline">REEFERBUDZ™ IS COMING.</p>
            <p className="launch-kicker">Cleveland&apos;s 21+ friendship-first community.</p>
            <h1>Find your smoke circle.</h1>
            <p className="launch-email-tagline">Friendship first. Community always.</p>
            <p className="launch-email-lead">
              ReeferBudz is Cleveland&apos;s 21+ community for making friends, building
              connections, and sharing experiences that matter.
            </p>

            <div className="launch-email-inline-card" id="launch-list">
              <LaunchListForm />
              <p className="launch-inline-caption">Be the first to know when we launch.</p>
            </div>

            <div className="launch-email-trust-row" aria-label="What ReeferBudz is about">
              {trustPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>

            <div className="launch-email-note">
              <span className="age-badge age-badge-small">21+</span>
              <p>Adults only. Friendship-first. Safe, respectful, and inclusive.</p>
            </div>
          </div>

          <aside className="launch-email-card" aria-label="Join the launch list">
            <div className="launch-email-card-inner">
              <div className="launch-email-mascots">
                <Image
                  src="/brand/reeferbudz-mascots.svg"
                  alt="The ReeferBudz mascots welcoming future community members"
                  width={1024}
                  height={682}
                  priority
                />
              </div>
            </div>
          </aside>
        </section>

        <section className="launch-email-reassurance" aria-label="Why join the launch list">
          {reassurances.map((item) => (
            <article key={item.title} className="launch-email-reassurance-card">
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
