import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Accessibility" };

export default function Accessibility() {
  return (
    <ContentPage
      eyebrow="Accessibility"
      title="The circle should be easier for everyone to enter."
      intro="ReeferBudz is committed to building an inclusive website and product experience for people with disabilities."
      banner={{
        eyebrow: "Everyone belongs",
        title: "More ways in. More people in the circle.",
        description: "Help us notice barriers and keep improving how the community welcomes everyone.",
        scene: "accessibility",
        sceneLabel: "Building an easier path",
        mascotAlt: "The ReeferBudz mascots making the path into the community easier to use",
      }}
      sections={[
        { title: "Our approach", body: <p>We aim to support keyboard navigation, visible focus states, meaningful headings, descriptive text alternatives, sufficient color contrast, responsive layouts, zoom, and reduced-motion preferences.</p> },
        { title: "Ongoing work", body: <p>Accessibility is a continuing practice. As community features are designed, we will test core journeys and include accessibility in product review rather than treating it as a final check.</p> },
        { title: "Request help or report a barrier", body: <p>If something prevents you from using this site, email accessibility@reeferbudz.com. Include the page, what you were trying to do, and your preferred way for us to respond. We will offer a reasonable alternative when possible.</p> },
        { title: "Compatible experiences", body: <p>The site is designed for current versions of major browsers and common assistive technologies. Older software may provide a less complete experience.</p> },
      ]}
    />
  );
}
