
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

export default function EditBlogForm({ blog }: { blog: Blog }) {
    const form = useForm<createBlogValues>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            short_description: blog.short_description,
            long_description: blog.long_description,
            title: blog.title
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
                    <Button className="bg-accent-foreground/80" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Updating..' : 'Update'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
