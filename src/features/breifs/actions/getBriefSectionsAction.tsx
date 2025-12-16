'use server'
import { db } from "@/db/drizzle"
import { Attr, Section } from "../types"
import { template_attributes, template_sections } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"

export default async function getBriefSectionsAction(templateId: number): Promise<Section[]> {
    // 1. Fetch all sections for the template
    const sectionsResult = await db.select()
        .from(template_sections)
        .where(eq(template_sections.template_id, templateId))
        .orderBy(template_sections.position)

    // 2. Fetch all attributes for all sections in one go (more efficient)
    const sectionIds = sectionsResult.map(s => s.id)
    const attributesResult = await db.select()
        .from(template_attributes)
        .where(inArray(template_attributes.section_id, sectionIds))
        .orderBy(template_attributes.position)

    // 3. Group attributes by section_id
    const attributesBySection = attributesResult.reduce((acc, attr) => {
        const sectionId = attr.section_id
        if (!acc[sectionId]) {
            acc[sectionId] = []
        }
        acc[sectionId].push(attr)
        return acc
    }, {} as Record<number, Attr[]>)

    // 4. Combine sections and their attributes
    const sections: Section[] = sectionsResult.map(section => ({
        ...section,
        attributes: attributesBySection[section.id] || [],
    }))

    return sections
}