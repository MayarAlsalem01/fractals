CREATE TABLE "vacancy_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"position" text NOT NULL,
	"cv" text NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
