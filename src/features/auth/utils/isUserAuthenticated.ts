'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export default async function isUserAuthenticated(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    return !!session;
}
