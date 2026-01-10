ALTER TABLE "blogs" RENAME COLUMN "description" TO "short_description";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "long_description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "image_url" text NOT NULL;