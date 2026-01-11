'use server'
import { db } from "@/db/drizzle";
import { blog_categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import isUserAuthenticated from "@/features/auth/utils/isUserAuthenticated";
import { revalidatePath } from "next/cache";

export default async function deleteCategoryAction(categoryId: number): Promise<Result<string | undefined, string>> {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" }, data: undefined, ok: false }

    try {
        await db.delete(blog_categories).where(eq(blog_categories.id, categoryId));
        revalidatePath('/dashboard/categories');
        return {
            isError: false,
            data: "Category deleted successfully",
            error: undefined,
            ok: true
        };
    } catch (error) {
        return {
            isError: true,
            error: { message: "Failed to delete category" },
            data: undefined,
            ok: false
        };
    }
}
