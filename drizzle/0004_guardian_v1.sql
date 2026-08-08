CREATE TABLE `guardian_consent_events` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`guardian_contact_id` text,
	`actor_type` text NOT NULL,
	`consent_type` text NOT NULL,
	`document_version` text NOT NULL,
	`status` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guardian_contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`encrypted_name` text NOT NULL,
	`encrypted_phone` text NOT NULL,
	`encrypted_email` text,
	`verification_status` text DEFAULT 'pending' NOT NULL,
	`verification_token_hash` text,
	`verification_expires_at` text,
	`member_consent_version` text NOT NULL,
	`member_consent_at` text NOT NULL,
	`contact_consent_version` text,
	`contact_consent_at` text,
	`removed_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guardian_contacts_member_id_unique` ON `guardian_contacts` (`member_id`);
