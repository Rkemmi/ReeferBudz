import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { MemberShell } from "../../components/member-shell";
import { findDiscoverableMembers, findMemberByEmail, publicLocation } from "../../../db/members";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Discover Budz", robots: { index: false, follow: false } };

export default async function DiscoverBudzPage() {
  const user = await requireChatGPTUser("/member/discover");
  const member = await findMemberByEmail(user.email);
  if (!member) redirect("/onboarding");
  const matches = await findDiscoverableMembers(member);
  const myInterests = new Set(JSON.parse(member.interests) as string[]);

  return <MemberShell displayName={member.display_name} active="discover"><main className="member-main discover-page"><section className="member-page-hero discover-hero"><div><p className="eyebrow eyebrow-light">Discover Budz</p><h1>Find people who feel like your kind of circle.</h1><p>Explore friendship-first profiles shaped by shared interests and member-controlled location privacy.</p></div><div className="discover-count"><strong>{matches.length}</strong><span>{matches.length === 1 ? "Budz profile" : "Budz profiles"}</span><small>Only active, discoverable members</small></div></section><section className="discover-toolbar" aria-label="Discovery summary"><div><strong>Showing your safest starting set</strong><span>Shared interests and your general region come first.</span></div><a href="/member/settings#privacy">Change discovery settings →</a></section>{matches.length ? <section className="discover-grid" aria-label="Discoverable member profiles">{matches.map((match) => { const interests = JSON.parse(match.interests) as string[]; const shared = interests.filter((interest) => myInterests.has(interest)); return <article className="discover-card" key={match.id}><div className="discover-card-top"><div className="discover-avatar" aria-hidden="true">{match.display_name.slice(0,1).toUpperCase()}</div>{shared.length > 0 && <span>{shared.length} shared {shared.length === 1 ? "interest" : "interests"}</span>}</div><h2>{match.display_name}</h2><p className="member-location">{publicLocation(match)}</p><p>{match.bio}</p><div className="member-tags">{interests.slice(0,5).map((interest) => <span className={myInterests.has(interest) ? "shared-interest" : ""} key={interest}>{interest}</span>)}</div><div className="discover-goals"><span>Looking for</span><p>{match.friendship_goals}</p></div><span className="disabled-action">Connection requests arrive in the next safe slice</span></article>; })}</section> : <section className="discover-empty"><div className="empty-circle" aria-hidden="true"><span>{member.display_name.slice(0,1).toUpperCase()}</span><span>+</span><span>?</span></div><p className="onboarding-step">Your circle is growing</p><h2>No new Budz are ready to show just yet.</h2><p>We only show active members who opted into Discover and chose to share a general location. Check back as the community grows.</p><div><a className="button" href="/member/profile">Strengthen your profile</a><a className="text-action" href="/member/settings#privacy">Review privacy settings</a></div></section>}</main></MemberShell>;
}
