import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  return (
    <ContentPage
      eyebrow="Terms"
      title="Terms for using the public ReeferBudz website."
      intro="These website terms apply to this public information and early-access experience. Last updated July 30, 2026."
      banner={{
        eyebrow: "The shared ground rules",
        title: "Clear expectations make room for easy connection.",
        description: "Know the boundaries, bring your whole self, and help the circle stay welcoming.",
        scene: "terms",
        sceneLabel: "Trail map check",
        mascotAlt: "The ReeferBudz mascots reviewing the community trail map and its ground rules",
      }}
      sections={[
        { title: "Eligibility", body: <p>You must be at least 21 years old to use ReeferBudz or join early access. By submitting the early-access form, you confirm that you meet this requirement.</p> },
        { title: "Early access", body: <p>Joining the list does not create an account, guarantee admission, promise a launch date, or grant access to unreleased features. We may change, pause, or end the program.</p> },
        { title: "Acceptable use", body: <p>Do not misuse the website, interfere with its operation, submit false information, attempt unauthorized access, infringe rights, or use ReeferBudz to arrange cannabis or controlled-substance transactions.</p> },
        { title: "Account access and refusal", body: <p>ReeferBudz may refuse, pause, limit, or remove access to the early-access program or member preview when safety, policy, operational, or legal concerns require it.</p> },
        { title: "Intellectual property", body: <p>ReeferBudz names, logos, mascots, text, and other brand materials are owned by their respective rights holder and may not be copied or used without permission except as allowed by law.</p> },
        { title: "Safety and disclaimers", body: <p>Information on this site is general and does not replace legal, medical, emergency, or personal-safety advice. The website and early-access program are provided on an “as available” basis to the extent permitted by law, and ReeferBudz does not guarantee admission, feature availability, uptime, or compatibility with every device or browser.</p> },
        { title: "Changes", body: <p>ReeferBudz may update these terms as the website, member preview, or launch plans evolve. Continued use after an update means the revised terms apply to the extent permitted by law.</p> },
        { title: "Governing details", body: <p>These terms are intended for a Cleveland-born, United States-based launch context. More formal governing-law and dispute language may be added as legal review and launch readiness progress.</p> },
        { title: "Contact", body: <p>Questions about these terms may be sent to legal@reeferbudz.com.</p> },
      ]}
    />
  );
}
