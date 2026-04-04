"use server";

import { db } from "@/db/drizzle";
import { attribution_options, attribution_responses } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export const getActiveAttributionOptions = unstable_cache(
    async () => {
        return await db.select()
            .from(attribution_options)
            .where(eq(attribution_options.is_active, true))
            .orderBy(asc(attribution_options.sort_order));
    },
    ["active-attribution-options"],
    { revalidate: 1, tags: ["attribution_options"] }
);

export async function submitAttributionResponse(optionId: number, otherText?: string) {
    await db.insert(attribution_responses).values({
        option_id: optionId,
        other_text: otherText || null,
    });

    // Set cookie to not show again for 1 year
    const cookieStore = await cookies();
    cookieStore.set("hide_attribution_survey", "true", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
    });
}

export async function dismissAttributionSurvey() {
    const cookieStore = await cookies();
    cookieStore.set("hide_attribution_survey", "true", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
    });
}
