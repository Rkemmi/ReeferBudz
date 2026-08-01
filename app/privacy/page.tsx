import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <ContentPage
      eyebrow="Privacy"
      title="Clear choices about your information."
      intro="This early-access privacy notice explains what the public ReeferBudz website collects today and how that information is used. Last updated July 30, 2026."
      banner={{
        eyebrow: "Your information, your say",
        title: "Privacy is part of feeling at home.",
        description: "We are building clear choices into the community from the beginning.",
        scene: "privacy",
        sceneLabel: "Privacy garden",
        mascotAlt: "The ReeferBudz mascots tending a protected privacy garden together",
      }}
      sections={[
        { title: "Information you provide", body: <p>When you join early access, we collect your first name, email address, optional location, selected interests, adult-status confirmation, and the time of signup. If you contact us, we receive the information included in your message.</p> },
        { title: "How we use it", body: <p>We use early-access information to manage the waitlist, understand community interest, plan availability, prevent misuse, respond to questions, and send relevant ReeferBudz updates.</p> },
        { title: "Sharing and sales", body: <p>We do not sell personal information. Information may be processed by service providers that help operate the website, or disclosed when required for security, legal compliance, or protection of people and rights.</p> },
        { title: "Retention and choices", body: <p>We retain early-access information while the program is active and as reasonably needed for legal or operational purposes. You may ask to access, correct, or delete your information by emailing privacy@reeferbudz.com.</p> },
        { title: "Adults only", body: <p>ReeferBudz is intended only for people age 21 and over. We do not knowingly collect information from anyone under 21. Contact us if you believe an underage person submitted information.</p> },
        { title: "Changes", body: <p>We may update this notice as ReeferBudz develops. Material changes will be reflected here with a new effective date.</p> },
      ]}
    />
  );
}
