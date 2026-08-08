"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MobileSiteMenu() {
  const [open, setOpen] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnScroll = () => setOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, []);

  return <details className="mobile-menu" ref={details} open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary aria-label={open ? "Close navigation" : "Open navigation"}><span /><span /><span /></summary>
    <nav aria-label="Mobile navigation" onClick={() => setOpen(false)}>
      <MenuCategory title="About Us" links={[["Our Story","/our-story"],["How It Works","/how-it-works"],["Safety","/safety"],["Contact","/contact"]]} />
      <MenuCategory title="Explore" links={[["Sign Up","/signup"],["Log In","/login"],["Community Guidelines","/community-guidelines"]]} />
      <MenuCategory title="Legal & Access" links={[["Privacy","/privacy"],["Terms","/terms"],["Accessibility","/accessibility"]]} />
    </nav>
  </details>;
}

function MenuCategory({ title, links }: { title: string; links: Array<[string,string]> }) {
  return <div className="mobile-menu-category"><strong>{title}</strong><div className="mobile-submenu">{links.map(([label,href]) => <Link href={href} key={href}>{label}</Link>)}</div></div>;
}
