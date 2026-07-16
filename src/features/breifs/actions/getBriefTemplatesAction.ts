'use server'

import { db } from "@/db/drizzle";
import { brief_templates } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function getBriefTemplatesAction() {
    try {
        const templates = await db.query.brief_templates.findMany({
            orderBy: [desc(brief_templates.created_at)],
        });
        return {
            ok: true,
            data: templates,
            isError: false,
        };
    } catch (error) {
        console.error("Failed to fetch brief templates:", error);
        return {
            ok: false,
            data: [],
            isError: true,
            error: { message: "Failed to load templates from database" }
        };
    }
}
