import { env } from "cloudflare:workers";

export const CURRENT_GUIDELINES_VERSION = "2026-07-29";

export type MemberRecord = {
  id: string;
  email: string;
  display_name: string;
  birth_date: string;
  adult_attested_at: string;
  email_confirmed_at: string;
  email_confirmation_source: string;
  guidelines_version: string;
  guidelines_accepted_at: string;
  onboarding_completed_at: string;
  bio: string;
  interests: string;
  friendship_goals: string;
  city: string | null;
  region: string | null;
  location_visibility: "city_region" | "region_only" | "hidden";
  discoverable: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function ensureMemberSchema() {
  const db = env.DB;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      adult_attested_at TEXT NOT NULL,
      email_confirmed_at TEXT NOT NULL,
      email_confirmation_source TEXT NOT NULL,
      guidelines_version TEXT NOT NULL,
      guidelines_accepted_at TEXT NOT NULL,
      onboarding_completed_at TEXT NOT NULL,
      bio TEXT NOT NULL,
      interests TEXT NOT NULL,
      friendship_goals TEXT NOT NULL,
      city TEXT,
      region TEXT,
      location_visibility TEXT NOT NULL DEFAULT 'region_only',
      discoverable INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS members_email_unique ON members (email)"),
    db.prepare("CREATE INDEX IF NOT EXISTS members_discovery_idx ON members (status, discoverable, region)"),
  ]);
  const columns = await db.prepare("PRAGMA table_info(members)").all<{ name: string }>();
  const hasOnboardingCompletedAt = columns.results.some((column) => column.name === "onboarding_completed_at");
  if (!hasOnboardingCompletedAt) {
    await db.prepare("ALTER TABLE members ADD COLUMN onboarding_completed_at TEXT").run();
  }
  await db
    .prepare("UPDATE members SET onboarding_completed_at = COALESCE(onboarding_completed_at, updated_at, created_at) WHERE onboarding_completed_at IS NULL")
    .run();
}

export async function findMemberByEmail(email: string) {
  await ensureMemberSchema();
  return env.DB.prepare("SELECT * FROM members WHERE email = ? AND status != 'deleted'")
    .bind(email.toLowerCase())
    .first<MemberRecord>();
}

export async function findDiscoverableMembers(currentMember: MemberRecord) {
  await ensureMemberSchema();
  const result = await env.DB.prepare(`SELECT id, display_name, bio, interests, friendship_goals, city, region, location_visibility, discoverable, status, created_at, updated_at
    FROM members
    WHERE id != ? AND status = 'active' AND discoverable = 1 AND location_visibility != 'hidden'
    ORDER BY CASE WHEN region IS NOT NULL AND region = ? THEN 0 ELSE 1 END, updated_at DESC
    LIMIT 24`)
    .bind(currentMember.id, currentMember.region)
    .all<MemberRecord>();
  return result.results;
}

export function publicLocation(member: MemberRecord) {
  if (member.location_visibility === "hidden") return "Location hidden";
  if (member.location_visibility === "region_only") return member.region || "Region not set";
  return [member.city, member.region].filter(Boolean).join(", ") || "Location not set";
}
