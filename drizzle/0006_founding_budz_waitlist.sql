CREATE TABLE `founding_budz_waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`postal_code` text,
	`neighborhood` text,
	`goals` text NOT NULL,
	`other_details` text,
	`consented_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `founding_budz_waitlist_email_unique` ON `founding_budz_waitlist` (`email`);
