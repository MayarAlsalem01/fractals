'use client'
import { useFieldArray, useForm } from "react-hook-form"
import { createVacancySchema, CreateVacancyValues } from "../schema/vacancySchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import createVacancyAction from "../actions/createVacancyAction"
import updateVacancyAction from "../actions/updateVacancyAction"
import { Plus, Trash2, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

// Helper component for managing a list of strings (items)
function ItemsInput({ value = [], onChange }: { value: string[], onChange: (val: string[]) => void }) {
    const add = () => onChange([...value, ""])
    const remove = (index: number) => onChange(value.filter((_, i) => i !== index))
    const update = (index: number, val: string) => {
        const copy = [...value]
        copy[index] = val
        onChange(copy)
    }

    return (
        <div className="space-y-2">
            {value.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <Input
                        value={item}
                        onChange={(e) => update(index, e.target.value)}
                        placeholder="Type item here..."
                        className="bg-background"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={add} className="mt-2">
                <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
        </div>
    )
}

interface VacancyFormProps {
    onSuccess?: () => void;
    initialData?: CreateVacancyValues;
    vacancyId?: number;
}

export default function VacancyForm({ onSuccess, initialData, vacancyId }: VacancyFormProps) {
    const form = useForm<CreateVacancyValues>({
        resolver: zodResolver(createVacancySchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            sections: [
                { title: 'Responsibilities', order: 1, items: [] },
                { title: 'Qualifications', order: 2, items: [] }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sections"
    })

    async function onSubmit(values: CreateVacancyValues) {
        let res;
        if (vacancyId) {
            res = await updateVacancyAction(vacancyId, values)
        } else {
            res = await createVacancyAction(values)
        }

        if (res.isError) {
            toast.error(res.error?.message || 'Something went wrong')
            return
        }
        toast.success(vacancyId ? 'Vacancy updated successfully' : 'Vacancy created successfully')
        if (!vacancyId) form.reset()
        if (onSuccess) onSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Description (Short)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Brief overview of the role..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Sections</h3>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => append({ title: "", order: fields.length + 1, items: [] })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Section
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg bg-card/50 space-y-4 relative">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`sections.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Requirements" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`sections.${index}.order`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Order</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name={`sections.${index}.items`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Items (Bullet points)</FormLabel>
                                        <FormControl>
                                            <ItemsInput value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Saving...' : (vacancyId ? 'Update Vacancy' : 'Create Vacancy')}
                </Button>
            </form>
        </Form>
    )
}
