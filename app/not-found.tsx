import Link from "next/link";
import { PageShell } from "./components/site-chrome";

export default function NotFound() {
  return (
    <PageShell>
      <section className="welcome-panel">
        <p className="eyebrow">Page not found</p>
        <h1>This path doesn’t lead to the circle.</h1>
        <p className="hero-lead">The page may have moved, or the address may be incomplete.</p>
        <Link className="button" href="/">Return home</Link>
      </section>
    </PageShell>
  );
}
