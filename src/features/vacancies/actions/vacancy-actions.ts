"use server";

import { db } from "@/db/drizzle";
import { vacancy_applications } from "@/db/schema";
import { vacancyApplicationSchema, VacancyApplicationSchemaType } from "../schema/VacancyApplicationSchema";

export async function submitVacancyApplication(values: VacancyApplicationSchemaType) {
    try {
        const validatedFields = vacancyApplicationSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        await db.insert(vacancy_applications).values({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            position: validatedFields.data.position,
            cv: validatedFields.data.cv,
            message: validatedFields.data.message ?? null,
        });

        return { success: "Application submitted successfully!" };
    } catch (error) {
        console.error("Error submitting vacancy application:", error);
        return { error: "Something went wrong. Please try again later." };
    }
}
