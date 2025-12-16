'use server'
import { db } from '@/db/drizzle'
import { brief_attribute_values, BriefAttributeInsertValues, briefs } from '@/db/schema'
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

export default async function insertBriefAttributeAction({ values, templateId }: {
    values: Omit<BriefAttributeInsertValues, 'created_at' | 'updated_at' | 'id' | 'brief_id'>[],
    templateId: number,
}): Promise<Result<undefined, string>> {

    const briefAttrRowSchema = createInsertSchema(brief_attribute_values) // schema for a single row
    const briefAttrArraySchema = z.array(briefAttrRowSchema)
    try {
        const res = await db.transaction(async (tx) => {
            const createdBreif = await tx.insert(briefs).values({
                template_id: templateId,
                client_id: new Date(Date.now()),
                status: 'active',

            }).returning()

            console.log('created breif data', createdBreif)
            const newValues = values.map(v => {
                return {
                    ...v,
                    brief_id: createdBreif[0].id
                }
            })
            const result = await briefAttrArraySchema.safeParseAsync(newValues)
            console.log(values)
            if (result.error) {
                console.log(result)
                console.log('asdsad')
                return {
                    ok: false,
                    data: undefined,
                    error: {
                        message: 'vaildation error '
                    }
                }

            }
            else {
                await tx.insert(brief_attribute_values).values(newValues)
                return {
                    ok: true,
                    data: undefined,

                }

            }
        })

        return res
    } catch (e) {
        console.error(e)
        return {
            data: undefined,
            ok: false,
            error: {
                message: 'something went wrong'
            }
        }
    }
}
