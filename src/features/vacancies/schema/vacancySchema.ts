import { z } from "zod";

export const sectionItemSchema = z.string().min(1, "Item cannot be empty");

export const vacancySectionSchema = z.object({
    title: z.string().min(1, "Section title is required"),
    order: z.number().int(),
    items: z.array(sectionItemSchema),
});

export const createVacancySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    sections: z.array(vacancySectionSchema),
});

export type CreateVacancyValues = z.infer<typeof createVacancySchema>;
export type VacancySection = z.infer<typeof vacancySectionSchema>;
