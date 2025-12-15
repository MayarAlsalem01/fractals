CREATE TABLE "brief_attribute_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"brief_id" integer NOT NULL,
	"attribute_id" integer NOT NULL,
	"value" json DEFAULT 'null',
	"value_text" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brief_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text DEFAULT '',
	"version" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "briefs" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" timestamp,
	"template_id" integer NOT NULL,
	"title" varchar(300) DEFAULT '',
	"status" varchar(50) DEFAULT 'draft',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "template_attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"key" varchar(200) NOT NULL,
	"label" varchar(300) NOT NULL,
	"type" varchar(30) NOT NULL,
	"options" json DEFAULT 'null',
	"required" boolean DEFAULT false,
	"position" integer DEFAULT 0 NOT NULL,
	"meta" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "template_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer NOT NULL,
	"key" varchar(150) NOT NULL,
	"title" varchar(200) NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brief_attribute_values" ADD CONSTRAINT "brief_attribute_values_brief_id_briefs_id_fk" FOREIGN KEY ("brief_id") REFERENCES "public"."briefs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brief_attribute_values" ADD CONSTRAINT "brief_attribute_values_attribute_id_template_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."template_attributes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_template_id_brief_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."brief_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_attributes" ADD CONSTRAINT "template_attributes_section_id_template_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."template_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_sections" ADD CONSTRAINT "template_sections_template_id_brief_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."brief_templates"("id") ON DELETE no action ON UPDATE no action;