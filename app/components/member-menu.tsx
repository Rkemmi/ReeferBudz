"use client";

import { useEffect, useState } from "react";

const futureDestinations = ["Live Budz", "Recently Live Budz", "Messages", "Events", "Matches", "Search Members"];

export function MemberMenu({ signOutPath }: { signOutPath: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = () => setOpen(false); window.addEventListener("scroll", close, { passive: true }); return () => window.removeEventListener("scroll", close); }, []);

  return <details className="member-menu" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}><summary aria-label={open ? "Close member menu" : "Open member menu"}><span /><span /><span /></summary><nav aria-label="Signed-in member menu" onClick={() => setOpen(false)}><strong>My ReeferBudz</strong><a href="/member/profile">Your Profile</a><a href="/guardian">Guardian Setup</a>{futureDestinations.map((label) => <span aria-disabled="true" key={label}>{label}<small>Coming soon</small></span>)}<div><a href="/member/settings">Settings</a><a href={signOutPath}>Sign Out</a></div></nav></details>;
}
