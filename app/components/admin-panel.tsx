"use client";

import { useState } from "react";
import type {
  AdminAnalytics,
  AdminFlagRecord,
  AdminReportRecord,
  CommunityEventRecord,
  MemberLookupRecord,
} from "../../db/admin";

type Props = {
  initialQuery: string;
  members: MemberLookupRecord[];
  analytics: AdminAnalytics;
  flags: AdminFlagRecord[];
  reports: AdminReportRecord[];
  events: CommunityEventRecord[];
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function AdminPanel({
  initialQuery,
  members,
  analytics,
  flags,
  reports,
  events,
}: Props) {
  const [memberStatus, setMemberStatus] = useState<Record<string, SaveState>>({});
  const [memberMessages, setMemberMessages] = useState<Record<string, string>>({});
  const [flagState, setFlagState] = useState<SaveState>("idle");
  const [reportState, setReportState] = useState<SaveState>("idle");
  const [eventState, setEventState] = useState<SaveState>("idle");

  async function patchMemberStatus(memberId: string, status: string) {
    setMemberStatus((current) => ({ ...current, [memberId]: "saving" }));
    setMemberMessages((current) => ({ ...current, [memberId]: "" }));

    try {
      const response = await fetch("/api/admin/member-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, status }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to update account.");
      }

      setMemberStatus((current) => ({ ...current, [memberId]: "saved" }));
      setMemberMessages((current) => ({
        ...current,
        [memberId]: "Status saved. Refresh to see the latest snapshot.",
      }));
    } catch (error) {
      setMemberStatus((current) => ({ ...current, [memberId]: "error" }));
      setMemberMessages((current) => ({
        ...current,
        [memberId]:
          error instanceof Error ? error.message : "Unable to update account.",
      }));
    }
  }

  async function submitJson(
    path: string,
    form: HTMLFormElement,
    setState: (state: SaveState) => void,
  ) {
    setState("saving");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to save.");
      }

      setState("saved");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="admin-layout">
      <section className="admin-grid">
        <article className="admin-card">
          <p className="onboarding-step">Analytics</p>
          <h2>Small internal snapshot</h2>
          <div className="admin-stat-grid">
            <div className="admin-stat">
              <span>Signups</span>
              <strong>{analytics.totalMembers}</strong>
              <small>Member records created so far</small>
            </div>
            <div className="admin-stat">
              <span>Active members</span>
              <strong>{analytics.activeMembers}</strong>
              <small>Accounts currently allowed into the member app</small>
            </div>
            <div className="admin-stat">
              <span>Open flags</span>
              <strong>{analytics.openFlags}</strong>
              <small>Members currently marked for review</small>
            </div>
            <div className="admin-stat">
              <span>Open reports</span>
              <strong>{analytics.openReports}</strong>
              <small>Internal moderation reports not resolved</small>
            </div>
          </div>

          <div className="admin-state">
            <div className="admin-state-row">
              <span>Published events</span>
              <strong>{analytics.publishedEvents}</strong>
            </div>
            <div className="admin-state-row">
              <span>Early access list</span>
              <strong>{analytics.earlyAccessSignups}</strong>
            </div>
          </div>
        </article>

        <aside className="admin-card">
          <p className="onboarding-step">City clusters</p>
          <h2>Where members are grouped</h2>
          <ul className="admin-list">
            {analytics.cityClusters.length ? (
              analytics.cityClusters.map((cluster) => (
                <li key={cluster.label}>
                  <strong>{cluster.label}</strong>
                  {cluster.total} active member{cluster.total === 1 ? "" : "s"}
                </li>
              ))
            ) : (
              <li>
                <strong>No active clusters yet</strong>
                Member location patterns will appear here after onboarding data
                grows.
              </li>
            )}
          </ul>
        </aside>
      </section>

      <section className="admin-card">
        <div className="admin-search-row">
          <div>
            <p className="onboarding-step">Member lookup</p>
            <h2>Find, approve, review, or disable accounts</h2>
            <p>Search by name, email, city, or region.</p>
          </div>
          <form action="/admin" className="admin-search-form">
            <input
              type="search"
              name="q"
              placeholder="Search members"
              defaultValue={initialQuery}
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="admin-member-list">
          {members.length ? (
            members.map((member) => (
              <article className="admin-member-card" key={member.id}>
                <div>
                  <strong>{member.display_name}</strong>
                  <p>{member.email}</p>
                  <small>
                    {[member.city, member.region].filter(Boolean).join(", ") ||
                      "Location not set"}
                  </small>
                </div>

                <div className="admin-member-meta">
                  <span className={`admin-badge admin-badge--${member.status}`}>
                    {member.status}
                  </span>
                  <span className="admin-badge admin-badge--plain">
                    {member.discoverable ? "discoverable" : "hidden"}
                  </span>
                  {member.open_flag_count > 0 ? (
                    <span className="admin-badge admin-badge--flagged">
                      {member.open_flag_count} open flag
                      {member.open_flag_count === 1 ? "" : "s"}
                    </span>
                  ) : null}
                </div>

                <div className="admin-member-actions">
                  <button
                    className="button button-small"
                    type="button"
                    onClick={() => patchMemberStatus(member.id, "active")}
                  >
                    Approve
                  </button>
                  <button
                    className="button button-small button-outline"
                    type="button"
                    onClick={() => patchMemberStatus(member.id, "review")}
                  >
                    Mark review
                  </button>
                  <button
                    className="button button-small button-secondary"
                    type="button"
                    onClick={() => patchMemberStatus(member.id, "disabled")}
                  >
                    Disable
                  </button>
                </div>

                {memberMessages[member.id] ? (
                  <p
                    className={
                      memberStatus[member.id] === "error"
                        ? "form-error"
                        : "form-success"
                    }
                  >
                    {memberMessages[member.id]}
                  </p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="admin-empty-state">
              No members matched that search yet.
            </p>
          )}
        </div>
      </section>

      <section className="admin-grid">
        <article className="admin-card">
          <p className="onboarding-step">Flag review</p>
          <h2>Create a quick internal flag</h2>
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              void submitJson(
                "/api/admin/member-flag",
                event.currentTarget,
                setFlagState,
              );
            }}
          >
            <label>
              Member ID
              <input name="memberId" placeholder="Paste a member id" required />
            </label>
            <label>
              Reason
              <textarea
                name="reason"
                minLength={8}
                rows={4}
                placeholder="Why this account needs review"
                required
              />
            </label>
            <button className="button" type="submit">
              Save flag
            </button>
            {flagState === "saved" ? (
              <p className="form-success">Flag saved. Refresh to see it in the queue.</p>
            ) : null}
            {flagState === "error" ? (
              <p className="form-error">The flag could not be saved.</p>
            ) : null}
          </form>

          <ul className="admin-list">
            {flags.map((flag) => (
              <li key={flag.id}>
                <strong>{flag.member_id}</strong>
                {flag.reason}
              </li>
            ))}
          </ul>
        </article>

        <article className="admin-card">
          <p className="onboarding-step">Reports</p>
          <h2>Internal moderation notes</h2>
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              void submitJson(
                "/api/admin/report",
                event.currentTarget,
                setReportState,
              );
            }}
          >
            <label>
              Subject member ID
              <input name="subjectMemberId" placeholder="Optional member id" />
            </label>
            <label>
              Category
              <input
                name="category"
                placeholder="Spam, conduct, profile, safety"
                required
              />
            </label>
            <label>
              Summary
              <textarea
                name="summary"
                minLength={12}
                rows={4}
                placeholder="What happened, what needs review, and any next step"
                required
              />
            </label>
            <button className="button" type="submit">
              Save report
            </button>
            {reportState === "saved" ? (
              <p className="form-success">Report saved. Refresh to see the latest queue.</p>
            ) : null}
            {reportState === "error" ? (
              <p className="form-error">The report could not be saved.</p>
            ) : null}
          </form>

          <ul className="admin-list">
            {reports.map((report) => (
              <li key={report.id}>
                <strong>{report.category}</strong>
                {report.summary}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="admin-card">
        <p className="onboarding-step">Events</p>
        <h2>Create or edit a community event</h2>
        <form
          className="admin-form admin-form--events"
          onSubmit={(event) => {
            event.preventDefault();
            void submitJson("/api/admin/event", event.currentTarget, setEventState);
          }}
        >
          <label>
            Event ID
            <input name="id" placeholder="Leave blank for a new event" />
          </label>
          <label>
            Title
            <input name="title" placeholder="Sunset smoke circle" required />
          </label>
          <label>
            City
            <input name="city" placeholder="Cleveland" />
          </label>
          <label>
            Region
            <input name="region" placeholder="Ohio" />
          </label>
          <label>
            Starts at
            <input name="startsAt" type="datetime-local" required />
          </label>
          <label>
            Ends at
            <input name="endsAt" type="datetime-local" />
          </label>
          <label>
            Status
            <select defaultValue="draft" name="status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <label className="admin-form-span">
            Description
            <textarea
              name="description"
              minLength={12}
              rows={4}
              placeholder="Add event details, audience, and tone"
              required
            />
          </label>
          <button className="button" type="submit">
            Save event
          </button>
          {eventState === "saved" ? (
            <p className="form-success">Event saved. Refresh to see the updated list.</p>
          ) : null}
          {eventState === "error" ? (
            <p className="form-error">The event could not be saved.</p>
          ) : null}
        </form>

        <div className="admin-event-list">
          {events.map((item) => (
            <article className="admin-event-card" key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <small>
                {item.status} • {item.city || "No city"}
                {item.region ? `, ${item.region}` : ""}
              </small>
              <code>{item.id}</code>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
