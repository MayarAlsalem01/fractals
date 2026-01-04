'use client'

import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildZodSchema } from '@/lib/zodFromAttributes'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { Attr } from '@/features/breifs/types'


export function prepareAttributePayload(formData: Record<string, any>, attributes: Attr[]) {
    return attributes.map(attr => {
        // read the raw value submitted for the attribute key
        const raw = formData[attr.key];

        // normalize value if needed (e.g. undefined -> null)
        const value = raw === undefined ? null : raw;

        // human-friendly text for quick searching (optional)
        const valueText =
            value === null
                ? null
                : Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value);

        return {
            attribute_id: attr.id,
            key: attr.key,
            value,
            value_text: valueText,
        };
    });
}

export default function DynamicBriefForm({ attributes }: { attributes: Attr[] }) {
    const schema = useMemo(() => buildZodSchema(attributes), [attributes])

    const defaultValues = useMemo(() => {
        const dv: Record<string, any> = {}
        attributes.forEach((a) => {
            dv[a.key] = a.meta?.defaultValue ?? (a.type === 'multiselect' ? [] : '')
        })
        return dv
    }, [attributes])

    const { register, handleSubmit, setValue, control, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    })

    function onSubmit(data: any) {
        console.log('SUBMIT', prepareAttributePayload(data, attributes))
        // server action / API call
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
                {attributes.map((attr) => {
                    const hint = attr.meta?.hint ?? null
                    const placeholder = attr.meta?.placeholder ?? attr.label
                    const containerClass = attr.width === 'full' ? 'col-span-full' : ''

                    return (
                        <div key={attr.id} className={containerClass}>
                            <label className="block text-sm font-medium mb-1">
                                {attr.label}
                                {attr.required ? ' *' : ''}
                            </label>

                            {/* MULTISELECT (connected via Controller) */}
                            {attr.type === 'selectComboBox' ? (
                                <Controller
                                    control={control}
                                    name={attr.key}
                                    render={({ field: { value = [], onChange } }) => (
                                        <div className="flex gap-3 flex-wrap items-center">
                                            {attr.options.map((opt: any) => {
                                                const checked = Array.isArray(value) && value.includes(opt.value)
                                                return (
                                                    <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name={attr.id.toString()}
                                                            checked={checked}
                                                            onChange={(e) => {
                                                                if (e.target.checked) onChange([...value, opt.value])
                                                                else onChange(value.filter((v: string) => v !== opt.value))
                                                            }}
                                                            className="w-4 h-4  accent-black bg-red-400"
                                                        />
                                                        <span className="text-sm">{opt.label}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    )}
                                />

                            ) :
                                attr.type === 'multiselect' ? (
                                    <Controller
                                        control={control}
                                        name={attr.key}
                                        render={({ field: { value = [], onChange } }) => (
                                            <div className="flex gap-3 flex-wrap items-center">
                                                {attr.options.map((opt: any) => {
                                                    const checked = Array.isArray(value) && value.includes(opt.value)
                                                    return (
                                                        <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
                                                            <Checkbox

                                                                checked={checked}
                                                                onCheckedChange={(val) => {
                                                                    if (val) onChange([...value, opt.value])
                                                                    else onChange(value.filter((v: string) => v !== opt.value))
                                                                }}
                                                                className="w-4 h-4"
                                                            />
                                                            <span className="text-sm">{opt.label}</span>
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    />

                                ) : attr.type === 'select' ? (
                                    // SINGLE SELECT connected via Controller
                                    <Controller
                                        control={control}
                                        name={attr.key}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value ?? ''}
                                                onValueChange={(val: any) => field.onChange(val)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={placeholder} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {(attr.options ?? []).map((opt: any) => (
                                                            <SelectItem key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                ) : attr.type === 'textarea' ? (
                                    <Textarea placeholder={placeholder} {...register(attr.key)} />
                                ) : attr.type === 'boolean' ? (
                                    <div className="flex items-center">
                                        <Checkbox
                                            id={attr.key}
                                            onCheckedChange={(val) => setValue(attr.key, Boolean(val))}
                                            defaultChecked={Boolean(attr.meta?.defaultValue)}
                                        />
                                        <label htmlFor={attr.key} className="ml-2 text-sm">
                                            {placeholder}
                                        </label>
                                    </div>
                                ) : attr.type === 'number' ? (
                                    <Input type="number" placeholder={placeholder} {...register(attr.key)} />
                                ) : attr.type === 'email' ? (
                                    <Input type="email" placeholder={placeholder} {...register(attr.key)} />
                                ) : (
                                    <Input placeholder={placeholder} {...register(attr.key)} />
                                )}

                            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}

                            {/* show zod/react-hook-form error */}
                            {formState.errors[attr.key] && (
                                <p className="text-sm text-red-500 mt-1">
                                    {String(formState.errors[attr.key]?.message)}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="mt-6">
                <Button type="submit">Save</Button>
            </div>
        </form>
    )
}
