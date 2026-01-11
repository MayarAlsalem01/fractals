'use server'
import { Blog, blogs, Category, blog_categories } from "@/db/schema"
import { db } from "@/db/drizzle"
import { count, eq, desc } from "drizzle-orm"

export type Blogs = Blog & {
    category: Category
}

// blogs pagination
export default async function getBlogsPagintion({ page = 1, limit = 10, filter }: { page?: number, limit?: number, filter?: { categoryId?: number } }): Promise<{ blogs: Blogs[], total: number }> {
    const whereCondition = filter?.categoryId ? eq(blogs.category_id, filter.categoryId) : undefined;

    const [blogsData, totalData] = await Promise.all([
        db.select()
            .from(blogs)
            .leftJoin(blog_categories, eq(blogs.category_id, blog_categories.id))
            .where(whereCondition)
            .limit(limit)
            .offset((page - 1) * limit)
            .orderBy(desc(blogs.created_at)),
        db.select({ count: count() }).from(blogs).where(whereCondition)
    ]);

    const formattedBlogs = blogsData.map(row => ({
        ...row.blogs,
        category: row.blog_categories!
    }))

    return { blogs: formattedBlogs as Blogs[], total: totalData[0]?.count ?? 0 }
}
