import type { Metadata } from "next";
import Link from "next/link";
import { GuardianVerificationForm } from "../../../components/guardian-verification-form";
import { StaticImage as Image } from "../../../components/static-image";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Guardian Contact Verification", robots: { index: false, follow: false } };

export default async function GuardianContactVerificationPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <main className="guardian-verification-page"><header><Link href="/"><Image src="/brand/reeferbudz-wordmark.svg" alt="ReeferBudz" width={190} height={68} /></Link></header><section className="guardian-verification-card"><p className="onboarding-step">Guardian contact verification</p><h1>Someone trusts you to be their emergency contact.</h1><p>If you accept, ReeferBudz may send you Guardian verification, alert, and resolution messages for that member after Guardian becomes operational.</p><div className="guardian-limit"><strong>Know the limits</strong><p>Guardian is not emergency services and does not guarantee monitoring, alert delivery, intervention, or safety. You can decline or opt out.</p></div>{token ? <GuardianVerificationForm token={token} /> : <p className="form-error" role="alert">This verification link is incomplete.</p>}</section></main>;
}
