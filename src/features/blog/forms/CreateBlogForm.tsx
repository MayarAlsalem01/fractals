
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createBlogSchema, createBlogValues } from "../schema/blogSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import createBlogAction from "../actions/createBlogAction"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function CreateBlogForm() {
    const form = useForm<createBlogValues>({
        resolver: zodResolver(createBlogSchema)
    })

    async function onSubmit(values: createBlogValues) {
        const res = await createBlogAction({ createBlogValues: values })
        if (res.isError) {
            toast.error('Something went wrong ')
        }
        toast.success('Blog Created Successfuly')

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
                        name="descrption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    descrption
                                </FormLabel>
                                <FormControl>
                                    <Textarea className="!bg-transparent" placeholder="descrption..." {...field} />
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
