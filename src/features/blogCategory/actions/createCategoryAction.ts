'use server'
import { db } from "@/db/drizzle";
import { blog_categories } from "@/db/schema";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { createCategorySchema, createCategoryValues } from "../schema/categorySchema";
import { revalidatePath } from "next/cache";

export default async function createCategoryAction({ categoryValues }: { categoryValues: createCategoryValues }): Promise<Result<string | undefined, string>> {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" }, data: undefined, ok: false }

    const validation = createCategorySchema.safeParse(categoryValues);
    if (!validation.success) {
        return {
            isError: true,
            error: { message: "Validation error" },
            data: undefined,
            ok: false
        };
    }

    try {
        await db.insert(blog_categories).values(categoryValues);
        revalidatePath('/dashboard/categories');
        return {
            isError: false,
            data: "Category created successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        return {
            isError: true,
            error: { message: "Failed to create category" },
            data: undefined,
            ok: false
        };
    }
}
