// lib/zodFromAttributes.ts
import { z } from 'zod'

type Attr = {
    id: number
    key: string
    label: string
    type: string
    required: boolean | null
    meta?: any // JSONB from DB
}

/**
 * Build a Zod schema object from DB attributes.
 * - supports meta.minLength, meta.maxLength, meta.regex, meta.hint
 */
export function buildZodSchema(attributes: Attr[]) {
    const shape: Record<string, z.ZodTypeAny> = {}

    for (const attr of attributes) {
        const meta = (attr.meta ?? {}) as Record<string, any>

        // helper to create string validators with meta
        const stringWithMeta = (): z.ZodTypeAny => {
            let s = z.string()
            if (meta.minLength != null) {
                const min = Number(meta.minLength)
                if (!Number.isNaN(min)) s = s.min(min, { message: `${attr.label} must be at least ${min} characters.` })
            }
            if (meta.maxLength != null) {
                const max = Number(meta.maxLength)
                if (!Number.isNaN(max)) s = s.max(max, { message: `${attr.label} must be at most ${max} characters.` })
            }

            if (meta.regex) {
                try {
                    const re = new RegExp(meta.regex)
                    s = s.regex(re, { message: meta.regexMessage ?? `${attr.label} is not formatted correctly.` })
                } catch (err) {
                    // invalid regex in DB — don't crash; just ignore it
                    console.warn(`Invalid regex for attribute ${attr.key}:`, meta.regex)
                }
            }
            return s
        }

        let field: z.ZodTypeAny
        switch (attr.type) {
            case 'text':
            case 'textarea':
            case 'select':
            case 'selectComboBox':
                field = stringWithMeta()
                break

            case 'number': {
                // for numbers, use coerce so string inputs coerce to number
                let n = z.coerce.number()
                if (meta.min != null) {
                    const min = Number(meta.min)
                    if (!Number.isNaN(min)) n = n.min(min, { message: `${attr.label} must be >= ${min}` })
                }
                if (meta.max != null) {
                    const max = Number(meta.max)
                    if (!Number.isNaN(max)) n = n.max(max, { message: `${attr.label} must be <= ${max}` })
                }
                field = n
                break
            }

            case 'boolean':
                field = z.boolean()
                break

            case 'date':
                field = z.date()
                break

            case 'multiselect':
                field = z.array(z.string(), { error: `this field is required.` })
                break

            case 'json':
                field = z.any()
                break
            case 'email':
                field = z.email()
                break
            case 'file':
                field = z.array(z.string())
                break

            default:
                field = z.any()
                break
        }

        if (attr.required) {
            // for strings we already validated minLength possibly; ensure presence
            // zod .nonempty() is useful for strings/arrays, but we already used minLength
            if (attr.type === 'text' || attr.type === 'textarea' || attr.type === 'select' || attr.type === 'selectComboBox') {
                field = (field as z.ZodString).refine((v) => v !== '', { message: `${attr.label} is required.` })
            }
            if (attr.type === 'date') {
                field = (field as z.ZodDate).refine((v) => v !== undefined, { message: `${attr.label} is required.` })
            }
            if (attr.type === 'range') {
                field = (field as z.ZodNumber).refine((v) => v !== undefined, { message: `${attr.label} is required.` })
            }
            if (attr.type === 'file') {
                field = (field as z.ZodArray).refine((v) => v !== undefined, { message: `${attr.label} is required.` })
            }
            if (attr.type === 'multiselect') {
                field = (field as z.ZodArray).refine((v) => v !== undefined, { message: `${attr.label} is required.` })
            }
        } else {
            field = field.optional()
        }

        shape[attr.key] = field
    }

    return z.object(shape)
}
