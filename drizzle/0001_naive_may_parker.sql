CREATE TABLE `sticker_pack_reservations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`email` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`postal_code` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sticker_pack_reservations_email_unique` ON `sticker_pack_reservations` (`email`);