'use server'
import { createVacancySchema, CreateVacancyValues } from '../schema/vacancySchema';
import { db } from '@/db/drizzle';
import { vacancies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import isUserAuthenticated from '@/features/auth/utils/isUserAuthenticated';
import { revalidatePath } from 'next/cache';
import { Result } from '@/types/result';

export default async function updateVacancyAction(id: number, values: CreateVacancyValues) {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" } } as Result<string, string>

    const parsed = createVacancySchema.safeParse(values)
    if (!parsed.success) {
        return {
            error: {
                message: 'Validation error'
            },
            isError: true
        } as Result<string, string>
    }

    try {
        await db.update(vacancies).set({
            title: parsed.data.title,
            description: parsed.data.description,
            sections: parsed.data.sections,
            updated_at: new Date()
        }).where(eq(vacancies.id, id))

        revalidatePath('/dashboard/vacancies')
        return {
            isError: false,
            ok: true
        } as Result<string, string>
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to update vacancy'
            }
        } as Result<string, string>
    }
}
