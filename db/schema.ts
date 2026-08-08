import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const earlyAccessSignups = sqliteTable("early_access_signups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  location: text("location"),
  interests: text("interests"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const stickerPackReservations = sqliteTable("sticker_pack_reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  quantity: integer("quantity").notNull().default(1),
  postalCode: text("postal_code"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const members = sqliteTable("members", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  birthDate: text("birth_date").notNull(),
  adultAttestedAt: text("adult_attested_at").notNull(),
  emailConfirmedAt: text("email_confirmed_at").notNull(),
  emailConfirmationSource: text("email_confirmation_source").notNull(),
  guidelinesVersion: text("guidelines_version").notNull(),
  guidelinesAcceptedAt: text("guidelines_accepted_at").notNull(),
  onboardingCompletedAt: text("onboarding_completed_at").notNull(),
  bio: text("bio").notNull(),
  interests: text("interests").notNull(),
  friendshipGoals: text("friendship_goals").notNull(),
  city: text("city"),
  region: text("region"),
  locationVisibility: text("location_visibility").notNull().default("region_only"),
  discoverable: integer("discoverable").notNull().default(1),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const guardianContacts = sqliteTable("guardian_contacts", {
  id: text("id").primaryKey(),
  memberId: text("member_id").notNull().unique(),
  encryptedName: text("encrypted_name").notNull(),
  encryptedPhone: text("encrypted_phone").notNull(),
  encryptedEmail: text("encrypted_email"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  verificationTokenHash: text("verification_token_hash"),
  verificationExpiresAt: text("verification_expires_at"),
  memberConsentVersion: text("member_consent_version").notNull(),
  memberConsentAt: text("member_consent_at").notNull(),
  contactConsentVersion: text("contact_consent_version"),
  contactConsentAt: text("contact_consent_at"),
  removedAt: text("removed_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_guardian_contacts_status").on(table.verificationStatus), index("idx_guardian_contacts_token_hash").on(table.verificationTokenHash)]);

export const guardianConsentEvents = sqliteTable("guardian_consent_events", {
  id: text("id").primaryKey(),
  memberId: text("member_id").notNull(),
  guardianContactId: text("guardian_contact_id"),
  actorType: text("actor_type").notNull(),
  consentType: text("consent_type").notNull(),
  documentVersion: text("document_version").notNull(),
  status: text("status").notNull(),
  source: text("source").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_guardian_consent_events_member_created").on(table.memberId, table.createdAt)]);
