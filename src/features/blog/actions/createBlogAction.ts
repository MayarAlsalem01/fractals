'use server'
import { createBlogSchema, createBlogValues } from '../schema/blogSchema';
import { db } from '@/db/drizzle';
import { blogs } from '@/db/schema';
import isUserAuthenticated from '@/features/auth/utils/isUserAuthenticated';


export default async function createBlogAction({ createBlogValues }: { createBlogValues: createBlogValues }) {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" } } as Result<string, string>
    const values = createBlogSchema.safeParse(createBlogValues)
    if (values.error) {
        return {
            error: {
                message: 'vaildation error'
            },
            isError: true
        } as Result<string, string>
    }
    await db.insert(blogs).values({
        short_description: createBlogValues.short_description,
        long_description: createBlogValues.long_description,
        title: createBlogValues.title,
        image_url: createBlogValues.image_url,
        category_id: createBlogValues.category_id
    })
    return {
        isError: false,
        ok: true
    } as Result<string, string>
}
