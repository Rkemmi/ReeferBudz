import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { MemberShell } from "../components/member-shell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Member Home Preview",
  robots: { index: false, follow: false },
};

const interests = ["Creative projects", "Live music", "Lake days", "Local events"];

export default async function MemberHomePreview() {
  const host = (await headers()).get("host")?.split(":")[0];
  if (host !== "localhost" && host !== "127.0.0.1") notFound();

  return <MemberShell displayName="Rachel"><main className="member-main"><section className="member-welcome"><div><p className="eyebrow eyebrow-light">Member Home</p><h1>Hey, Rachel. Your circle starts here.</h1><p>Your profile is ready. Discover, connections, messages, and Smoke Circles will arrive in the next safe, testable slices.</p></div><div className="profile-readiness"><span>Profile ready</span><strong>100%</strong><small>21+ self-attested · Email confirmed via sign-in</small></div></section><section className="member-grid"><article className="member-profile-card"><p className="onboarding-step">Your member card</p><h2>Rachel</h2><p className="member-location">Cleveland, Ohio</p><p>Cleveland creative building community, making new friends, and finding good energy around the city.</p><div className="member-tags">{interests.map((interest) => <span key={interest}>{interest}</span>)}</div><h3>Looking for</h3><p>Meet genuine people for events, creative hangs, and laid-back adventures around Cleveland.</p><span className="disabled-action">Profile editing is the next milestone</span></article><div className="member-dashboard-stack"><article className="member-action-card"><span>Next milestone</span><h2>Discover compatible Budz</h2><p>Recommendations will respect blocks, discovery preferences, and the location detail each member chooses to share.</p><span className="disabled-action">Coming in the next slice</span></article><article className="member-safety-card"><h2>Keep every connection comfortable</h2><p>No sales, delivery, transactions, dating or hookup solicitation, unsafe consumption, or impaired driving.</p><a href="/safety">Visit the Safety Center →</a></article></div></section></main></MemberShell>;
}
