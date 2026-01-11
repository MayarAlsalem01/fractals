import { relations, sql } from "drizzle-orm";
import { boolean, integer, json, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    short_description: text("short_description").notNull(),
    long_description: text("long_description").notNull(),
    image_url: text("image_url").notNull(),
    title: text("title").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    category_id: integer("category_id").references(() => blog_categories.id).notNull(),

});
// blog categories
export const blog_categories = pgTable("blog_categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    normalizedName: text("normalizedName").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// blog && categories relations
export const blog_categories_relations = relations(blog_categories, ({ many }) => ({
    blogs: many(blogs),
}));
//categories relations
export const categories_relations = relations(blogs, ({ one }) => ({
    category: one(blog_categories, {
        fields: [blogs.category_id],
        references: [blog_categories.id],
    }),
}));
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),

});







export const brief_templates = pgTable("brief_templates", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),           // e.g. "Desktop Brief", "Mobile Brief"
    description: text("description").default(""),
    version: integer("version").default(1).notNull(),
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const template_sections = pgTable("template_sections", {
    id: serial("id").primaryKey(),
    template_id: integer("template_id").references(() => brief_templates.id).notNull(),
    key: varchar("key", { length: 150 }).notNull(),            // e.g. "company_overview"
    title: varchar("title", { length: 200 }).notNull(),        // displayed heading
    position: integer("position").default(0).notNull(),       // ordering inside template
});

export const template_attributes = pgTable("template_attributes", {
    id: serial("id").primaryKey(),
    section_id: integer("section_id").references(() => template_sections.id).notNull(),
    key: varchar("key", { length: 200 }).notNull(),           // machine key e.g. "company_overview_text"
    label: varchar("label", { length: 300 }).notNull(),       // user visible label
    type: varchar("type", { length: 30 }).notNull(),          // text, textarea, select, multiselect, boolean, date, number, file, json
    // JSON column for select options, validation rules, placeholder, etc.
    options: json("options").default("null"),                 // e.g. [{"value":"windows","label":"Windows"}]
    required: boolean("required").default(false),
    position: integer("position").default(0).notNull(),      // order inside section
    meta: jsonb("meta").default(sql`'{}'::jsonb`),              // free-form (min/max, regex, hint text, locales, conditional rules)
    width: text('width').default('medium')
});

//
// Runtime stored brief referencing a template
// (extend your existing briefs table — I add template_id + title/slug)
export const briefs = pgTable("briefs", {
    id: serial("id").primaryKey(),
    client_id: timestamp(),
    template_id: integer("template_id").references(() => brief_templates.id).notNull(),
    title: varchar("title", { length: 300 }).default(""),    // friendly name
    status: varchar("status", { length: 50 }).default("draft"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

//
// Key/value table: store attribute values per brief
export const brief_attribute_values = pgTable("brief_attribute_values", {
    id: serial("id").primaryKey(),
    brief_id: integer("brief_id").references(() => briefs.id).notNull(),
    attribute_id: integer("attribute_id").references(() => template_attributes.id).notNull(),
    // store value as jsonb to support all attribute types uniformly
    value: json("value").default("null"),
    // we also persist a human-readable value for quick searching/filtering (optional)
    value_text: text("value_text").default(''),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

//
// Attachments (files) — reuse or extend your existing attachments table
// export const brief_attachments = pgTable("brief_attachments", {
//   id: serial("id").primaryKey(),
//   brief_id: integer("brief_id").references(() => briefs.id).notNull(),
//   attribute_id: integer("attribute_id").references(() => template_attributes.id).default(null),
//   filename: varchar("filename", { length: 500 }).notNull(),
//   url: varchar("url", { length: 2000 }).notNull(),
//   mime_type: varchar("mime_type", { length: 200 }).default(""),
//   metadata: json("metadata").default("'{}'::jsonb"),
//   uploaded_at: timestamp("uploaded_at").defaultNow().notNull(),
// });
export const briefsRelations = relations(briefs, ({ many, one }) => ({
    attributeValues: many(brief_attribute_values),
    briefTemplate: one(brief_templates, {
        fields: [briefs.template_id],
        references: [brief_templates.id],
    }),
}));

export const briefAttributeValuesRelations = relations(
    brief_attribute_values,
    ({ one }) => ({
        brief: one(briefs, {
            fields: [brief_attribute_values.brief_id],
            references: [briefs.id],
        }),

        attribute: one(template_attributes, {
            fields: [brief_attribute_values.attribute_id],
            references: [template_attributes.id],
        }),
    })
);

export const templateAttributesRelations = relations(
    template_attributes,
    ({ one }) => ({
        section: one(template_sections, {
            fields: [template_attributes.section_id],
            references: [template_sections.id],
        }),
    })
);
export type Blog = typeof blogs.$inferSelect
export type Attribute = typeof template_attributes.$inferSelect
export type Section = typeof template_sections.$inferSelect
export type BriefAttributeInsertValues = typeof brief_attribute_values.$inferInsert
export type Category = typeof blog_categories.$inferSelect


