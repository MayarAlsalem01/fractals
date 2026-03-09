'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import SecondryButton from "@/ui/SecondryButton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import z from 'zod'
const contactUsSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    company: z.string().min(2),
    service: z.enum([
        'Web Development',
        'Mobile App Development',
        'Desktop Applications',
        'UI/UX Design',
        'Branding & Logo Design',
        'Social Media Management'
    ]),
    message: z.string().min(10)
})
type contactUsValues = z.infer<typeof contactUsSchema>

import { useTranslations } from 'next-intl';

export default function ContactUsForm() {
    const t = useTranslations('contact.form');
    const form = useForm({
        resolver: zodResolver(contactUsSchema),
        defaultValues: {
            service: 'Web Development'
        }
    })
    function onSubmit(values: contactUsValues) {

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

                    <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('company.label')}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={t('company.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                {t('service.label')}
                            </FormLabel>
                            <FormControl>
                                <Select value={field.value}
                                    onValueChange={(val) => {
                                        // val is string — cast it to the enum union so TS is happy
                                        field.onChange(val as contactUsValues['service'])
                                    }}>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder={t('service.placeholder')} />

                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel> {t('service.label')}</SelectLabel>
                                            <SelectItem value="Web Development">
                                                {t('service.options.Web Development')}
                                            </SelectItem>
                                            <SelectItem value="Mobile App Development">
                                                {t('service.options.Mobile App Development')}
                                            </SelectItem>
                                            <SelectItem value="Desktop Applications">
                                                {t('service.options.Desktop Applications')}
                                            </SelectItem>
                                            <SelectItem value="UI/UX Design">
                                                {t('service.options.UI/UX Design')}
                                            </SelectItem>
                                            <SelectItem value="Branding & Logo Design">
                                                {t('service.options.Branding & Logo Design')}
                                            </SelectItem>
                                            <SelectItem value="Social Media Management">
                                                {t('service.options.Social Media Management')}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem className="col-span-full" >
                            <FormLabel >
                                {t('message.label')}
                            </FormLabel>
                            <FormControl>
                                <Textarea className="w-full min-h-32" placeholder={t('message.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                </div>
                <SecondryButton className="mt-4">{t('submit')}</SecondryButton>
            </form>
        </Form>
    )
}
