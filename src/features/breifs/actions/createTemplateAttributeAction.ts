'use server'

import { db } from "@/db/drizzle";
import { template_attributes } from "@/db/schema";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { revalidatePath } from "next/cache";
import { Result } from "@/types/result";
import { eq, sql } from "drizzle-orm";
import z from "zod";

const createAttributeSchema = z.object({
    sectionId: z.number(),
    label: z.string().min(1, "Label is required"),
    type: z.string().min(1, "Type is required"),
    required: z.boolean(),
    width: z.string().default("medium"),
    options: z.any().optional(),
    meta: z.any().optional(),
});

export default async function createTemplateAttributeAction({
    sectionId,
    label,
    type,
    required,
    width,
    options,
    meta,
    templateId, // pass templateId to easily revalidate template details page
}: {
    sectionId: number;
    label: string;
    type: string;
    required: boolean;
    width: string;
    options?: any;
    meta?: any;
    templateId: number;
}): Promise<Result<string | undefined, string>> {
    // 1. Ensure user is authenticated
    if (!await isUserAuthenticated()) {
        return {
            isError: true,
            error: { message: "Unauthorized access" },
            data: undefined,
            ok: false
        };
    }

    // 2. Validate inputs
    const validation = createAttributeSchema.safeParse({ sectionId, label, type, required, width, options, meta });
    if (!validation.success) {
        return {
            isError: true,
            error: { message: "Validation error: Check your fields." },
            data: undefined,
            ok: false
        };
    }

    try {
        // 3. Generate key from label
        const key = label
            .toLowerCase()
            .replace(/[^a-z0-9_]+/g, "_")
            .replace(/^_+|_+$/g, "");

        // 4. Query maximum position of attributes on this section
        const maxPosResult = await db
            .select({ maxPos: sql<number>`max(position)` })
            .from(template_attributes)
            .where(eq(template_attributes.section_id, sectionId));
        
        const maxPos = maxPosResult[0]?.maxPos ?? 0;
        const nextPos = maxPos + 1;

        // 5. Insert new template attribute
        await db.insert(template_attributes).values({
            section_id: sectionId,
            key: key || `attr_${Date.now()}`,
            label,
            type,
            required,
            width,
            options: options ? JSON.stringify(options) : null,
            position: nextPos,
            meta: meta || {},
        });

        // 6. Revalidate UI
        revalidatePath(`/dashboard/briefs-mangment/${templateId}`);
        revalidatePath(`/dashboard/briefs-mangment`);
        
        return {
            isError: false,
            data: "Field created successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        console.error("Failed to create attribute:", error);
        return {
            isError: true,
            error: { message: "Failed to create field in database" },
            data: undefined,
            ok: false
        };
    }
}
