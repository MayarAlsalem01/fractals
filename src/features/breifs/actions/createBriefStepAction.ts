'use server'

import { db } from "@/db/drizzle";
import { template_sections } from "@/db/schema";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { revalidatePath } from "next/cache";
import { Result } from "@/types/result";
import { eq, sql } from "drizzle-orm";
import z from "zod";

const createBriefStepSchema = z.object({
    templateId: z.number(),
    title: z.string().min(1, "Step title is required"),
});

export default async function createBriefStepAction({
    templateId,
    title,
}: {
    templateId: number;
    title: string;
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
    const validation = createBriefStepSchema.safeParse({ templateId, title });
    if (!validation.success) {
        return {
            isError: true,
            error: { message: "Validation error: Title cannot be empty." },
            data: undefined,
            ok: false
        };
    }

    try {
        // 3. Generate key from title (lowercase, replace spaces with underscores, alphanumeric only)
        const key = title
            .toLowerCase()
            .replace(/[^a-z0-9_]+/g, "_")
            .replace(/^_+|_+$/g, "");

        // 4. Query maximum position of sections on this template
        const maxPosResult = await db
            .select({ maxPos: sql<number>`max(position)` })
            .from(template_sections)
            .where(eq(template_sections.template_id, templateId));
        
        const maxPos = maxPosResult[0]?.maxPos ?? 0;
        const nextPos = maxPos + 1;

        // 5. Insert new template section
        await db.insert(template_sections).values({
            template_id: templateId,
            key: key || `step_${Date.now()}`,
            title,
            position: nextPos,
        });

        // 6. Revalidate the route to update UI immediately
        revalidatePath(`/dashboard/briefs-mangment/${templateId}`);
        revalidatePath(`/dashboard/briefs-mangment`);
        
        return {
            isError: false,
            data: "Step created successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        console.error("Failed to create template step:", error);
        return {
            isError: true,
            error: { message: "Failed to create step in database" },
            data: undefined,
            ok: false
        };
    }
}
