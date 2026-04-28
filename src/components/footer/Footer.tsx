import PrimaryButton from '@/ui/PrimaryButton'
import Container from '../Container'
import Cobe from '../Cobe'
import Image from 'next/image'
import Star from '../../../public/assets/star.png'
import { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
export default async function Footer({ locale }: { locale: string }) {
    const buttonsTranslations = await getTranslations('buttons')
    const footerTranslations = await getTranslations('footer')
    return (
        <footer className='relative overflow-hidden px-2 xl:px-24  ' >
            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] lg:w-[50rem] lg:h-[50rem] left-24 md:left-96 lg:-left-4 -top-[5rem] md:-top-[30rem] lg:-top-[40rem] bg-radial from-brand-primary to-transparent to-80%   absolute -z-10 rounded-full blur-3xl' />
            <div className='w-[30rem] h-[30rem] hidden md:hidden md:w-[45rem] lg:hidden md:h-[45rem] lg:w-[15rem] lg:h-[15rem] right-64 lg:left-[37rem] -top-[5rem] lg:-top-10 bg-radial from-brand-tertiary/65 to-transparent  absolute -z-30 rounded-full blur-3xl' />
            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] lg:w-[50rem] lg:h-[50rem] right-64 md:right-60 lg:-right-24 -top-[5rem] md:-top-[35rem] lg:-top-[35rem] bg-brand-secondary/40  absolute -z-30 rounded-full blur-3xl' />

            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] -left-42 md:-left-72  -bottom-[17rem]  lg:-left-64 md:-bottom-[30rem] lg:-bottom-[35rem]  bg-radial from-brand-tertiary to-transparent  absolute -z-10 rounded-full blur-3xl' />
            <div className='absolute flex -left-14  justify-end md:left-16 -top-32 md:-top-[32rem] w-full -z-20 '>
                <Cobe className='scale-150 ' />
            </div>
            <Container className='lg:!py-0 lg:!pt-10'>
                <div >
                    <div
                        className='flex flex-col gap-2 mb-4 mt-44 md:mt-0 w-fit'
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    >
                        <p
                            className=' text-xl md:text-3xl lg:text-5xl font-bold font-gravesend'

                        >
                            {footerTranslations.rich('title', {
                                br: () => <br />
                            })}
                        </p>
                        <p>
                            {footerTranslations.rich('description', {
                                br: () => <br />
                            })}
                        </p>
                        <Link href={'/expertise'} dir='ltr'>
                            <PrimaryButton fill className='footer-btn w-fit !px-4' >
                                <div className=' flex items-center gap-2'>
                                    <Image src={Star} alt='star' className='w-5  transition-all duration-500' />
                                    <span>{buttonsTranslations('Get Started')}</span>
                                </div>
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            {footerTranslations(' Naviagation.title')}
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <FooterLink href='/'>
                                {footerTranslations(' Naviagation.home')}
                            </FooterLink>
                            <FooterLink href='/about_us'>
                                {footerTranslations(' Naviagation.aboutUs')}
                            </FooterLink>
                            <FooterLink href='/blogs'>
                                {footerTranslations(' Naviagation.Blogs')}
                            </FooterLink>
                            <FooterLink href='/vacancies'>
                                {footerTranslations(' Naviagation.vacances')}
                            </FooterLink>
                            <FooterLink href='/expertise'>
                                {footerTranslations(' Naviagation.Our Expertise')}
                            </FooterLink>
                            <FooterLink href='/#our_process'>
                                {footerTranslations(" Naviagation.Our Process")}
                            </FooterLink>
                            <FooterLink href='/contact_us'>
                                {footerTranslations(' Naviagation.ContactUs')}
                            </FooterLink>




                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            {footerTranslations('solutions.title')}
                        </h3>
                        <ul className='flex flex-col gap-1'>

                            <li>{footerTranslations('solutions.product-management')}</li>

                            <FooterLink href='/brief/desktop'>
                                {footerTranslations('solutions.desktop')}
                            </FooterLink>
                            <FooterLink href='/brief/mobile'>
                                {footerTranslations("solutions.mobile")}
                            </FooterLink>

                            <FooterLink href='/brief/web'>
                                {footerTranslations('solutions.web')}
                            </FooterLink>
                            <FooterLink href='/brief/ui_ux'>
                                {footerTranslations('solutions.ui_ux')}

                            </FooterLink>
                            <FooterLink href='/brief/logo-design'>
                                {footerTranslations('solutions.logo-design')}

                            </FooterLink>
                            <FooterLink href='/brief/social-media'>
                                {footerTranslations('solutions.social-media')}

                            </FooterLink>



                        </ul>
                    </div>
                    <div className='flex flex-col gap-12 '>
                        <div>
                            <h3 className='font-bold text-lg mb-2'>
                                {footerTranslations('Legal.title')}
                            </h3>
                            <ul className='flex flex-col gap-1'>
                                <FooterLink href='privacy-terms/privacy-policy'>

                                    {footerTranslations('Legal.privacy policy')}

                                </FooterLink>
                                <FooterLink href='privacy-terms/terms-of-service'>
                                    {footerTranslations('Legal.terms of service')}
                                </FooterLink>
                                <FooterLink href='privacy-terms/cookies'>
                                    {footerTranslations('Legal.cookies settings')}

                                </FooterLink>


                            </ul>
                        </div>
                        <div>
                            <h3 className='font-bold text-lg mb-2 '>
                                {footerTranslations('Partner.title')}
                            </h3>
                            <ul className='flex flex-col gap-1'>
                                <FooterLink href='https://reflectart.net/' target='_blank'>
                                    {footerTranslations('Partner.reflectart')}
                                </FooterLink>


                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            {footerTranslations('Social Media.title')}
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <FooterLink href={'https://www.facebook.com/share/1aCkhgsCWj/?mibextid=wwXIfr'} target='_blank'>
                                {footerTranslations('Social Media.Facebook')}
                            </FooterLink>
                            <FooterLink href={'https://www.instagram.com/fractalstech?igsh=MWpxdDdtNW82YW1seg=='} target='_blank'>
                                {footerTranslations('Social Media.Instagram')}

                            </FooterLink>
                            <FooterLink href={'https://www.linkedin.com/company/fractals1group/'} target='_blank'>
                                {footerTranslations('Social Media.LinkedIn')}

                            </FooterLink>


                        </ul>
                    </div>
                </div>
                <div className='w-full flex justify-center py-12'>
                    <p> {footerTranslations('copyrights')} &copy;{new Date().getFullYear()}</p>
                </div>
            </Container>
        </footer>
    )
}

function FooterLink({ children, target = "_self", href }: { children: ReactNode, href: string, target?: '_blank' | '_self' }) {
    return (
        <Link href={href} target={target}>
            <li className=' w-fit relative transition-opacity after:absolute after:h-[1px] after:opacity-0 after:bg-white after:w-full after:left-0 after:bottom-0 hover:after:opacity-100'>
                {children}
            </li>
        </Link>
    )

}
