import { db } from "@/db/drizzle";
import { comparePassword } from "@/utils/hashPassword";
import z from 'zod'

const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})
type signInType = z.infer<typeof signInSchema>
export default async function SignInAction(signIn: signInType) {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, signIn.username)
    })
    if (!user)
        throw new Error('Invalid credentials')
    console.log(signIn)
    const isMatch = await comparePassword(signIn.password, user.password)
    if (!isMatch)
        throw new Error('Invalid credentials')

    return user
}