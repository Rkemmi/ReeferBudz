import type { Metadata } from "next";
import Link from "next/link";
import { StaticImage as Image } from "../components/static-image";
import { AdminPanel } from "../components/admin-panel";
import { getAllowedAdminEmails, requireAdminUser } from "./admin-auth";
import {
  getAdminAnalytics,
  listRecentEvents,
  listRecentFlags,
  listRecentReports,
  lookupMembers,
} from "../../db/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ReeferBudz Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const admin = await requireAdminUser("/admin");
  const query = ((await searchParams).q ?? "").trim();

  const [analytics, flags, reports, events, members] = await Promise.all([
    getAdminAnalytics(),
    listRecentFlags(),
    listRecentReports(),
    listRecentEvents(),
    lookupMembers(query),
  ]);

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <Image
              src="/brand/reeferbudz-wordmark.svg"
              alt="ReeferBudz"
              width={190}
              height={68}
            />
            <div className="admin-pill-row">
              <span className="admin-pill">Internal admin</span>
              <span className="admin-pill">Signed in as {admin.email}</span>
              <span className="admin-pill">
                {getAllowedAdminEmails().length} approved admin email
                {getAllowedAdminEmails().length === 1 ? "" : "s"}
              </span>
            </div>
            <h1>ReeferBudz admin panel</h1>
            <p>
              A small first internal ops surface for member lookup, account
              status control, internal review notes, event drafting, and a
              lightweight community snapshot.
            </p>
            <p>
              It is intentionally not a claim of full moderation automation or
              complete trust-and-safety coverage.
            </p>
          </div>

          <div className="admin-actions">
            <Link href="/member">Member app</Link>
            <Link className="admin-outline" href="/community-guidelines">
              Guidelines
            </Link>
          </div>
        </header>

        <div className="admin-guard">
          This first version stores internal admin notes and event records, but
          it does not claim automated moderation, reporting resolution, or a
          complete trust-and-safety workflow. Admins should treat this panel as
          an audited early tool, not a source of certainty beyond the data it
          explicitly shows.
        </div>

        <AdminPanel
          initialQuery={query}
          members={members}
          analytics={analytics}
          flags={flags}
          reports={reports}
          events={events}
        />
      </div>
    </main>
  );
}
