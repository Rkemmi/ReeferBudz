CREATE INDEX `idx_guardian_consent_events_member_created` ON `guardian_consent_events` (`member_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_guardian_contacts_status` ON `guardian_contacts` (`verification_status`);--> statement-breakpoint
CREATE INDEX `idx_guardian_contacts_token_hash` ON `guardian_contacts` (`verification_token_hash`);