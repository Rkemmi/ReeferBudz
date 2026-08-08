ALTER TABLE `members` ADD `onboarding_completed_at` text;
--> statement-breakpoint
UPDATE `members`
SET `onboarding_completed_at` = COALESCE(`updated_at`, `created_at`)
WHERE `onboarding_completed_at` IS NULL;
