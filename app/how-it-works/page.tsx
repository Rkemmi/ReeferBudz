import type { Metadata } from "next";
import { ClosingBanner, PageHero, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "How It Works",
  description: "See how ReeferBudz grows from a first hello into real friendship and local Smoke Circles.",
};

const steps = [
  {
    number: "01",
    label: "Right now",
    title: "Raise your hand.",
    body: "Join early access and tell us what would make this community feel worth showing up for.",
  },
  {
    number: "02",
    label: "Coming next",
    title: "Find common ground.",
    body: "Build a profile around your interests, friendship goals, and the things you actually like doing.",
  },
  {
    number: "03",
    label: "As we grow",
    title: "Turn a connection into a circle.",
    body: "Start a conversation, move at your pace, and help shared interests grow into local Smoke Circles.",
  },
];

export default function HowItWorks() {
  return (
    <PageShell current="how-it-works">
      <PageHero
        eyebrow="Your circle starts here"
        title="Come as you are. Find who gets you."
        intro="ReeferBudz is building a friendship-first community around the things you already enjoy—and the people you have not met yet."
      />
      <section className="steps-section">
        <div className="section-heading">
          <p className="eyebrow">How it grows</p>
          <h2>Three moments. One real beginning.</h2>
        </div>
        <div className="steps-list">
          {steps.map((step) => (
            <article key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <small>{step.label}</small>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="split-section">
        <div>
          <p className="eyebrow">Picture this</p>
          <h2>You arrive knowing you already have something in common.</h2>
        </div>
        <p>
          A listening party. A game night. A lakefront walk. A creative meetup.
          ReeferBudz is not about collecting matches. It is about making the
          first hello feel easier.
        </p>
      </section>
      <ClosingBanner
        eyebrow="The circle is still forming"
        title="There is room for you in it."
        description="Become a Founding Bud and help create the community you would actually join."
        scene="path"
        sceneLabel="Profile → Connection → Circle"
        mascotAlt="The ReeferBudz mascots following a playful path toward a new community circle"
      />
    </PageShell>
  );
}
