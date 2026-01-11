ALTER TABLE "blogs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;