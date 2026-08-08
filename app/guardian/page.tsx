import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GuardianContactForm } from "../components/guardian-contact-form";
import { MemberShell } from "../components/member-shell";
import { requireChatGPTUser } from "../chatgpt-auth";
import { findMemberByEmail } from "../../db/members";
import { findGuardianContact } from "../../db/guardian";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Guardian Setup", robots: { index: false, follow: false } };

export default async function GuardianPage() {
  const user = await requireChatGPTUser("/guardian");
  const member = await findMemberByEmail(user.email);
  if (!member) redirect("/onboarding");
  const contact = await findGuardianContact(member.id);
  return <MemberShell displayName={member.display_name} active="guardian"><main className="member-main guardian-page"><section className="member-page-hero guardian-hero"><div><p className="eyebrow eyebrow-light">Guardian setup</p><h1>A trusted contact, with honest limits.</h1><p>Add one emergency contact and record consent now. Live location and Guardian alerts stay off until the complete safety system is built and tested.</p></div><div className="guardian-mark" aria-hidden="true">G</div></section><section className="guardian-intro"><article><strong>Restricted</strong><span>Contact details never appear on your profile.</span></article><article><strong>Consent-based</strong><span>Your contact must accept before alerts can begin.</span></article><article><strong>Not monitoring</strong><span>ReeferBudz is not emergency services.</span></article></section><GuardianContactForm contact={contact} /></main></MemberShell>;
}
