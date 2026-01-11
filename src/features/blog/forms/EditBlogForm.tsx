'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createBlogSchema, createBlogValues } from "../schema/blogSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Blog } from "@/db/schema"
import updateBlogAction from "../actions/upadteBlogAction"
import TiptapEditor from "@/components/TextEditor"
import BlobUploader from "@/features/breifs/components/BlobUploader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useGetAllBlogCategories from "@/features/blogCategory/hooks/useGetAllBlogCategories"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function EditBlogForm({ blog }: { blog: Blog }) {
    const { data: categories, isPending, isError } = useGetAllBlogCategories()
    const form = useForm<createBlogValues>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            short_description: blog.short_description,
            long_description: blog.long_description,
            title: blog.title,
            image_url: blog.image_url,
            category_id: blog.category_id
        }
    })

    async function onSubmit(values: createBlogValues) {
        const res = await updateBlogAction({ blog: values, blogId: blog.id })
        if (res.isError) {
            toast.error('Something went wrong ')
        }
        toast.success('Blog updated Successfuly')

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
                                        title
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
                                    short_description
                                </FormLabel>
                                <FormControl>
                                    <Textarea className="!bg-transparent" placeholder="short_description..." {...field} />
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
                    <div>
                        <FormField
                            control={form.control}
                            name="image_url"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>
                                        Blog Image:
                                    </FormLabel>
                                    <FormControl >
                                        <BlobUploader onValueChnage={(value) => {
                                            form.setValue('image_url', value)
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.getValues('image_url') && <Image src={form.getValues('image_url')} alt="blog image" width={200} height={200} />}
                    </div>
                    <Button className="bg-accent-foreground/80" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Updating..' : 'Update'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
