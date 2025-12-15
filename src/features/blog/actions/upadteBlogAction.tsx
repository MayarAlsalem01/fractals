'use server'
import { db } from '@/db/drizzle'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { updateBlogValues } from '../schema/blogSchema'

export default async function updateBlogAction({ blog, blogId }: { blog: updateBlogValues, blogId: number }): Promise<Result<string | undefined, string | undefined>> {
    const blogq = await db.query.blogs.findMany({
        where: (blogs, { eq }) => eq(blogs.id, blogId)
    })
    if (blogq.length === 0)
        return {
            isError: true,
            error: {
                message: `blog with id: ${blogId} not found`
            },
            data: undefined,
            ok: false
        }
    await db.update(blogs).set({
        description: blog.descrption,
        title: blog.title,
    }).where(eq(blogs.id, blogId))
    revalidatePath('dashboard/blogs')
    return {
        ok: true,
        data: 'updating successed',
        isError: false,
    }
}
