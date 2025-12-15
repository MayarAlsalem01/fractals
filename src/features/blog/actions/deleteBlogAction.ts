'use server'
import { db } from '@/db/drizzle'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function deleteBlogAction(blogId: number): Promise<Result<string | undefined, string | undefined>> {
    const blog = await db.query.blogs.findMany({
        where: (blogs, { eq }) => eq(blogs.id, blogId)
    })
    if (blog.length === 0)
        return {
            isError: true,
            error: {
                message: `blog with id: ${blogId} not found`
            },
            data: undefined,
            ok: false
        }
    await db.delete(blogs).where(eq(blogs.id, blogId))
    revalidatePath('dashboard/blogs')
    return {
        ok: true,
        data: 'deleted success',
        isError: false,
    }
}
