
'use server'
import Container from '@/components/Container'
import { db } from '@/db/drizzle'
import { brief_templates } from '@/db/schema'
import MultiStepFormWrapper from '@/features/breifs/MultiStepFormWrapper'
import { eq } from 'drizzle-orm'
import getBriefSectionsAction from '@/features/breifs/actions/getBriefSectionsAction'

export default async function page() {
    const breifT = await db.query.brief_templates.findFirst({ where: eq(brief_templates.id, 3) })

    const sections = await getBriefSectionsAction(3)
    return (
        <Container className='lg:pb-0'>
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
                        {sections.length > 0 ? <MultiStepFormWrapper sections={sections} templateId={2} /> : ''}
                    </div>
                </div>
            </section>
        </Container>
    )
}
