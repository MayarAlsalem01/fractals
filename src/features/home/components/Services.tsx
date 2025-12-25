import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ReactNode } from 'react'
import PrimairyButton from '@/ui/PrimaryButton';
import { getTranslations } from 'next-intl/server';
import RingVc from '../../../../public/assets/vectors/Artboard 1 copy 3.png'
import Image from 'next/image';
import SecondryButton from '@/ui/SecondryButton';
export default async function Services() {
    const t = await getTranslations('expertise')
    return (
        <div className='min-h-screen w-full flex flex-col lg:items-end justify-center relative py-12 pb-18 px-4 lg:px-32 '>
            <div className='absolute -left-[57rem] top-[-84%]  h-full w-full'>
                <Image src={RingVc} alt='' className='rotate-[130deg] scale-75' />
            </div>
            <div className='absolute h-full w-full bg-linear-to-b from-transparent to-black left-0 top-0' />
            <div className='absolute -top-4 left-0 w-full h-1/4 bg-linear-to-b from-transparent to-black rotate-180  blur-lg  shadow-2xl shadow-black  z-[-2] '></div>
            <div className=' absolute top-0 left-0 h-full w-full overflow-hidden  -z-20 perspective-distant transform-3d '>
                <video src="/videos/services.mp4" className='min-w-full h-full object-fill object-[82%_0px] md:object-[82%_0px] translate-x-[1rem] translate-z-[-100rem] -translate-y-[0%] md:translate-0  brightness-75 scale-x-[3] md:scale-100' controls={false} autoPlay loop muted playsInline disablePictureInPicture />
            </div>
            <div className='w-full h-full bg-linear-to-r to-brand-primary/30 from-brand-tertiary/30 top-0 left-0  absolute -z-10 ' />
            <p className='text-4xl md:text-7xl mx-auto w-fit opacity-20 mt-8 mb-1 font-gravesend font-bold'>{t('our expertise')}</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 pb-24'>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent '>
                    <ServicesCardHeader >
                        {t('web devlopenet.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('web devlopenet.Custom-built websites with modern frameworks')}
                            </li>
                            <li>
                                {t('web devlopenet.Fast, scalable, and interactive')}
                            </li>
                            <li>
                                {t('web devlopenet.Integrations: CMS, APIs, cloud hosting, SEO optimization')}
                            </li>


                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-xs  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('mobile app development.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('mobile app development.Native or Cross-platform apps')}
                            </li>
                            <li>
                                {t('mobile app development.Elegant UI, intuitive UX, and seamless performance')}
                            </li>
                            <li>
                                {t('mobile app development.From MVP to full-scale product')}
                            </li>


                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter>
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>

                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('desktop applications.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('desktop applications.Smart, secure, and performance-focused systems')}
                            </li>
                            <li>
                                {t('desktop applications.Tailored for business automation and internal operations')}
                            </li>


                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter>
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('ui ux design.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList>
                            <li>
                                {t('ui ux design.Human-centered experiences that fuse art and usability')}
                            </li>
                            <li>
                                {t("ui ux design.Services: wireframing, prototyping, motion design, and usability testing")}
                            </li>



                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('Branding & Logo Design.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('Branding & Logo Design.Visual storytelling that defines who you are')}
                            </li>
                            <li>
                                {t("Branding & Logo Design.Deliverables: logo, typography, color palette, brand system")}
                            </li>



                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('Marketing & Social Media Management.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('Marketing & Social Media Management.Strategy, storytelling, and visual identity consistency')}
                            </li>
                            <li>
                                {t("Marketing & Social Media Management.Growth-driven campaigns powered by analytics and creativity")}
                            </li>



                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>

                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('Network.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('Network.Network Design')}
                            </li>
                            <li>
                                {t("Network.Configuration & Installation")}
                            </li>
                            <li>
                                {t("Network.Security & maintenance")}
                            </li>
                            <li>
                                {t("Network.Smart Infrastructure")}
                            </li>



                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>
                <Card className=' gap-1 backdrop-blur-lg  border border-accent-foreground/35 rounded-3xl inset-shadow-[2rem_1rem_50px] inset-shadow-white/10 bg-transparent'>
                    <ServicesCardHeader >
                        {t('IoT Solutions.title')}
                    </ServicesCardHeader>
                    <CardContent>
                        <ServicesCardList >
                            <li>
                                {t('IoT Solutions.Smart Devices Integration')}
                            </li>
                            <li>
                                {t("IoT Solutions.Automation Systems")}
                            </li>
                            <li>
                                {t("IoT Solutions.Smart homes & Buildings")}
                            </li>
                            <li>
                                {t("IoT Solutions.Industrial IoT")}
                            </li>



                        </ServicesCardList>
                    </CardContent>
                    <ServicesCardFooter >
                        <SecondryButton>Watch more</SecondryButton>
                    </ServicesCardFooter>
                </Card>



            </div>
        </div >
    )
}
function ServicesCardFooter({ children }: { children: ReactNode }) {
    return (
        <CardFooter className='h-full flex flex-col justify-end items-end mt-4'>
            {children}
        </CardFooter>
    )
}
function ServicesCardHeader({ children }: { children: ReactNode }) {
    return (
        <CardHeader className='text-xl font-bold font-gravesend'>
            {children}
        </CardHeader>
    )
}
function ServicesCardList({ children }: { children: ReactNode }) {
    return (
        <ul className='!list-disc leading-relaxed text-sm ps-4'>
            {children}

        </ul>
    )
}