import ContactUsForm from '../forms/ContactUsForm'
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import ContactDesktopBg from '../../../../public/assets/contact_us/Contact.png'
import ContactMobileBg from '../../../../public/assets/contact_us/Contact-mobile (1).png'
import Image from 'next/image'
import Container from '@/components/Container'
import FacebookIcon from '../../../../public/assets/Social media icons/facebook.png'
import InstagramIcon from '../../../../public/assets/Social media icons/instagram.png'
import EmailIcon from '../../../../public/assets/Social media icons/email.png'
import LoctionIcon from '../../../../public/assets/Social media icons/Pin.svg'
import LinkedInIcon from '../../../../public/assets/Social media icons/linkedin.png'
import TelegramIcon from '../../../../public/assets/Social media icons/telegram.png'
import ClockIcon from '../../../../public/assets/Social media icons/Clock.svg'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function ContactUs() {
    const t = await getTranslations('contact')
    const locale = await getLocale()
    return (
        <div className='min-h-screen relative !pb-96 md:!pb-0 '>
            <div className='w-full h-full absolute   left-0 top-0 -z-20 bg-linear-to-b from-transparent from-55% to-black ' />
            <div className='w-full h-full absolute   left-0 top-0 -z-30 '>

                <Image src={ContactDesktopBg} alt='contact' className={`hidden lg:block w-full h-full ${locale === 'ar' ? 'rotate-y-180' : 'rotate-y-0'}`} />
                <Image src={ContactMobileBg} alt='contact' className={`block lg:hidden w-full h-full   object-[0%_400%s] ${locale === 'ar' ? 'rotate-y-180' : 'rotate-y-0'}`} />
            </div>
            {/* <Image src={Vc} alt='contact' className='w-1/3 h-full object-cover absolute top-0 left-0 -z-20 opacity-45 blur-3xl' /> */}
            <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>

                <Container>
                    <div className='flex flex-col w-full gap-4 mb-4 pt-8 sm:!pt-0 ' >
                        <TransparentTextAnimation>
                            <p className='font-gravesend text-4xl md:text-7xl w-fit mx-auto font-bold bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90% mb-4'>
                                {t('heading')}
                            </p>

                            <p className='font-gravesend text-xl md:text-4xl  font-semibold bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-50% mb-4'>
                                {t('title')}
                            </p>

                            <p className=' md:text-lg   bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-30% '>
                                {t.rich('description', {
                                    br: () => <br />
                                })}
                            </p>
                        </TransparentTextAnimation>

                    </div>
                    <div className='w-full lg:w-1/2 relative z-30 ' dir={locale === 'ar' ? 'rtl' : 'ltr'} >
                        <ContactUsForm />
                    </div>
                    <div className='flex flex-col pt-12 gap-3'>
                        <p className='whitespace-pre-line text-accent-foreground/70'>
                            {t.rich('about', {
                                br: () => <br />
                            })}
                        </p>
                        <div className='flex items-center gap-2'>
                            <Image src={LoctionIcon} alt='email' className='bg-black w-6' />
                            <span>Dubai / Damascus  </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <a href='https://mail.google.com/mail/?view=cm&fs=1&to=info@fractals.net&su=Subject&body=Message%20here' target='_blank' className='flex items-center gap-2'>
                                <Image src={EmailIcon} alt='email' className='bg-black w-6' />
                                <span>info@fractals.net</span>
                            </a>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-2'>

                                <Image src={TelegramIcon} alt='telegram' className='bg-black w-6' />
                                <Link href={'https://www.facebook.com/share/1aCkhgsCWj/?mibextid=wwXIfr'}>
                                    <Image src={FacebookIcon} alt='facebook' className='bg-black w-6' />
                                </Link>



                                <Link href={'https://www.linkedin.com/company/fractals1group/'}>
                                    <Image src={LinkedInIcon} alt='linkedIn' className='bg-black w-6' />
                                </Link>

                                <Link href={'https://www.instagram.com/fractalstech?igsh=MWpxdDdtNW82YW1seg=='}>
                                    <Image src={InstagramIcon} alt='Instagram' className='bg-black w-6' />
                                </Link>

                            </div>
                            <span>@Fractals Group</span>
                        </div>
                        <div className='flex items-center gap-2'>

                            <Image src={ClockIcon} alt='clock icon' color='black ' className='bg-black w-6' />


                            <span>Sunday - Thursday, 9:00 AM - 5:00 PM</span>
                        </div>
                    </div>
                </Container>
            </div>

        </div>
    )
}
