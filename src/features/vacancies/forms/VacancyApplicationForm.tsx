'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { vacancyApplicationSchema, VacancyApplicationSchemaType } from "../schema/VacancyApplicationSchema"
import { useTranslations } from "next-intl"
import SecondryButton from "@/ui/SecondryButton"
import { useForm } from "react-hook-form"
import { submitVacancyApplication } from "../actions/vacancy-actions"
import { toast } from "sonner"
import { useTransition } from "react"

export default function VacancyApplicationForm() {
    const t = useTranslations('vacancies.application')
    const [isPending, startTransition] = useTransition()
    const form = useForm<VacancyApplicationSchemaType>({
        resolver: zodResolver(vacancyApplicationSchema),
        defaultValues: {
            name: "",
            email: "",
            position: "",
            cv: "",
            message: "",
        }
    })
    function onSubmit(values: VacancyApplicationSchemaType) {
        startTransition(async () => {
            const result = await submitVacancyApplication(values)
            if (result.success) {
                toast.success(result.success)
                form.reset()
            } else {
                toast.error(result.error)
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full xl:max-w-2xl" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('name.label')}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={t('name.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('email.label')}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={t('email.placeholder')} className="" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />

                    <FormField control={form.control} name="position" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('position.label')}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={t('position.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="cv" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('cv.label')}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={t('cv.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem className="w-full md:col-span-2">
                            <FormLabel >
                                {t('message.label')}
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder={t('message.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                </div>
                <div className="flex justify-start mt-8">
                    <SecondryButton type="submit" disabled={isPending}  >
                        {isPending ? t('submit') || 'Submitting...' : t('submit')}
                    </SecondryButton>
                </div>
            </form>
        </Form>
    )
}