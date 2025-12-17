import PrimairyButton from '@/ui/PrimaryButton';
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function AboutUs() {
    const locale = await getLocale()
    const t = await getTranslations('aboutUS')
    return (
        <section className='w-full h-screen relative overflow-hidden '>
            <div className='absolute -top-4 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-[-2] '></div>
            <div className=' absolute top-0 left-0 h-full w-full overflow-hidden   perspective-distant transform-3d'>
                <video src="/videos/myVideo.mp4" className={`min-w-full h-full object-fill object-[82%_0px] -translate-x-54 translate-z-[-8rem] -translate-y-[-2rem] md:-translate-y-[-0rem] md:translate-0  brightness-90 scale-x-[3] md:scale-110 ${locale === 'ar' ? 'rotate-y-180 ' : ''}`} controls={false} autoPlay loop muted playsInline disablePictureInPicture />
            </div>
            <div className=' h-full w-full px-4 py-4 md:px-12 flex flex-col items-center md:items-start md:justify-center gap-3 z-10 relative'>
                <TransparentTextAnimation>
                    <p

                        className='text-4xl lg:text-7xl font-gravesend font-bold bg-clip-text text-transparent line-clamp-2  bg-gradient-to-r from-white/80  to-65%  '>{t('who we are')}</p>
                </TransparentTextAnimation>
                <TransparentTextAnimation>
                    <p className='max-w-[70ch] md:text-lg text-balance leading-relaxed bg-clip-text text-transparent   bg-gradient-to-r from-white/80  to-65% '>
                        {
                            t('description')
                        }


                    </p>
                </TransparentTextAnimation>
                <PrimairyButton className=' px-6 py-5'>
                    Read More
                </PrimairyButton>
            </div>
        </section>
    )
}
