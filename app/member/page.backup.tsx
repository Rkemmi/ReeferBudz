import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { findMemberByEmail, publicLocation } from "../../db/members";
import { MemberShell } from "../components/member-shell";
import type { MemberRecord } from "../../db/members";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Member Home", robots: { index: false, follow: false } };

const LOCAL_PREVIEW_MEMBER: MemberRecord = {
  id: "local-preview",
  email: "preview@reeferbudz.local",
  display_name: "Rachel",
  birth_date: "1990-01-01",
  adult_attested_at: "2026-08-07T12:00:00.000Z",
  email_confirmed_at: "2026-08-07T12:00:00.000Z",
  email_confirmation_source: "local-preview",
  guidelines_version: "2026-07-29",
  guidelines_accepted_at: "2026-08-07T12:00:00.000Z",
  onboarding_completed_at: "2026-08-07T12:00:00.000Z",
  bio: "Cleveland creative building community, making new friends, and finding good energy around the city.",
  interests: JSON.stringify(["Creative projects", "Live music", "Lake days", "Local events"]),
  friendship_goals: "Meet genuine people for events, creative hangs, and laid-back adventures around Cleveland.",
  city: "Cleveland",
  region: "Ohio",
  location_visibility: "city_region",
  discoverable: 1,
  status: "active",
  created_at: "2026-08-07T12:00:00.000Z",
  updated_at: "2026-08-07T12:00:00.000Z",
};

export default async function MemberHome({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const previewRequested = (await searchParams).preview === "1";
  const host = (await headers()).get("host")?.split(":")[0];
  const localPreview = previewRequested && (host === "localhost" || host === "127.0.0.1");
  const user = localPreview ? null : await requireChatGPTUser("/member");
  const member = localPreview ? LOCAL_PREVIEW_MEMBER : await findMemberByEmail(user!.email);
  if (!member) redirect("/onboarding");
  const interests = JSON.parse(member.interests) as string[];

  return <MemberShell displayName={member.display_name}><main className="member-main"><section className="member-welcome"><div><p className="eyebrow eyebrow-light">Member Home</p><h1>Hey, {member.display_name}. Your circle starts here.</h1><p>Your profile is ready. Discover, connections, messages, and Smoke Circles will arrive in the next safe, testable slices.</p></div><div className="profile-readiness"><span>Profile ready</span><strong>100%</strong><small>21+ self-attested · Email confirmed via sign-in</small></div></section><section className="member-grid"><article className="member-profile-card"><p className="onboarding-step">Your member card</p><h2>{member.display_name}</h2><p className="member-location">{publicLocation(member)}</p><p>{member.bio}</p><div className="member-tags">{interests.map((interest) => <span key={interest}>{interest}</span>)}</div><h3>Looking for</h3><p>{member.friendship_goals}</p><span className="disabled-action">Profile editing is the next milestone</span></article><div className="member-dashboard-stack"><article className="member-action-card"><span>Next milestone</span><h2>Discover compatible Budz</h2><p>Recommendations will respect blocks, discovery preferences, and the location detail each member chooses to share.</p><span className="disabled-action">Coming in the next slice</span></article><article className="member-safety-card"><h2>Keep every connection comfortable</h2><p>No sales, delivery, transactions, dating or hookup solicitation, unsafe consumption, or impaired driving.</p><a href="/safety">Visit the Safety Center →</a></article></div></section></main></MemberShell>;
}
