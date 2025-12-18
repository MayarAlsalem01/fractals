import AboutUs from '@/features/aboutUs/components/AboutUs'


import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import AboutImageSilder from '@/features/aboutUs/components/AboutImageSilder'
import DotBackgroundDemo from '@/components/DottedBackground'
import Blind from '@/components/Blind'
import Vc from '../../../../../public/assets/Artboard 1 copy 4.png'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function page() {
    const t = await getTranslations('aboutUS')
    return (
        <section className=' '>

            <div className='relative pt-24 bg-black'>
                <AboutUs />
            </div>
            <DotBackgroundDemo className='px-4 md:px-14 pb-12'>
                <div className='flex flex-col gap-16'>
                    <div className='flex flex-col gap-2'>
                        <TransparentTextAnimation>
                            <AboutText >{t('vision.title')}</AboutText>
                        </TransparentTextAnimation>
                        <TransparentTextAnimation>
                            <p className='  bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-50%'>{t('vision.description')}
                            </p>
                        </TransparentTextAnimation>
                    </div>
                    <div className='flex flex-col gap-2 relative '>
                        <TransparentTextAnimation>
                            <AboutText>{t('mission.title')}</AboutText>
                        </TransparentTextAnimation>
                        <TransparentTextAnimation>
                            <p className='  bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-50%'>{t('mission.description')}

                            </p>
                            <Image src={Vc} alt='vc' className={`absolute  -left-60  -top-32  blur-2xl   rotate-45 w-1/3 -z-10`} />
                        </TransparentTextAnimation>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <TransparentTextAnimation>
                            <AboutText>{t('core values.title')}
                            </AboutText>
                        </TransparentTextAnimation>
                        <ul className='flex flex-col gap-2'>
                            <li className='list-disc text-accent-foreground/70 ml-6'>
                                {t('core values.Artistry & Precision')}

                            </li>
                            <li className='list-disc text-accent-foreground/70 ml-6'>
                                {t('core values.Innovation & Intelligence')}


                            </li>
                            <li className='list-disc text-accent-foreground/70 ml-6'>
                                {t('core values.Transparency & Collaboration')}


                            </li>
                            <li className='list-disc text-accent-foreground/70 ml-6'>
                                {t('core values.Human-Centered Design')}

                            </li>
                            <li className='list-disc text-accent-foreground/70 ml-6'>
                                {t('core values.Excellence & Growth')}
                            </li>

                        </ul>
                    </div>
                </div>
                <p className='mt-20 md:text-xl font-bold'>"{t('core values.des')}"

                </p>
                <Blind />

                <div className='flex justify-center font-gravesend font-bold relative mt-20 -mb-8  '>

                    <TransparentTextAnimation>
                        <AboutText >{t('our identity.title')}</AboutText>
                    </TransparentTextAnimation>
                </div>
                <AboutImageSilder />
                <div className='flex flex-col gap-8'>

                    <p className='text-xl font-medium tracking-wide'>
                        {t('our identity.mainTitle')}

                    </p>
                    <p>
                        {t('our identity.description')}
                    </p>
                    <p className='max-w-[52ch]'>
                        {t('our identity.values')}
                    </p>
                </div>
            </DotBackgroundDemo>
        </section>
    )
}




async function AboutText({ children }: { children: ReactNode }) {
    return (
        <p className={`text-4xl  lg:text-7xl font-gravesend font-bold w-fit  bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90% `}>{children}</p>
    )
}