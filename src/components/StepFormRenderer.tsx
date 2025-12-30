'use client'

import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'

// Assuming these imports are correct based on the user's file
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
import { DatePicker } from './DatePicker'
import { Slider } from './ui/slider'
import Range from './Range'
import BlobUploader from '@/features/breifs/components/BlobUploader'
// import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from './ui/multi-select'

// --- Type Definitions (Copied from store) ---

type Attr = {
    id: number
    key: string
    label: string
    type: string
    required: boolean | null
    width?: string | null
    options?: any
    meta?: any
}

type Section = {
    id: number
    key: string
    title: string
    position: number
    attributes: Attr[]
}

// --- Component Props ---

interface StepFormRendererProps {
    section: Section
    formMethods: UseFormReturn<FieldValues, any, FieldValues>
}

// --- Step Form Renderer Component ---

export default function StepFormRenderer({ section, formMethods }: StepFormRendererProps) {
    const { register, control, setValue, formState: { errors } } = formMethods
    const attributes = section.attributes

    // 7. Component to render a single attribute input
    const renderAttribute = (attr: Attr) => {
        const hint = attr.meta?.hint ?? null
        const placeholder = attr.meta?.placeholder ?? attr.label
        const containerClass = attr.width === 'full' ? 'col-span-full' : ''

        // Check for error specific to this attribute
        const error = errors[attr.key]

        return (
            <div key={attr.id} className={containerClass}>
                {attr.label.length > 1 ? <label className="block text-sm font-medium mb-1 ">
                    {attr.label}
                    {attr.required ? ' *' : ''}
                </label> : ''}

                {/* Input Rendering Logic - Fully restored from user's original file */}
                {attr.type === 'file' ? (
                    <Controller
                        control={control}
                        name={attr.key}
                        render={({ field: { value = [], onChange } }) => {
                            if (attr.meta.max)
                                return <div className='grid grid-cols-7 gap-3'>
                                    {
                                        Array.from({ length: attr.meta.max })
                                            .map((_, i) => <BlobUploader key={i} onValueChnage={(val) => {
                                                console.log(i)
                                                const next = [...value]
                                                next[i] = val
                                                // optionally remove nulls at the end: keep length equal to meta.max if you want slots
                                                onChange(next)

                                            }} value={value[i]} />)
                                    }
                                </div>
                            else
                                return <BlobUploader onValueChnage={(val) => {
                                    onChange([...value, val])
                                    console.log(attr.meta.max)
                                }} />
                        }}
                    />
                ) :
                    attr.type === 'range' ? (
                        <Controller
                            control={control}
                            name={attr.key}
                            render={({ field: { onChange } }) => (
                                <Range onValueChange={(value) => onChange(value)} />
                            )}
                        />
                    ) : attr.type === 'date' ? (
                        <Controller
                            control={control}
                            name={attr.key}
                            render={({ field: { onChange } }) => (
                                <div className="flex gap-3 flex-wrap items-center w-full">
                                    <DatePicker onValueChange={(value) => {
                                        onChange(value)
                                        console.log(typeof value)
                                    }} />
                                </div>
                            )}
                        />
                    ) :
                        attr.type === 'selectComboBox' ? (
                            <Controller
                                control={control}
                                name={attr.key}
                                render={({ field: { value = [], onChange } }) => (
                                    <div className="flex gap-3 flex-wrap items-center">
                                        {attr.options.map((opt: any) => {
                                            const checked = value === opt.value
                                            return (
                                                <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={attr.key.toString()}
                                                        checked={checked}
                                                        onChange={(e) => {
                                                            if (e.target.checked) onChange(opt.value)
                                                            // else onChange(value.filter((v: string) => v !== opt.value))
                                                        }}
                                                        className="w-4 h-4 accent-black/90 bg-red-400"
                                                    />
                                                    <span className="text-sm">{opt.label}</span>
                                                </label>
                                            )
                                        })}
                                    </div>
                                )}
                            />

                        ) : attr.type === 'multiselect' ? (
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
                                <Controller
                                    control={control}
                                    name={attr.key}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={attr.key}
                                            checked={field.value}
                                            onCheckedChange={(val) => field.onChange(Boolean(val))}
                                        />
                                    )}
                                />
                                <label htmlFor={attr.key} className="ml-2 text-sm">
                                    {placeholder}
                                </label>
                            </div>
                        ) : (
                            // Default to Input (text, number, email, etc.)
                            <Input
                                type={attr.type === 'number' ? 'number' : attr.type === 'email' ? 'email' : 'text'}
                                placeholder={placeholder}
                                {...register(attr.key)}
                            />
                        )}

                {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}

                {/* show zod/react-hook-form error */}
                {error && (
                    <p className="text-sm text-red-500 mt-1">
                        {String(error.message)}
                    </p>
                )}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attributes.map(renderAttribute)}
        </div>
    )
}
