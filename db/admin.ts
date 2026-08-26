import { env } from "cloudflare:workers";
import type { MemberRecord } from "./members";

export type AdminMemberStatus = "active" | "review" | "disabled";
export type AdminFlagStatus = "open" | "resolved";
export type AdminEventStatus = "draft" | "published" | "cancelled";
export type AdminReportStatus = "open" | "reviewing" | "resolved";

export type MemberLookupRecord = Pick<
  MemberRecord,
  | "id"
  | "email"
  | "display_name"
  | "city"
  | "region"
  | "discoverable"
  | "status"
  | "created_at"
  | "updated_at"
> & {
  open_flag_count: number;
};

export type AdminFlagRecord = {
  id: string;
  member_id: string;
  reason: string;
  status: AdminFlagStatus;
  created_by_email: string;
  created_at: string;
  updated_at: string;
};

export type AdminReportRecord = {
  id: string;
  subject_member_id: string | null;
  category: string;
  summary: string;
  status: AdminReportStatus;
  created_by_email: string;
  created_at: string;
  updated_at: string;
};

export type CommunityEventRecord = {
  id: string;
  title: string;
  description: string;
  city: string | null;
  region: string | null;
  starts_at: string;
  ends_at: string | null;
  status: AdminEventStatus;
  created_by_email: string;
  created_at: string;
  updated_at: string;
};

export type CityCluster = {
  label: string;
  total: number;
};

export type AdminAnalytics = {
  totalMembers: number;
  activeMembers: number;
  earlyAccessSignups: number;
  openFlags: number;
  openReports: number;
  publishedEvents: number;
  cityClusters: CityCluster[];
};

export async function ensureAdminSchema() {
  const db = env.DB;

  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS admin_member_flags (
      id TEXT PRIMARY KEY NOT NULL,
      member_id TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      created_by_email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_admin_member_flags_member_status ON admin_member_flags (member_id, status)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS admin_reports (
      id TEXT PRIMARY KEY NOT NULL,
      subject_member_id TEXT,
      category TEXT NOT NULL,
      summary TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      created_by_email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_admin_reports_status_created ON admin_reports (status, created_at)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS community_events (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      city TEXT,
      region TEXT,
      starts_at TEXT NOT NULL,
      ends_at TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      created_by_email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_community_events_status_start ON community_events (status, starts_at)"),
  ]);
}

export async function lookupMembers(query: string) {
  await ensureAdminSchema();
  const search = `%${query.trim().toLowerCase()}%`;
  const result = await env.DB.prepare(
    `SELECT
      m.id,
      m.email,
      m.display_name,
      m.city,
      m.region,
      m.discoverable,
      m.status,
      m.created_at,
      m.updated_at,
      (
        SELECT COUNT(*)
        FROM admin_member_flags f
        WHERE f.member_id = m.id AND f.status = 'open'
      ) AS open_flag_count
    FROM members m
    WHERE
      ? = '%%'
      OR LOWER(m.email) LIKE ?
      OR LOWER(m.display_name) LIKE ?
      OR LOWER(COALESCE(m.city, '')) LIKE ?
      OR LOWER(COALESCE(m.region, '')) LIKE ?
    ORDER BY m.updated_at DESC
    LIMIT 24`,
  )
    .bind(search, search, search, search, search)
    .all<MemberLookupRecord>();

  return result.results;
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  await ensureAdminSchema();

  const [
    totalMembers,
    activeMembers,
    earlyAccessSignups,
    openFlags,
    openReports,
    publishedEvents,
    cityClusters,
  ] = await Promise.all([
    scalar("SELECT COUNT(*) AS total FROM members WHERE status != 'deleted'"),
    scalar("SELECT COUNT(*) AS total FROM members WHERE status = 'active'"),
    scalar("SELECT COUNT(*) AS total FROM early_access_signups"),
    scalar("SELECT COUNT(*) AS total FROM admin_member_flags WHERE status = 'open'"),
    scalar("SELECT COUNT(*) AS total FROM admin_reports WHERE status != 'resolved'"),
    scalar("SELECT COUNT(*) AS total FROM community_events WHERE status = 'published'"),
    env.DB.prepare(
      `SELECT
        CASE
          WHEN city IS NOT NULL AND region IS NOT NULL THEN city || ', ' || region
          WHEN region IS NOT NULL THEN region
          ELSE 'Location not set'
        END AS label,
        COUNT(*) AS total
      FROM members
      WHERE status = 'active'
      GROUP BY label
      ORDER BY total DESC, label ASC
      LIMIT 6`,
    ).all<CityCluster>(),
  ]);

  return {
    totalMembers,
    activeMembers,
    earlyAccessSignups,
    openFlags,
    openReports,
    publishedEvents,
    cityClusters: cityClusters.results,
  };
}

export async function listRecentFlags(limit = 8) {
  await ensureAdminSchema();
  const result = await env.DB.prepare(
    `SELECT *
     FROM admin_member_flags
     ORDER BY updated_at DESC
     LIMIT ?`,
  )
    .bind(limit)
    .all<AdminFlagRecord>();

  return result.results;
}

export async function listRecentReports(limit = 8) {
  await ensureAdminSchema();
  const result = await env.DB.prepare(
    `SELECT *
     FROM admin_reports
     ORDER BY updated_at DESC
     LIMIT ?`,
  )
    .bind(limit)
    .all<AdminReportRecord>();

  return result.results;
}

export async function listRecentEvents(limit = 8) {
  await ensureAdminSchema();
  const result = await env.DB.prepare(
    `SELECT *
     FROM community_events
     ORDER BY starts_at ASC, updated_at DESC
     LIMIT ?`,
  )
    .bind(limit)
    .all<CommunityEventRecord>();

  return result.results;
}

export async function updateMemberStatus(
  memberId: string,
  status: AdminMemberStatus,
) {
  await ensureAdminSchema();
  await env.DB.prepare(
    "UPDATE members SET status = ?, updated_at = ? WHERE id = ?",
  )
    .bind(status, new Date().toISOString(), memberId)
    .run();
}

export async function createMemberFlag(input: {
  memberId: string;
  reason: string;
  createdByEmail: string;
}) {
  await ensureAdminSchema();
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO admin_member_flags (
      id, member_id, reason, status, created_by_email, created_at, updated_at
    ) VALUES (?, ?, ?, 'open', ?, ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      input.memberId,
      input.reason,
      input.createdByEmail,
      now,
      now,
    )
    .run();
}

export async function createAdminReport(input: {
  subjectMemberId: string | null;
  category: string;
  summary: string;
  createdByEmail: string;
}) {
  await ensureAdminSchema();
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO admin_reports (
      id, subject_member_id, category, summary, status, created_by_email, created_at, updated_at
    ) VALUES (?, ?, ?, ?, 'open', ?, ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      input.subjectMemberId,
      input.category,
      input.summary,
      input.createdByEmail,
      now,
      now,
    )
    .run();
}

export async function saveCommunityEvent(input: {
  id?: string;
  title: string;
  description: string;
  city: string | null;
  region: string | null;
  startsAt: string;
  endsAt: string | null;
  status: AdminEventStatus;
  createdByEmail: string;
}) {
  await ensureAdminSchema();
  const now = new Date().toISOString();
  const id = input.id?.trim() || crypto.randomUUID();

  await env.DB.prepare(
    `INSERT INTO community_events (
      id, title, description, city, region, starts_at, ends_at, status, created_by_email, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      city = excluded.city,
      region = excluded.region,
      starts_at = excluded.starts_at,
      ends_at = excluded.ends_at,
      status = excluded.status,
      updated_at = excluded.updated_at`,
  )
    .bind(
      id,
      input.title,
      input.description,
      input.city,
      input.region,
      input.startsAt,
      input.endsAt,
      input.status,
      input.createdByEmail,
      now,
      now,
    )
    .run();
}

async function scalar(sql: string) {
  const row = await env.DB.prepare(sql).first<{ total: number | string | null }>();
  return Number(row?.total ?? 0);
}
