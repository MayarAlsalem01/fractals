'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import PrimaryButton from "@/ui/PrimaryButton"
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

export default function ContactUsForm() {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="email" className="" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />

                    <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                Company / Organization (optional)
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Company / Organization (optional)" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel >
                                Service / Inquiry Type
                            </FormLabel>
                            <FormControl>
                                <Select value={field.value}
                                    onValueChange={(val) => {
                                        // val is string — cast it to the enum union so TS is happy
                                        field.onChange(val as contactUsValues['service'])
                                    }}>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="  Service / Inquiry Type" />

                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel> Service / Inquiry Type</SelectLabel>
                                            <SelectItem value="Web Development">
                                                Web Development
                                            </SelectItem>
                                            <SelectItem value="Mobile App Development">
                                                Mobile App Development
                                            </SelectItem>
                                            <SelectItem value="Desktop Applications">
                                                Desktop Applications
                                            </SelectItem>
                                            <SelectItem value="UI/UX Design">
                                                UI/UX Design
                                            </SelectItem>
                                            <SelectItem value="Branding & Logo Design">
                                                Branding & Logo Design
                                            </SelectItem>
                                            <SelectItem value="Social Media Management">
                                                Social Media Management
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
                                message
                            </FormLabel>
                            <FormControl>
                                <Textarea className="w-full min-h-32" placeholder="message" {...field} />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )} />
                </div>
                <PrimaryButton className="mt-4">Send My Vision</PrimaryButton>
            </form>
        </Form>
    )
}
