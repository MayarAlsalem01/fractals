'use server'
import { db } from '@/db/drizzle';
import { vacancies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import isUserAuthenticated from '@/features/auth/utils/isUserAuthenticated';
import { revalidatePath } from 'next/cache';
import { Result } from '@/types/result';

export default async function deleteVacancyAction(id: number) {
    if (!await isUserAuthenticated()) return { isError: true, error: { message: "Unauthorized" } } as Result<string, string>

    try {
        await db.delete(vacancies).where(eq(vacancies.id, id));
        revalidatePath('/dashboard/vacancies')
        return {
            isError: false,
            ok: true
        } as Result<string, string>
    } catch (e) {
        return {
            isError: true,
            error: {
                message: 'Failed to delete vacancy'
            }
        } as Result<string, string>
    }
}
