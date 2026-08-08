CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`birth_date` text NOT NULL,
	`adult_attested_at` text NOT NULL,
	`email_confirmed_at` text NOT NULL,
	`email_confirmation_source` text NOT NULL,
	`guidelines_version` text NOT NULL,
	`guidelines_accepted_at` text NOT NULL,
	`bio` text NOT NULL,
	`interests` text NOT NULL,
	`friendship_goals` text NOT NULL,
	`city` text,
	`region` text,
	`location_visibility` text DEFAULT 'region_only' NOT NULL,
	`discoverable` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_unique` ON `members` (`email`);