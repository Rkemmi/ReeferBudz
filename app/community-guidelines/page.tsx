import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Community Guidelines" };

export default function CommunityGuidelines() {
  return (
    <ContentPage
      eyebrow="Community Guidelines"
      title="Make the circle safer, kinder, and worth returning to."
      intro="These principles set the expectation for every profile, message, group, and in-person hangout connected through ReeferBudz."
      banner={{
        eyebrow: "Keep the circle kind",
        title: "Good vibes need good boundaries.",
        description: "Bring respect, honesty, and care to every new connection.",
        scene: "guidelines",
        sceneLabel: "Community promise board",
        mascotAlt: "The ReeferBudz mascots pinning kind community promises to a bulletin board",
      }}
      sections={[
        { title: "Respect consent and boundaries", body: <p>Do not pressure anyone for replies, personal information, photos, dates, substances, transportation, or in-person contact. Accept “no,” silence, blocks, and changed plans without retaliation.</p> },
        { title: "Keep it friendship-first", body: <p>ReeferBudz is not a dating or hookup service. Sexual harassment, explicit content, unwanted flirting, and deceptive intentions are prohibited.</p> },
        { title: "No sales or transactions", body: <p>Do not buy, sell, trade, deliver, request, or arrange cannabis or other controlled-substance transactions through ReeferBudz.</p> },
        { title: "Be real and protect privacy", body: <p>Do not impersonate people, misrepresent your age, share another person’s private information, record private interactions without consent, or use information from ReeferBudz to harass someone elsewhere.</p> },
        { title: "No hate, threats, or exploitation", body: <p>Hateful conduct, credible threats, stalking, bullying, scams, coercion, and exploitation are not permitted. Reports may lead to restrictions, suspension, or removal.</p> },
        { title: "Use good judgment offline", body: <p>Meet in public, control your own transportation, tell a trusted person, and leave if you feel uncomfortable. Platform tools support safer choices but cannot guarantee another person’s behavior.</p> },
      ]}
    />
  );
}
