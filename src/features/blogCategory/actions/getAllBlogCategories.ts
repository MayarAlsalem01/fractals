'use server'
import { db } from "@/db/drizzle";
import { Category } from "@/db/schema";

export default async function getAllBlogCategories(): Promise<Result<Category[] | undefined, string>> {
    try {
        const data = await db.query.blog_categories.findMany()
        if (!data) {
            return { isError: false, data: undefined, error: { message: 'No data found' }, ok: true }
        }
        return { isError: false, data: data, error: { message: '' }, ok: true }
    } catch (error) {
        return { isError: true, data: undefined, error: { message: 'Something went wrong' }, ok: false }
    }
}