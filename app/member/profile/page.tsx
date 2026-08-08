import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MemberShell } from "../../components/member-shell";
import { MemberProfileEditor } from "../../components/member-profile-editor";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { findMemberByEmail, publicLocation } from "../../../db/members";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your Profile", robots: { index: false, follow: false } };

export default async function MemberProfilePage() {
  const user = await requireChatGPTUser("/member/profile");
  const member = await findMemberByEmail(user.email);
  if (!member) redirect("/onboarding");
  const interests = JSON.parse(member.interests) as string[];
  return <MemberShell displayName={member.display_name} active="profile"><main className="member-main profile-page"><section className="member-page-hero"><div><p className="eyebrow eyebrow-light">Your profile</p><h1>Show your future Budz what makes you, you.</h1><p>Warm, genuine details make it easier to find friendships that fit. You control what other members can see.</p></div><div className="profile-visibility-badge"><span aria-hidden="true">●</span><strong>{member.discoverable ? "Visible in Discover" : "Hidden from Discover"}</strong><small>{publicLocation(member)}</small></div></section><div className="profile-workspace"><aside className="profile-preview" aria-label="Member profile preview"><p className="onboarding-step">Member view</p><div className="profile-avatar" aria-hidden="true">{member.display_name.slice(0, 1).toUpperCase()}</div><h2>{member.display_name}</h2><p className="member-location">{publicLocation(member)}</p><p>{member.bio}</p><div className="member-tags">{interests.map((interest) => <span key={interest}>{interest}</span>)}</div><div className="profile-goals"><span>Looking for</span><p>{member.friendship_goals}</p></div><small>Your email, birthday, and exact private location never appear here.</small></aside><MemberProfileEditor member={{ displayName: member.display_name, bio: member.bio, interests, friendshipGoals: member.friendship_goals }} /></div></main></MemberShell>;
}
