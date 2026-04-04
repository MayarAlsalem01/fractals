CREATE TABLE "attribution_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attribution_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"option_id" integer NOT NULL,
	"other_text" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attribution_responses" ADD CONSTRAINT "attribution_responses_option_id_attribution_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."attribution_options"("id") ON DELETE no action ON UPDATE no action;