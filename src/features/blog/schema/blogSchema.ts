import z from "zod";

export const createBlogSchema = z.object({
    title: z.string().min(4),
    short_description: z.string().min(4),
    long_description: z.string().min(4),
    image_url: z.string().min(4),
    category_id: z.number().min(1),

})
export const updateBlogSchema = z.object({
    title: z.string().min(4),
    short_description: z.string().min(4),
    long_description: z.string().min(4),
    image_url: z.string().min(4),
    category_id: z.number().min(1),
})




export type createBlogValues = z.infer<typeof createBlogSchema>
export type updateBlogValues = z.infer<typeof updateBlogSchema>