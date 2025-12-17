import ContactUsForm from '../forms/ContactUsForm'
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import ContactDesktopBg from '../../../../public/assets/contact_us/Contact.png'
import ContactMobileBg from '../../../../public/assets/contact_us/Contact-mobile (1).png'
import Image from 'next/image'
import Vc from '../../../../public/assets/vectors/Artboard 1 copy.png'
import Container from '@/components/Container'
import FacebookIcon from '../../../../public/assets/Social media icons/facebook.png'
import InstagramIcon from '../../../../public/assets/Social media icons/instagram.png'
import EmailIcon from '../../../../public/assets/Social media icons/email.png'
import LinkedInIcon from '../../../../public/assets/Social media icons/linkedin.png'
import MobileIcon from '../../../../public/assets/Social media icons/mobile.png'
import TelegramIcon from '../../../../public/assets/Social media icons/telegram.png'
import { ClockIcon, MapPinIcon } from 'lucide-react'
export default function ContactUs() {
    return (
        <div className='min-h-screen relative !pb-96 md:!pb-0 '>
            <div className='w-full h-full absolute   left-0 top-0 -z-20 bg-black/40 ' />
            <div className='w-full h-full absolute   left-0 top-0 -z-30 '>

                <Image src={ContactDesktopBg} alt='contact' className='hidden md:block w-full h-full ' />
                <Image src={ContactMobileBg} alt='contact' className='block md:hidden w-full h-full   object-[0%_400%s]' />
            </div>
            {/* <Image src={Vc} alt='contact' className='w-1/3 h-full object-cover absolute top-0 left-0 -z-20 opacity-45 blur-3xl' /> */}

            <Container>
                <div className='flex flex-col w-full gap-4 mb-4'>
                    <TransparentTextAnimation>
                        <p className='font-gravesend text-4xl md:text-7xl w-fit mx-auto font-bold bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90%'>
                            Contact us
                        </p>
                    </TransparentTextAnimation>
                    <TransparentTextAnimation>
                        <p className='font-gravesend text-xl md:text-4xl  font-semibold bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-50%'>
                            Let’s Build Your Next Masterpiece
                        </p>
                    </TransparentTextAnimation>
                    <TransparentTextAnimation>
                        <p className=' md:text-lg   bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-30%'>
                            Every great collaboration starts with a simple conversation.
                            <br />
                            Tell us your vision — we’ll Fractalize it into something extraordinary.

                        </p>
                    </TransparentTextAnimation>
                </div>
                <div className='w-full md:w-1/2 relative z-30 '>
                    <ContactUsForm />
                </div>
                <div className='flex flex-col pt-12 gap-3'>
                    <p className='whitespace-pre-line text-accent-foreground/70'>
                        We’re a collective of designers, developers, and thinkers who believe that digital experiences  can<br /> move people — not just reach them.  Whether you’re building a brand, a product, or a story, <br />we’re here to help it take form — intelligently, beautifully, and with purpose.
                    </p>
                    <div className='flex items-center gap-2'>
                        <div className='bg-white/85 w-fit p-1 rounded rounded-tl-lg rounded-br-lg'>
                            <MapPinIcon color='black ' />

                        </div>
                        <span>Damascus / Dubi</span>
                    </div>
                    <div className='flex items-center gap-2'>

                        <Image src={EmailIcon} alt='email' className='bg-black w-6' />


                        <span>info@fractals.net</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>

                            <Image src={TelegramIcon} alt='telegram' className='bg-black w-6' />
                            <Image src={FacebookIcon} alt='facebook' className='bg-black w-6' />




                            <Image src={LinkedInIcon} alt='linkedIn' className='bg-black w-6' />

                            <Image src={InstagramIcon} alt='Instagram' className='bg-black w-6' />

                        </div>
                        <span>@Fractals Group</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-white/85 w-fit p-1 rounded rounded-tl-lg rounded-br-lg'>
                            <ClockIcon color='black ' />

                        </div>
                        <span>Sunday - Thursday, 9:00 AM - 5:00 PM</span>
                    </div>
                </div>
            </Container>

        </div>
    )
}
