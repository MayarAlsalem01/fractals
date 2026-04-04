import z from "zod";

export const vacancyApplicationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    position: z.string().min(1, "Position is required"),
    cv: z.url("Invalid URL"),
    message: z.string().optional(),
})

export type VacancyApplicationSchemaType = z.infer<typeof vacancyApplicationSchema>