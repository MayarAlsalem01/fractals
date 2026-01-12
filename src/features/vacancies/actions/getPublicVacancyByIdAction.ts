'use server'
import { db } from '@/db/drizzle';
import { vacancies, Vacancy } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Result } from '@/types/result';

export default async function getPublicVacancyByIdAction(id: number): Promise<Result<Vacancy, string>> {
    try {
        const [data] = await db.select().from(vacancies).where(eq(vacancies.id, id));
        if (!data) return { isError: true, error: { message: "Vacancy not found" } } as Result<Vacancy, string>

        return {
            isError: false,
            data
        } as Result<Vacancy, string>
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to fetch vacancy'
            }
        } as Result<Vacancy, string>
    }
}
