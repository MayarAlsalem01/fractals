'use server'

import { db } from "@/db/drizzle";
import { brief_templates } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getBriefTemplateByIdAction(id: number) {
    try {
        const template = await db.query.brief_templates.findFirst({
            where: eq(brief_templates.id, id),
        });
        return {
            ok: true,
            data: template,
            isError: false,
        };
    } catch (error) {
        console.error(`Failed to fetch brief template with ID ${id}:`, error);
        return {
            ok: false,
            data: undefined,
            isError: true,
            error: { message: "Failed to load template from database" }
        };
    }
}
