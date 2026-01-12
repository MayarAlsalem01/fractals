'use server'
import { db } from '@/db/drizzle';
import { vacancies, Vacancy } from '@/db/schema';
import { PaginationResult } from '@/types/result';
import { desc, count } from 'drizzle-orm';
import { Result } from '@/types/result';

export default async function getVacanciesPaginationAction(page: number = 1, limit: number = 6): Promise<Result<PaginationResult<Vacancy[]>, string>> {
    try {
        const offset = (page - 1) * limit;

        const [totalResult] = await db.select({ count: count() }).from(vacancies);
        const total = totalResult.count;
        const totalPages = Math.ceil(total / limit);

        const data = await db.select()
            .from(vacancies)
            .orderBy(desc(vacancies.created_at))
            .limit(limit)
            .offset(offset);

        return {
            isError: false,
            data: {
                data,
                pagination: {
                    total,
                    pages: totalPages,
                    current: page
                }
            }
        };
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to fetch vacancies'
            },
            data: undefined
        };
    }
}
