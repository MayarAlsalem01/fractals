import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import BlobImage from '../../../../public/assets/Artboard 1 copy 4.png'
import { getLocale, getTranslations } from 'next-intl/server'
export default async function Process() {
    const t = await getTranslations('Our Process')
    return (
        <section className='px-4 md:px-14 py-8 h-screen relative '>
            <div className='absolute -top-6 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-[-2] '></div>
            {/* blob */}
            <div className='w-full h-full absolute left-0 top-0 overflow-hidden'>
                <Image src={BlobImage} alt='asdf' className={`select-none w-full lg:w-1/2 object-cover absolute  '-right-40 lg:-right-72 -top-20  lg:-top-96 -z-10 blur-2xl`} />
            </div>
            <div className='w-full h-full absolute left-0 top-0 '>
                <Image src={BlobImage} alt='asdf' className={`select-none w-full lg:w-1/2 object-cover absolute   lg:translate-x-[-18rem]  -translate-x-36 -bottom-40  lg:-bottom-[18rem] rotate-45  blur-2xl -z-10`} />
            </div>
            <div className='flex justify-center mb-4'>
                <TransparentTextAnimation>
                    <p

                        className={`text-4xl lg:text-7xl font-gravesend font-bold bg-clip-text text-transparent line-clamp-2  bg-gradient-to-r from-white/80  to-[80%] `}>{t('title')} </p>
                </TransparentTextAnimation>
            </div>
            <div className='flex flex-col gap-3 w-full md:3/4 lg:w-2/3 mx-auto'>
                <ProccessCard >
                    <ProcessCardHeader>
                        <p>
                            {t('Briefing.title')}
                        </p>
                    </ProcessCardHeader>
                    <ProccessCardContent  >
                        <p className='text-foreground/60'>
                            {t('Briefing.description')}
                        </p>
                        <div>
                            <span>{t('step')}</span>
                            <span className='text-6xl text-foreground/60 font-light'>01</span>
                        </div>
                    </ProccessCardContent>
                </ProccessCard>
                <ProccessCard >
                    <ProcessCardHeader>
                        <p>
                            {t('Design or Development.title')}
                        </p>
                    </ProcessCardHeader>
                    <ProccessCardContent  >
                        <p className='text-foreground/60'>
                            {t('Design or Development.description')}
                        </p>
                        <div>
                            <span>{t('step')}</span>
                            <span className='text-6xl text-foreground/60 font-light'>02</span>
                        </div>
                    </ProccessCardContent>
                </ProccessCard>
                <ProccessCard >
                    <ProcessCardHeader>
                        <p>
                            {t('Handoff.title')}
                        </p>
                    </ProcessCardHeader>
                    <ProccessCardContent  >
                        <p className='text-foreground/60'>
                            {t('Handoff.description')}
                        </p>
                        <div>
                            <span>{t('step')}</span>
                            <span className='text-6xl text-foreground/60 font-light'>03</span>
                        </div>
                    </ProccessCardContent>
                </ProccessCard>

            </div>
        </section>
    )
}
async function ProcessCardHeader({ children }: { children: ReactNode }) {
    return (
        <CardHeader className={` font-gravesend text-2xl`}>
            {children}
        </CardHeader>
    )
}
function ProccessCardContent({ children }: { children: ReactNode }) {
    return (
        <CardContent className='flex items-center justify-between '>
            {children}
        </CardContent>
    )
}
function ProccessCard({ children }: { children: ReactNode }) {
    return (
        <Card className='bg-background/50 backdrop-blur-sm border-accent-foreground/35 rounded-3xl inset-shadow-[0rem_0rem_1rem_10px] inset-shadow-white/5 gap-0'>
            {children}
        </Card>
    )
}