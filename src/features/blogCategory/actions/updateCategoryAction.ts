'use server'
import { db } from "@/db/drizzle";
import { blog_categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { updateCategorySchema, updateCategoryValues } from "../schema/categorySchema";
import { revalidatePath } from "next/cache";

export default async function updateCategoryAction({ categoryValues, categoryId }: { categoryValues: updateCategoryValues, categoryId: number }): Promise<Result<string | undefined, string>> {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" }, data: undefined, ok: false }

    const validation = updateCategorySchema.safeParse(categoryValues);
    if (!validation.success) {
        return {
            isError: true,
            error: { message: "Validation error" },
            data: undefined,
            ok: false
        };
    }

    try {
        await db.update(blog_categories)
            .set(categoryValues)
            .where(eq(blog_categories.id, categoryId));
        revalidatePath('/dashboard/categories');
        return {
            isError: false,
            data: "Category updated successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        return {
            isError: true,
            error: { message: "Failed to update category" },
            data: undefined,
            ok: false
        };
    }
}
