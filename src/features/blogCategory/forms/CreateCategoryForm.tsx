'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createCategorySchema, createCategoryValues } from "../schema/categorySchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import createCategoryAction from "../actions/createCategoryAction"
import { toast } from "sonner"

export default function CreateCategoryForm() {
    const form = useForm<createCategoryValues>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
            normalizedName: ''
        }
    })

    async function onSubmit(values: createCategoryValues) {
        const res = await createCategoryAction({ categoryValues: values })
        if (res.isError) {
            toast.error(res.error?.message || 'Something went wrong')
            return
        }
        toast.success('Category Created Successfully')
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Category Name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="normalizedName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Normalized Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="normalized-name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-accent-foreground/80" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
