import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import Image from 'next/image'
import React from 'react'
import VacencessImage from '../../../../public/assets/Ipdad.png'
import { getLocale, getTranslations } from 'next-intl/server'
import PrimaryButton from '@/ui/PrimaryButton'

export default async function VacanciesSection() {

    const t = await getTranslations('vacancies')
    return (
        <section className='w-full min-h-screen relative px-4 md:py-16  bg-black' >
            {/* The image is here, acting as the background */}
            <div className='absolute -top-10 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-20 '></div>
            <div className='w-full h-full  overflow-hidden absolute top-0 left-0 '>
                <Image src={VacencessImage} alt='fractals' className='h-full  object-cover  opacity-70 ' />
            </div>

            <div className='min-h-screen relative z-10 flex flex-col items-center justify-center '>

                {/* The text element now uses the same image as its background */}
                <div className='flex flex-col items-center'>
                    <p
                        className={`text-6xl md:text-8xl  font-gravesend font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-blue-500/20 `}

                    >
                        {t('title')}
                    </p>

                    <TransparentTextAnimation>
                        <p className={`text-2xl md:text-5xl font-gravesend font-bold -mt-4 bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-70%`}>
                            {t('description')}
                        </p>
                    </TransparentTextAnimation>
                    <TransparentTextAnimation>
                        <p className='text-sm md:text-xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-70% my-2'>
                            {t('subtitle')}
                        </p>
                    </TransparentTextAnimation>
                    <TransparentTextAnimation>
                        <p className='text-sm md:text-lg  self-start text-center  bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-70%'>
                            {t('long description')}
                        </p>
                    </TransparentTextAnimation>
                    <PrimaryButton className='mt-4'>Discover Vacancies </PrimaryButton>
                </div>
            </div>
        </section>
    )
}
