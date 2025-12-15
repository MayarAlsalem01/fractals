'use server'
import { db } from '@/db/drizzle'
import { Blog, blogs } from '@/db/schema'

export default async function getBlogsAction(): Promise<Result<Blog[] | undefined, string | undefined>> {
    const blogs = await db.query.blogs.findMany()
    if (blogs.length === 0)
        return {
            isError: false,

            data: undefined,
            ok: true
        }
    return {
        data: blogs,
        isError: false,
        ok: true
    }
}
