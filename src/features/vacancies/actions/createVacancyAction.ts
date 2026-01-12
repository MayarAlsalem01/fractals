'use server'
import { createVacancySchema, CreateVacancyValues } from '../schema/vacancySchema';
import { db } from '@/db/drizzle';
import { vacancies } from '@/db/schema';
import isUserAuthenticated from '@/features/auth/utils/isUserAuthenticated';
import { Result } from '@/types/result';
import { revalidatePath } from 'next/cache';

export default async function createVacancyAction(values: CreateVacancyValues) {
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
        await db.insert(vacancies).values({
            title: parsed.data.title,
            description: parsed.data.description,
            sections: parsed.data.sections,
        })
        revalidatePath('/dashboard/vacancies')
        return {
            isError: false,
            ok: true
        } as Result<string, string>
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to create vacancy'
            }
        } as Result<string, string>
    }
}
