import type { Metadata } from "next";
import { ClosingBanner, PageHero, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Safety Center",
  description: "Learn how ReeferBudz plans to protect adult community members before, during, and after in-person hangouts.",
};

const tools = [
  {
    title: "Adult verification",
    body: "ReeferBudz is for adults 21 and over. Date-of-birth confirmation begins at entry, and identity or age verification may be required before higher-trust features become available. Verification status will never imply that another member is risk-free.",
  },
  {
    title: "Consent and boundaries",
    body: "Every connection is voluntary. Members choose who can contact them, what profile details are visible, and whether to accept a hangout invitation. A yes can become a no at any time. Blocking and reporting are designed to be easy to find.",
  },
  {
    title: "Guardian button",
    body: "Before a planned hangout, a member can nominate a trusted person as their Guardian. The Guardian can receive the plan, location, expected end time, and check-in status. ReeferBudz does not replace emergency services or personal judgment.",
  },
  {
    title: "Emergency contacts",
    body: "Members can keep trusted contacts ready for a hangout and choose what information to share with them. If someone feels unsafe or faces immediate danger, they should leave when possible and contact local emergency services directly.",
  },
  {
    title: "Hangout alarms",
    body: "A member can set a private check-in time before meeting. The app will prompt them to confirm they are okay, extend the hangout, or request help. Missed check-ins can notify the chosen Guardian according to the member’s settings.",
  },
  {
    title: "Reports and response",
    body: "Harassment, threats, pressure, impersonation, illegal sales, and boundary violations are not welcome. Reports are reviewed with context, and actions may include warnings, feature restrictions, suspension, or removal.",
  },
];

export default function Safety() {
  return (
    <PageShell current="safety">
      <PageHero
        eyebrow="Safety Center"
        title="Safer connections are designed before the first hello."
        intro="Safety is a shared practice supported by clear boundaries, practical tools, transparent limits, and community accountability."
      />
      <section className="safety-principles">
        <div className="section-heading">
          <p className="eyebrow">Before, during, and after</p>
          <h2>What protection is intended to look like.</h2>
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
          No verification process or safety feature can guarantee another
          person’s identity, intentions, or behavior. Meet in public, arrange
          your own transportation, tell someone you trust, protect personal
          information, and leave whenever something feels wrong.
        </p>
        <p>
          ReeferBudz is a friendship and community platform. It does not sell,
          deliver, or arrange transactions involving cannabis.
        </p>
      </section>
      <ClosingBanner
        eyebrow="Trust is built together"
        title="Your boundaries belong to you."
        description="Help us shape safety tools that support real people in real situations."
      />
    </PageShell>
  );
}
