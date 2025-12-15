import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ReactNode } from 'react'
import PrimairyButton from '@/ui/PrimaryButton';
import { getTranslations } from 'next-intl/server';

export default async function Services() {
    const t = await getTranslations('expertise')
    return (
        <div className='min-h-screen w-full flex flex-col items-end justify-center relative py-12 px-4 lg:px-12'>
            <div className='absolute -top-4 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-[-2] '></div>
            <div className=' absolute top-0 left-0 h-full w-full overflow-hidden  -z-20 perspective-distant transform-3d '>
                <video src="/videos/services.mp4" className='min-w-full h-full object-fill object-[82%_0px] translate-x-[1rem] translate-z-[-100rem] -translate-y-[0%] md:translate-0  brightness-75 scale-x-[3] md:scale-110' controls={false} autoPlay loop muted playsInline disablePictureInPicture />
            </div>
            <div className='w-full h-full bg-linear-to-r from-brand-primary/30 to-brand-tertiary/30 top-0 left-0  absolute -z-10 ' />
            <p className='text-4xl md:text-7xl mx-auto w-fit opacity-20 mt-8 mb-1 font-gravesend font-bold'>{t('our expertise')}</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('web devlopenet.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ul className='!list-disc px-8 leading-loose'>
                            <li>
                                {t('web devlopenet.Custom-built websites with modern frameworks')}
                            </li>
                            <li>
                                {t('web devlopenet.Fast, scalable, and interactive')}
                            </li>
                            <li>
                                {t('web devlopenet.Integrations: CMS, APIs, cloud hosting, SEO optimization')}
                            </li>
                            <li>
                                {t('web devlopenet.Framer motion, Shopify, Wordpress, Wix Studio')}
                            </li>

                        </ul>
                    </CardContent>
                    <ServicesCardFooter >
                        <PrimairyButton>Watch more</PrimairyButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-xs  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('mobile app development.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ul className='!list-disc px-8 leading-loose'>
                            <li>
                                {t('mobile app development.Native or Cross-platform apps')}
                            </li>
                            <li>
                                {t('mobile app development.Elegant UI, intuitive UX, and seamless performance')}
                            </li>
                            <li>
                                {t('mobile app development.From MVP to full-scale product')}
                            </li>


                        </ul>
                    </CardContent>
                    <ServicesCardFooter>
                        <PrimairyButton>Watch more</PrimairyButton>
                    </ServicesCardFooter>
                </Card>

                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('desktop applications.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ul className='!list-disc px-8 leading-loose'>
                            <li>
                                {t('desktop applications.Smart, secure, and performance-focused systems')}
                            </li>
                            <li>
                                {t('desktop applications.Tailored for business automation and internal operations')}
                            </li>


                        </ul>
                    </CardContent>
                    <ServicesCardFooter>
                        <PrimairyButton>Watch more</PrimairyButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('ui ux design.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ul className='!list-disc px-8 leading-loose'>
                            <li>
                                {t('ui ux design.Human-centered experiences that fuse art and usability')}
                            </li>
                            <li>
                                {t("ui ux design.Services: wireframing, prototyping, motion design, and usability testing")}
                            </li>



                        </ul>
                    </CardContent>
                    <ServicesCardFooter >
                        <PrimairyButton>Watch more</PrimairyButton>
                    </ServicesCardFooter>
                </Card>


            </div>
        </div>
    )
}
function ServicesCardFooter({ children }: { children: ReactNode }) {
    return (
        <CardFooter className='h-full flex flex-col justify-end items-end'>
            {children}
        </CardFooter>
    )
}
function ServicesCardHeader({ children }: { children: ReactNode }) {
    return (
        <CardHeader className='text-2xl font-bold'>
            {children}
        </CardHeader>
    )
}