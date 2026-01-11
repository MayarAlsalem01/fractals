'use server'

import { db } from '@/db/drizzle'
import { Blog, blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function getBlogPostById(id: number): Promise<Result<Blog | undefined, string>> {
    try {
        const blogPost = await db.query.blogs.findFirst({
            where: eq(blogs.id, id)
        })

        if (!blogPost) {
            return {
                isError: false,
                data: undefined,
                ok: true
            }
        }

        return {
            data: blogPost,
            isError: false,
            ok: true
        }
    } catch (e) {
        console.log(e)
        return {
            isError: true,
            error: {
                message: 'Failed to fetch blog post'
            },
            data: undefined,
            ok: false
        }
    }
}
