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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useGetAllBlogCategories from "@/features/blogCategory/hooks/useGetAllBlogCategories"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function CreateBlogForm() {
    const { data: categories, isPending, isError } = useGetAllBlogCategories()
    const form = useForm<createBlogValues>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            short_description: '',
            long_description: '',
            title: '',
            image_url: '',
            category_id: 1
        }
    })
    async function onSubmit(values: createBlogValues) {
        const res = await createBlogAction({ createBlogValues: values })
        if (res.isError) {
            toast.error('Something went wrong ')
        }
        toast.success('Blog Created Successfuly')
        console.log(values)

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
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
                        <FormField control={form.control} name="category_id" render={({ field }) => (
                            <FormItem >
                                <FormLabel>
                                    Category:
                                </FormLabel>
                                {isPending ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : isError ? (
                                    <p className="text-red-500">Something went wrong</p>
                                ) : (
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(Number(value))
                                        }}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.data?.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
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
                                <div>
                                    <FormControl >
                                        <BlobUploader onValueChnage={(value) => {
                                            form.setValue('image_url', value)
                                        }} />
                                    </FormControl>
                                    {form.watch('image_url') && (
                                        <div className="mt-1">
                                            <Image
                                                src={form.watch('image_url')}
                                                alt="blog"
                                                width={200}
                                                height={200}
                                                className="rounded-lg object-cover border"
                                            />
                                        </div>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-accent-foreground/80 w-fit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Creating' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
