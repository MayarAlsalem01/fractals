'use server'

import { db } from '@/db/drizzle'
import { brief_feedback } from '@/db/schema'
import { cookies } from 'next/headers'
import { Result } from '@/types/result'

export default async function submitBriefFeedbackAction(rating: string, comment?: string): Promise<Result<undefined, string>> {
    const cookieStore = await cookies();
    const briefId = cookieStore.get('pending_feedback_id')?.value;

    if (!briefId) {
        return {
            ok: false,
            data: undefined,
            error: {
                message: 'No pending feedback found or session expired.'
            }
        };
    }

    try {
        await db.insert(brief_feedback).values({
            brief_id: parseInt(briefId),
            rating,
            comment: comment || null,
        });

        // Clear the cookie after successful submission
        cookieStore.delete('pending_feedback_id');

        return {
            ok: true,
            data: undefined
        };
    } catch (e) {
        console.error('Feedback Error:', e);
        return {
            ok: false,
            data: undefined,
            error: {
                message: 'Failed to submit feedback.'
            }
        };
    }
}
