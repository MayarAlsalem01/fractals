import { Section as DbSection } from "@/db/schema"
export type Attr = {
    id: number
    key: string
    label: string
    type: string
    required: boolean | null
    width?: string | null
    options?: any
    meta?: any
    position?: number
}
export type Section = DbSection & {
    // ... template_sections fields
    attributes: Attr[] // <--- This is the crucial nested array
}