'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { updateCategorySchema, updateCategoryValues } from "../schema/categorySchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import updateCategoryAction from "../actions/updateCategoryAction"
import { toast } from "sonner"
import { Category } from "@/db/schema"

export default function EditCategoryForm({ category }: { category: Category }) {
    const form = useForm<updateCategoryValues>({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            name: category.name,
            normalizedName: category.normalizedName
        }
    })

    async function onSubmit(values: updateCategoryValues) {
        const res = await updateCategoryAction({ categoryValues: values, categoryId: category.id })
        if (res.isError) {
            toast.error(res.error?.message || 'Something went wrong')
            return
        }
        toast.success('Category updated Successfully')
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
                        {form.formState.isSubmitting ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
