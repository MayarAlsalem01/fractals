'use server'

import { db } from "@/db/drizzle";
import { template_attributes } from "@/db/schema";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { revalidatePath } from "next/cache";
import { Result } from "@/types/result";
import { eq } from "drizzle-orm";
import z from "zod";

const updateAttributeSchema = z.object({
    id: z.number(),
    label: z.string().min(1, "Label is required"),
    type: z.string().min(1, "Type is required"),
    required: z.boolean(),
    width: z.string().default("medium"),
    position: z.number().int().nonnegative("Position must be a non-negative integer"),
    options: z.any().optional(),
});

export default async function updateTemplateAttributeAction({
    id,
    label,
    type,
    required,
    width,
    position,
    options,
    templateId,
}: {
    id: number;
    label: string;
    type: string;
    required: boolean;
    width: string;
    position: number;
    options?: any;
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
    const validation = updateAttributeSchema.safeParse({ id, label, type, required, width, position, options });
    if (!validation.success) {
        return {
            isError: true,
            error: { message: "Validation error: Check your inputs and try again." },
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

        // 4. Update template attribute in database
        await db.update(template_attributes)
            .set({
                key: key || `attr_${Date.now()}`,
                label,
                type,
                required,
                width,
                position,
                options: options ? JSON.stringify(options) : null,
            })
            .where(eq(template_attributes.id, id));

        // 5. Revalidate paths to update UI
        revalidatePath(`/dashboard/briefs-mangment/${templateId}`);
        revalidatePath(`/dashboard/briefs-mangment`);
        
        return {
            isError: false,
            data: "Field updated successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        console.error("Failed to update attribute:", error);
        return {
            isError: true,
            error: { message: "Failed to update field in database" },
            data: undefined,
            ok: false
        };
    }
}
