import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { hashPassword } from "@/utils/hashPassword";

import { z } from 'zod'
const createUserSchema = z.object({
    usename: z.string().min(3),
    password: z.string().min(5)
})
type createUserType = z.infer<typeof createUserSchema>
export default async function CreateUserAction(user: createUserType) {
    const existUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, user.usename),
    });
    if (existUser)
        throw new Error('username is already exist')
    const password = await hashPassword(user.password)
    await db.insert(users).values({
        password,
        username: user.usename
    })
}