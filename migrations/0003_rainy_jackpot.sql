ALTER TABLE "blogs" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "text";