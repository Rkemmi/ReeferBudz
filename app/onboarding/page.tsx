import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MemberOnboardingForm } from "../components/member-onboarding-form";
import { StaticImage as Image } from "../components/static-image";
import { requireChatGPTUser } from "../chatgpt-auth";
import { findMemberByEmail, memberHasAppAccess } from "../../db/members";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Set Up Your Member Profile", robots: { index: false, follow: false } };

export default async function OnboardingPage() {
  const user = await requireChatGPTUser("/onboarding");
  const member = await findMemberByEmail(user.email);
  if (member && memberHasAppAccess(member)) redirect("/member");
  if (member && !memberHasAppAccess(member)) {
    return <main className="member-gate"><header className="member-gate-header"><Link href="/"><Image src="/brand/reeferbudz-wordmark.svg" alt="ReeferBudz" width={190} height={68} /></Link><span>Account review</span></header><div className="member-gate-layout"><aside><p className="eyebrow eyebrow-light">Access paused</p><h1>Your member account is not active right now.</h1><p>Sign-in worked, but this profile is currently under review or otherwise paused. That means member access stays closed until ReeferBudz staff restores it.</p><div className="attestation-note"><strong>What happens next</strong><p>If you think this is a mistake, contact ReeferBudz and include the email tied to your sign-in so your status can be reviewed more quickly.</p></div></aside><div className="member-gate-card"><p className="onboarding-step">Current status</p><h2>{member.status}</h2><p>For safety and moderation reasons, this account cannot restart onboarding on its own while review is active.</p><Link className="button" href="/contact">Contact ReeferBudz</Link></div></div></main>;
  }

  return <main className="member-gate"><header className="member-gate-header"><Link href="/"><Image src="/brand/reeferbudz-wordmark.svg" alt="ReeferBudz" width={190} height={68} /></Link><span>Secure member setup</span></header><div className="member-gate-layout"><aside><p className="eyebrow eyebrow-light">Welcome to the circle</p><h1>Build a profile that feels like you.</h1><p>These steps set up sign-in-backed access, your community promise, your profile, and your privacy settings in a calm, straightforward order.</p><div className="attestation-note"><strong>21+ self-attestation</strong><p>ReeferBudz does not currently use an identity or age-verification provider.</p></div></aside><MemberOnboardingForm email={user.email} suggestedName={user.fullName ?? ""} /></div></main>;
}
