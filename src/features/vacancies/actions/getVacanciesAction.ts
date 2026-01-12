'use server'
import { db } from '@/db/drizzle';
import { vacancies, Vacancy } from '@/db/schema';
import { desc } from 'drizzle-orm';
import isUserAuthenticated from '@/features/auth/utils/isUserAuthenticated';
import { Result } from '@/types/result';

export default async function getVacanciesAction() {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" } } as Result<Vacancy[], string>

    try {
        const data = await db.select().from(vacancies).orderBy(desc(vacancies.created_at));
        return {
            isError: false,
            data
        } as Result<Vacancy[], string>
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to fetch vacancies'
            }
        } as Result<Vacancy[], string>
    }
}
