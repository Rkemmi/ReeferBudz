import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStory() {
  return (
    <ContentPage
      eyebrow="Our Story"
      title="Cleveland roots. A simple human need."
      intro="ReeferBudz began with a belief that cannabis-friendly adults deserve an easier, more comfortable way to find genuine friendship."
      banner={{
        eyebrow: "Made in Cleveland",
        title: "Every good circle has an origin story.",
        description: "Join the Founding Budz and help write the next chapter of a community built for real friendship.",
        scene: "story",
        sceneLabel: "Scrapbook day",
        mascotAlt: "The ReeferBudz mascots looking through a community scrapbook together",
      }}
      sections={[
        {
          title: "Why ReeferBudz exists",
          body: <><p>Dating apps are built around romance. Broad social networks make shared lifestyles hard to see. Many adults are left without a natural way to find nearby people who understand.</p><p>ReeferBudz is being built to make that first point of common ground visible—without turning friendship into a popularity contest.</p></>,
        },
        {
          title: "What we are building toward",
          body: <><p>Profiles shaped by interests. Conversations that move at your pace. Local Smoke Circles built around music, gaming, art, food, outdoors, and good conversation.</p><p>The promise is straightforward: helping cannabis-friendly adults turn shared interests into real friendship and community.</p></>,
        },
        {
          title: "What we are not",
          body: <p>ReeferBudz is not a cannabis marketplace, delivery service, dating app, or place to arrange cannabis transactions. It is an adults-only friendship and community platform.</p>,
        },
      ]}
    />
  );
}
