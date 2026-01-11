'use server'
import getBlogPostById from "@/features/blog/actions/getBlogPostById";
import EditBlogForm from "@/features/blog/forms/EditBlogForm";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blog = await getBlogPostById(Number(id))
    console.log(blog)
    if (!blog.data)
        return notFound()
    if (blog.isError)
        return <div>{blog.error?.message}</div>
    return (
        <div>
            <p className='text-3xl font-semibold'>Create New Blog :</p>

            <EditBlogForm blog={blog.data} />
        </div>
    )
}
