'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
// --- Zod Schema Definition ---
const signInSchema = z.object({
    username: z.string().min(1, { message: "Username or Email is required" }),
    password: z.string().min(5, { message: "Password must be at least 6 characters" }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
export default function SignInForm() {
    const search = useSearchParams()

    // --- Form Initialization ---
    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = form;

    // --- Submit Handler ---
    const onSubmit = async (values: SignInFormValues) => {
        // In a real application, you might want to set a loading state here

        const res = await signIn("credentials", {
            redirect: true,
            username: values.username,
            password: values.password,
            callbackUrl: search.get('callbackUrl') || '/'
        });

        if (res?.error) {
            // Handle sign-in error (e.g., show a toast or set a form error)
            console.error("Sign-in failed:", res.error);
            form.setError("username", { type: "manual", message: "Invalid credentials" });
            form.setError("password", { type: "manual", message: "Invalid credentials" });
        } else if (res?.ok) {
            // Handle successful sign-in (e.g., redirect to dashboard)
            console.log("Sign-in successful!");
            // router.push("/dashboard"); // Example redirect
        }
    };
    return (
        <Card
            className="w-full max-w-md  text-white shadow-2xl "

        >
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold ">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Enter your credentials to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* 4. Use handleSubmit from react-hook-form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username or Email</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="john.doe@example.com"
                            // 5. Register the input
                            {...register("username")}
                            className={`bg-gray-800 border-gray-700 text-white focus:border-[#9B3E83] ${errors.username ? 'border-red-500' : ''}`}
                        />
                        {/* 6. Display validation error */}
                        {errors.username && (
                            <p className="text-sm text-red-500">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            // 5. Register the input
                            {...register("password")}
                            className={`bg-gray-800 border-gray-700 text-white focus:border-[#9B3E83] ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {/* 6. Display validation error */}
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#9B3E83] hover:bg-[#9B3E83]/90 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                        style={{
                            backgroundColor: "#9B3E83",
                        }}
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <a href="/auth/sign_up" className="text-[#68BBE8] hover:text-[#68BBE8]/80 transition-colors duration-200">
                        Sign Up
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}
