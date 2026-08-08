import { env } from "cloudflare:workers";

export const GUARDIAN_MEMBER_CONSENT_VERSION = "guardian-contact-2026-08-07";
export const GUARDIAN_CONTACT_CONSENT_VERSION = "guardian-contact-acceptance-2026-08-07";

type RestrictedContactRecord = {
  id: string;
  member_id: string;
  encrypted_name: string;
  encrypted_phone: string;
  encrypted_email: string | null;
  verification_status: "pending" | "accepted" | "declined" | "revoked" | "expired";
  verification_expires_at: string | null;
  member_consent_at: string;
  contact_consent_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GuardianContactView = {
  id: string;
  name: string;
  maskedPhone: string;
  maskedEmail: string | null;
  verificationStatus: RestrictedContactRecord["verification_status"];
  verificationExpiresAt: string | null;
  memberConsentAt: string;
  contactConsentAt: string | null;
};

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS guardian_contacts (
    id TEXT PRIMARY KEY NOT NULL,
    member_id TEXT NOT NULL UNIQUE,
    encrypted_name TEXT NOT NULL,
    encrypted_phone TEXT NOT NULL,
    encrypted_email TEXT,
    verification_status TEXT NOT NULL DEFAULT 'pending',
    verification_token_hash TEXT,
    verification_expires_at TEXT,
    member_consent_version TEXT NOT NULL,
    member_consent_at TEXT NOT NULL,
    contact_consent_version TEXT,
    contact_consent_at TEXT,
    removed_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS guardian_consent_events (
    id TEXT PRIMARY KEY NOT NULL,
    member_id TEXT NOT NULL,
    guardian_contact_id TEXT,
    actor_type TEXT NOT NULL,
    consent_type TEXT NOT NULL,
    document_version TEXT NOT NULL,
    status TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (guardian_contact_id) REFERENCES guardian_contacts(id) ON DELETE SET NULL
  )`,
  "CREATE INDEX IF NOT EXISTS idx_guardian_contacts_status ON guardian_contacts (verification_status)",
  "CREATE INDEX IF NOT EXISTS idx_guardian_contacts_token_hash ON guardian_contacts (verification_token_hash)",
  "CREATE INDEX IF NOT EXISTS idx_guardian_consent_events_member_created ON guardian_consent_events (member_id, created_at)",
];

export async function ensureGuardianSchema() {
  await env.DB.batch(schemaStatements.map((statement) => env.DB.prepare(statement)));
}

export async function findGuardianContact(memberId: string): Promise<GuardianContactView | null> {
  await ensureGuardianSchema();
  const record = await env.DB.prepare(`SELECT * FROM guardian_contacts
    WHERE member_id = ? AND removed_at IS NULL`)
    .bind(memberId)
    .first<RestrictedContactRecord>();
  if (!record) return null;

  const [name, phone, email] = await Promise.all([
    decryptRestrictedValue(record.encrypted_name),
    decryptRestrictedValue(record.encrypted_phone),
    record.encrypted_email ? decryptRestrictedValue(record.encrypted_email) : Promise.resolve(null),
  ]);

  return {
    id: record.id,
    name,
    maskedPhone: maskPhone(phone),
    maskedEmail: email ? maskEmail(email) : null,
    verificationStatus: record.verification_status,
    verificationExpiresAt: record.verification_expires_at,
    memberConsentAt: record.member_consent_at,
    contactConsentAt: record.contact_consent_at,
  };
}

export async function createOrReplaceGuardianContact(input: {
  memberId: string;
  name: string;
  phone: string;
  email: string | null;
}) {
  await ensureGuardianSchema();
  const now = new Date();
  const existing = await env.DB.prepare("SELECT id FROM guardian_contacts WHERE member_id = ?")
    .bind(input.memberId)
    .first<{ id: string }>();
  const contactId = existing?.id ?? crypto.randomUUID();
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const [encryptedName, encryptedPhone, encryptedEmail] = await Promise.all([
    encryptRestrictedValue(input.name),
    encryptRestrictedValue(input.phone),
    input.email ? encryptRestrictedValue(input.email) : Promise.resolve(null),
  ]);

  await env.DB.batch([
    env.DB.prepare(`INSERT INTO guardian_contacts (
      id, member_id, encrypted_name, encrypted_phone, encrypted_email,
      verification_status, verification_token_hash, verification_expires_at,
      member_consent_version, member_consent_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?)
    ON CONFLICT(member_id) DO UPDATE SET
      encrypted_name = excluded.encrypted_name,
      encrypted_phone = excluded.encrypted_phone,
      encrypted_email = excluded.encrypted_email,
      verification_status = 'pending',
      verification_token_hash = excluded.verification_token_hash,
      verification_expires_at = excluded.verification_expires_at,
      member_consent_version = excluded.member_consent_version,
      member_consent_at = excluded.member_consent_at,
      contact_consent_version = NULL,
      contact_consent_at = NULL,
      removed_at = NULL,
      updated_at = excluded.updated_at`)
      .bind(contactId, input.memberId, encryptedName, encryptedPhone, encryptedEmail, tokenHash, expiresAt, GUARDIAN_MEMBER_CONSENT_VERSION, now.toISOString(), now.toISOString(), now.toISOString()),
    env.DB.prepare(`INSERT INTO guardian_consent_events (
      id, member_id, guardian_contact_id, actor_type, consent_type,
      document_version, status, source, created_at
    ) VALUES (?, ?, ?, 'member', 'guardian_contact_listing', ?, 'accepted', 'guardian_setup', ?)`)
      .bind(crypto.randomUUID(), input.memberId, contactId, GUARDIAN_MEMBER_CONSENT_VERSION, now.toISOString()),
  ]);

  return { contactId, verificationToken: token, verificationExpiresAt: expiresAt };
}

export async function respondToGuardianVerification(token: string, status: "accepted" | "declined") {
  await ensureGuardianSchema();
  const tokenHash = await hashToken(token);
  const now = new Date().toISOString();
  const record = await env.DB.prepare(`SELECT id, member_id, verification_expires_at
    FROM guardian_contacts
    WHERE verification_token_hash = ? AND verification_status = 'pending' AND removed_at IS NULL`)
    .bind(tokenHash)
    .first<{ id: string; member_id: string; verification_expires_at: string }>();
  if (!record || record.verification_expires_at <= now) return false;

  await env.DB.batch([
    env.DB.prepare(`UPDATE guardian_contacts SET
      verification_status = ?, verification_token_hash = NULL,
      verification_expires_at = NULL, contact_consent_version = ?,
      contact_consent_at = ?, updated_at = ? WHERE id = ?`)
      .bind(status, GUARDIAN_CONTACT_CONSENT_VERSION, now, now, record.id),
    env.DB.prepare(`INSERT INTO guardian_consent_events (
      id, member_id, guardian_contact_id, actor_type, consent_type,
      document_version, status, source, created_at
    ) VALUES (?, ?, ?, 'emergency_contact', 'guardian_alert_messages', ?, ?, 'verification_link', ?)`)
      .bind(crypto.randomUUID(), record.member_id, record.id, GUARDIAN_CONTACT_CONSENT_VERSION, status, now),
  ]);
  return true;
}

export async function removeGuardianContact(memberId: string) {
  await ensureGuardianSchema();
  const now = new Date().toISOString();
  const contact = await env.DB.prepare("SELECT id FROM guardian_contacts WHERE member_id = ? AND removed_at IS NULL")
    .bind(memberId)
    .first<{ id: string }>();
  if (!contact) return;
  await env.DB.batch([
    env.DB.prepare(`UPDATE guardian_contacts SET removed_at = ?, verification_status = 'revoked',
      verification_token_hash = NULL, verification_expires_at = NULL,
      encrypted_name = '', encrypted_phone = '', encrypted_email = NULL, updated_at = ? WHERE id = ?`)
      .bind(now, now, contact.id),
    env.DB.prepare(`INSERT INTO guardian_consent_events (
      id, member_id, guardian_contact_id, actor_type, consent_type,
      document_version, status, source, created_at
    ) VALUES (?, ?, NULL, 'member', 'guardian_contact_listing', ?, 'withdrawn', 'guardian_settings', ?)`)
      .bind(crypto.randomUUID(), memberId, GUARDIAN_MEMBER_CONSENT_VERSION, now),
  ]);
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return toBase64Url(bytes);
}

async function hashToken(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(digest));
}

async function encryptionKey() {
  const configured = (env as unknown as Record<string, string | undefined>).GUARDIAN_DATA_KEY;
  if (!configured) throw new Error("Guardian restricted-data encryption is not configured.");
  const raw = fromBase64Url(configured);
  if (raw.byteLength !== 32) throw new Error("GUARDIAN_DATA_KEY must contain 32 bytes.");
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}

async function encryptRestrictedValue(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await encryptionKey(), new TextEncoder().encode(value));
  return `v1.${toBase64Url(iv)}.${toBase64Url(new Uint8Array(encrypted))}`;
}

async function decryptRestrictedValue(value: string) {
  const [version, ivValue, encryptedValue] = value.split(".");
  if (version !== "v1" || !ivValue || !encryptedValue) throw new Error("Guardian restricted data is malformed.");
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64Url(ivValue) }, await encryptionKey(), fromBase64Url(encryptedValue));
  return new TextDecoder().decode(decrypted);
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function maskPhone(phone: string) {
  const visible = phone.slice(-4);
  return `${"•".repeat(Math.max(0, phone.length - 4))}${visible}`;
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  return `${local.slice(0, 1)}${"•".repeat(Math.max(1, local.length - 1))}@${domain}`;
}
