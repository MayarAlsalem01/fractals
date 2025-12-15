import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import SignInForm from "@/features/auth/forms/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function SignInPage() {

    const session = await getServerSession(authOptions)
    if (session)
        redirect('/')
    return (
        // Full screen container with black background
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            <SignInForm />
        </div>
    );
}
