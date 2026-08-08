import type { Metadata } from "next";
import { ClosingBanner, PageHero, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Safety Center",
  description: "Learn ReeferBudz's current safety position, product boundaries, and which protections are planned but not yet launched.",
};

const tools = [
  {
    title: "Adults-only entry",
    body: "ReeferBudz is intended only for adults 21 and over. The current position is date-of-birth entry plus member self-attestation. ReeferBudz should not claim legal identity verification or third-party age verification unless a real verification provider is fully integrated.",
  },
  {
    title: "Consent and boundaries",
    body: "Every connection is voluntary. Members should be able to control who can contact them, what profile details are visible, and whether to continue a conversation or connection. A yes can become a no at any time.",
  },
  {
    title: "Privacy-aware discovery",
    body: "Discovery should limit unnecessary exposure of precise personal information. Location sharing, profile visibility, and member-to-member access should stay proportional to trust and comfort, not force oversharing.",
  },
  {
    title: "Reporting and blocking direction",
    body: "Reporting, blocking, and account-level response are part of the intended safety model. They should be easy to find, simple to understand, and treated as product priorities, even where specific flows are still being completed.",
  },
  {
    title: "Future safety layers",
    body: "Features such as trusted-contact sharing, check-in tools, stronger verification, and more advanced safety workflows may be added later. They should be described as planned or under consideration until they are fully built, tested, and legally reviewed.",
  },
  {
    title: "Reports and response",
    body: "Harassment, threats, coercion, impersonation, illegal sales activity, and boundary violations are not welcome. ReeferBudz can define these standards now, but response speed, escalation paths, and enforcement tooling should only be described at the level the product can truly support today.",
  },
];

export default function Safety() {
  return (
    <PageShell current="safety">
      <PageHero
        eyebrow="Safety Center"
        title="Safer connections are designed before the first hello."
        intro="Safety is a shared practice supported by clear boundaries, practical tools, transparent limits, and community accountability."
        tone="safety"
        accent="Prepared together"
      />
      <section className="safety-principles">
        <div className="section-heading">
          <p className="eyebrow">Current position and next layers</p>
          <h2>What safety means right now, and what still needs to be built.</h2>
        </div>
        <div className="safety-grid">
          {tools.map((tool, index) => (
            <article key={tool.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="notice-panel">
        <h2>What ReeferBudz cannot promise</h2>
        <p>
          ReeferBudz should not present unlaunched safety tools as active
          protection. No platform can guarantee another person’s identity,
          intentions, or behavior, and ReeferBudz should not claim verified
          identity or verified age unless that system truly exists in the live
          product.
        </p>
        <p>
          Members should still meet in public when appropriate, arrange their
          own transportation, tell someone they trust, protect personal
          information, and leave whenever something feels wrong. If a person is
          in immediate danger, they should contact local emergency services
          directly.
        </p>
        <p>
          ReeferBudz is a friendship and community platform. It does not sell,
          deliver, or arrange transactions involving cannabis.
        </p>
      </section>
      <ClosingBanner
        eyebrow="Trust is built together"
        title="Your boundaries belong to you."
        description="Help shape a community that treats privacy, boundaries, and truthful safety expectations as part of the product from day one."
        scene="safety"
        sceneLabel="Privacy · Check-in · Support"
        mascotAlt="The ReeferBudz mascots helping each other through safety checkpoints"
      />
    </PageShell>
  );
}
