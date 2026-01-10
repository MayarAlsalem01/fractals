'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createBlogSchema, createBlogValues } from "../schema/blogSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import createBlogAction from "../actions/createBlogAction"
import { toast } from "sonner"
import TiptapEditor from "@/components/TextEditor"
import BlobUploader from "@/features/breifs/components/BlobUploader"

export default function CreateBlogForm() {
    const form = useForm<createBlogValues>({
        resolver: zodResolver(createBlogSchema)
    })

    async function onSubmit(values: createBlogValues) {
        // const res = await createBlogAction({ createBlogValues: values })
        // if (res.isError) {
        //     toast.error('Something went wrong ')
        // }
        // toast.success('Blog Created Successfuly')
        console.log(values)

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    title:
                                </FormLabel>
                                <FormControl>
                                    <Input className="!bg-transparent" placeholder="title..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="short_description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    short description:
                                </FormLabel>
                                <FormControl>
                                    <Textarea className="!bg-transparent" placeholder="short description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="long_description"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>
                                    long description:
                                </FormLabel>
                                <FormControl >
                                    <div className="border rounded p-4 ">
                                        <TiptapEditor  {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="long_description"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>
                                    Blog Image:
                                </FormLabel>
                                <FormControl >
                                    <BlobUploader />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-accent-foreground/80" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Creating' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
