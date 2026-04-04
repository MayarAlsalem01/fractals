import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import Image from 'next/image'
import VacencessDesktopImage from '../../../../public/assets/vacancies/Untitled-1.png'
import VacencessMobileImage from '../../../../public/assets/vacancies/Mobile.png'
import VacencessIpadImage from '../../../../public/assets/vacancies/Ipdad.png'
import { getLocale, getTranslations } from 'next-intl/server'
import Container from '@/components/Container'
import SecondryButton from '@/ui/SecondryButton'
import Link from 'next/link'

export default async function VacanciesSection() {

    const t = await getTranslations('vacancies')
    const buttons = await getTranslations('buttons')
    const locale = await getLocale()
    return (
        <section className='w-full min-h-screen relative  bg-black overflow-hidden -top-12 md:top-0' >
            {/* overlay */}
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-b from-transparent to-black from-80% z-10 ' />
            {/* The image is here, acting as the background */}
            <div className='absolute -top-10 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-20 '></div>
            <div className='w-full h-full  overflow-hidden absolute  md:top-0 left-0 '>
                <Image src={VacencessDesktopImage} alt='fractals' className={`h-full   opacity-70 hidden xl:block  ${locale === 'ar' ? 'rotate-y-180' : ''}`} />
                <Image src={VacencessMobileImage} alt='fractals' className={`h-full block md:hidden  opacity-70   ${locale === 'ar' ? 'rotate-y-180' : ''}`} />
                <Image src={VacencessIpadImage} alt='fractals' className={`h-full hidden  md:block  opacity-70  xl:hidden ${locale === 'ar' ? 'rotate-y-180' : ''}`} />
            </div>
            <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <Container className='z-20 relative top-60 md:top-0' >
                    <p
                        className={`w-fit text-6xl md:text-8xl  font-gravesend font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-primary/70 to-white/40 mx-auto `}

                    >
                        {t('title')}
                    </p>
                    <div className='flex flex-col items-center md:items-start  gap-2 mt-12 '>
                        <TransparentTextAnimation>
                            <p className={`text-3xl md:text-5xl font-gravesend font-bold  bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-25% whitespace-pre-line text-center md:text-start`}>
                                {t('description')}
                            </p>
                        </TransparentTextAnimation>
                        <TransparentTextAnimation>
                            <p className='text-base md:text-xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-30% my-2'>
                                {t('subtitle')}
                            </p>
                        </TransparentTextAnimation>
                        <TransparentTextAnimation>
                            <p className='text-sm md:text-base    bg-clip-text text-transparent bg-linear-to-r from-white to-white/0 to-40% whitespace-pre-line'>
                                {t('long description')}
                            </p>
                        </TransparentTextAnimation>
                        <Link href={'/vacancies#vacancies'}>
                            <SecondryButton className="w-fit">{buttons('Discover Vacancies')} </SecondryButton>
                        </Link>
                    </div>
                </Container>

            </div>

        </section>
    )
}
