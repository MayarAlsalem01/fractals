'use server'

import { db } from "@/db/drizzle"
import { brief_attribute_values, briefs } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function getBriefAttrubiteValuesByIdAction(id: number) {
    const session = await getServerSession()
    if (!session || session.expires)
        redirect('/en')


    const values = await db.query.briefs.findMany({
        where: eq(briefs.id, id),

        with: {
            attributeValues: {
                columns: {
                    id: true,
                    value_text: true
                },
                with: {
                    attribute: {
                        with: {
                            section: {
                                columns: {
                                    title: true,
                                    position: true
                                },

                            }
                        }
                    }
                }
            }
        },
    })
    const brief = values[0]

    const groupedBySection = Object.values(
        brief.attributeValues.reduce((acc, item) => {
            const section = item.attribute.section
            const key = section.position

            if (!acc[key]) {
                acc[key] = {
                    position: section.position,
                    title: section.title,
                    attributes: [],
                }
            }

            acc[key].attributes.push(item)

            return acc
        }, {} as Record<number, {
            position: number
            title: string
            attributes: typeof brief.attributeValues
        }>)
    ).sort((a, b) => a.position - b.position)

    return groupedBySection
}
