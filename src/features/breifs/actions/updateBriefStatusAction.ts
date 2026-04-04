"use server";

import { db } from "@/db/drizzle";
import { briefs as briefsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/app/api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";

/**
 * Updates the status of a brief.
 * Only accessible by authenticated users.
 */
export async function updateBriefStatus(id: number, status: string) {
    const session = await getSession();

    if (!session) {
        throw new Error("Unauthorized");
    }

    try {
        await db.update(briefsTable)
            .set({ status })
            .where(eq(briefsTable.id, id));

        revalidatePath("/dashboard/briefs");
        return { success: true };
    } catch (error) {
        console.error("Failed to update brief status:", error);
        return { success: false, error: "Failed to update status." };
    }
}
