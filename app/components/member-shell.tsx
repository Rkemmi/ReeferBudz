import { chatGPTSignOutPath } from "../chatgpt-auth";
import { MemberMenu } from "./member-menu";
import { StaticImage as Image } from "./static-image";

type MemberDestination = "home" | "discover" | "profile" | "guardian" | "settings";
const current = (active: MemberDestination, item: MemberDestination) => active === item ? "page" as const : undefined;

export function MemberShell({ children, displayName, active = "home" }: { children: React.ReactNode; displayName: string; active?: MemberDestination }) {
  const signOutPath = chatGPTSignOutPath("/");
  return <div className="member-app"><header className="member-header"><a href="/member" className="member-brand"><Image src="/brand/reeferbudz-wordmark.svg" alt="ReeferBudz" width={190} height={68} /></a><nav aria-label="Member navigation"><a aria-current={current(active,"home")} href="/member">Home</a><a aria-current={current(active,"discover")} href="/member/discover">Discover</a><span aria-disabled="true">Circles</span><span aria-disabled="true">Messages</span><a aria-current={current(active,"guardian")} href="/guardian">Guardian</a><a aria-current={current(active,"profile")} href="/member/profile">Profile</a></nav><div className="member-account"><span>{displayName}</span><a aria-current={current(active,"settings")} href="/member/settings">Settings</a><a href={signOutPath}>Sign out</a></div><MemberMenu signOutPath={signOutPath} /></header>{children}<nav className="member-mobile-nav" aria-label="Mobile member navigation"><a aria-current={current(active,"home")} href="/member">Home</a><a aria-current={current(active,"discover")} href="/member/discover">Discover</a><a aria-current={current(active,"guardian")} href="/guardian">Guardian</a><a aria-current={current(active,"profile")} href="/member/profile">Profile</a><a aria-current={current(active,"settings")} href="/member/settings">Settings</a></nav></div>;
}
