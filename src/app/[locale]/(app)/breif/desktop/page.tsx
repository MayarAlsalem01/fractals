
'use server'
import Container from '@/components/Container'
import { db } from '@/db/drizzle'
import { brief_templates, template_attributes, template_sections } from '@/db/schema'
import MultiStepFormWrapper from '@/features/breifs/DesktopForm'
import { eq, inArray } from 'drizzle-orm'
import { Section } from '@/features/breifs/types'
import getBriefSectionsAction from '@/features/breifs/actions/getBriefSectionsAction'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function page() {
    const breifT = await db.query.brief_templates.findFirst({ where: eq(brief_templates.id, 1) })

    const sectios = await getBriefSectionsAction(1)
    return (
        <Container>
            <section className='min-h-screen  w-full flex flex-col items-center justify-center md:justify-start relative '>
                <div className='absolute -left-64 -top-40 w-2/3 h-full -z-10'>
                    {/* <Image src={Vc1} alt='' className='object-cover w-full h-full blur-md' /> */}
                </div>
                <div className='w-full md:w-2/3 '>
                    <h1 className=' md:text-4xl mt-20 md:mt-0 font-semibold bg-clip-text text-transparent whitespace-nowrap bg-gradient-to-r  from-brand-secondary  to-brand-primary  to-50% uppercase font-gravesend'>
                        {breifT?.description}
                    </h1>
                    <div className='md:pl-10 mt-8 md:mt-8 flex flex-col gap-4 '>

                        {/* <DynamicBriefForm attributes={attrs} /> */}
                        <MultiStepFormWrapper sections={sectios} templateId={1} />
                    </div>
                </div>
            </section>
        </Container>
    )
}
