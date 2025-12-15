'use server'
import { createBlogSchema, createBlogValues } from '../schema/blogSchema';
import { db } from '@/db/drizzle';
import { blogs } from '@/db/schema';

export default async function createBlogAction({ createBlogValues }: { createBlogValues: createBlogValues }) {

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
        description: createBlogValues.descrption,
        title: createBlogValues.title
    })
    return {
        isError: false,
        ok: true
    } as Result<string, string>
}
