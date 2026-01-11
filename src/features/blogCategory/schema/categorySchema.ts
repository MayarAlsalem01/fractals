import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2),
    normalizedName: z.string().min(2),
});

export const updateCategorySchema = z.object({
    name: z.string().min(2),
    normalizedName: z.string().min(2),
});

export type createCategoryValues = z.infer<typeof createCategorySchema>;
export type updateCategoryValues = z.infer<typeof updateCategorySchema>;
