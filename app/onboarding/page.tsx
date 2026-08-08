import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MemberOnboardingForm } from "../components/member-onboarding-form";
import { StaticImage as Image } from "../components/static-image";
import { requireChatGPTUser } from "../chatgpt-auth";
import { findMemberByEmail } from "../../db/members";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Set Up Your Member Profile", robots: { index: false, follow: false } };

export default async function OnboardingPage() {
  const user = await requireChatGPTUser("/onboarding");
  const member = await findMemberByEmail(user.email);
  if (member) redirect("/member");

  return <main className="member-gate"><header className="member-gate-header"><Link href="/"><Image src="/brand/reeferbudz-wordmark.svg" alt="ReeferBudz" width={190} height={68} /></Link><span>Secure member setup</span></header><div className="member-gate-layout"><aside><p className="eyebrow eyebrow-light">Welcome to the circle</p><h1>Build a profile that feels like you.</h1><p>Four short steps set up your account, community promise, profile, and privacy.</p><div className="attestation-note"><strong>21+ self-attestation</strong><p>ReeferBudz does not currently use an identity or age-verification provider.</p></div></aside><MemberOnboardingForm email={user.email} suggestedName={user.fullName ?? ""} /></div></main>;
}
