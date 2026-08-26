import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GuardianContactForm } from "../components/guardian-contact-form";
import { MemberShell } from "../components/member-shell";
import { requireChatGPTUser } from "../chatgpt-auth";
import { findMemberByEmail, memberHasAppAccess } from "../../db/members";
import { findGuardianContact } from "../../db/guardian";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Guardian Setup", robots: { index: false, follow: false } };

export default async function GuardianPage() {
  const user = await requireChatGPTUser("/guardian");
  const member = await findMemberByEmail(user.email);
  if (!member) redirect("/onboarding");
  if (!memberHasAppAccess(member)) redirect("/onboarding");
  const contact = await findGuardianContact(member.id);
  return <MemberShell displayName={member.display_name} active="guardian"><main className="member-main guardian-page"><section className="member-page-hero guardian-hero"><div><p className="eyebrow eyebrow-light">Guardian setup</p><h1>A trusted contact, with honest limits.</h1><p>You can save one emergency contact and record consent now. Live location, active monitoring, and Guardian alerts stay off until the full safety system is built and tested.</p></div><div className="guardian-mark" aria-hidden="true">G</div></section><section className="guardian-intro"><article><strong>What it does today</strong><span>Stores one restricted contact and can request verification.</span></article><article><strong>What it does not do today</strong><span>No live monitoring, live location, or emergency intervention.</span></article><article><strong>What must happen next</strong><span>Your contact must accept verification and the full Guardian system must be completed before alerts can ever begin.</span></article></section><GuardianContactForm contact={contact} /></main></MemberShell>;
}
