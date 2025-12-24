import PrimaryButton from '@/ui/PrimaryButton'
import Container from '../Container'
import Cobe from '../Cobe'
import Image from 'next/image'
import Star from '../../../public/assets/star.png'
export default function Footer() {
    return (
        <footer className='relative overflow-hidden px-2 md:px-24 '>
            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] lg:w-[50rem] lg:h-[50rem] left-24 md:left-96 lg:-left-4 -top-[5rem] md:-top-[30rem] lg:-top-[40rem] bg-radial from-brand-primary to-transparent to-80%   absolute -z-10 rounded-full blur-3xl' />
            <div className='w-[30rem] h-[30rem] hidden md:hidden md:w-[45rem] lg:hidden md:h-[45rem] lg:w-[15rem] lg:h-[15rem] right-64 lg:left-[37rem] -top-[5rem] lg:-top-10 bg-radial from-brand-tertiary/65 to-transparent  absolute -z-30 rounded-full blur-3xl' />
            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] lg:w-[50rem] lg:h-[50rem] right-64 md:right-60 lg:-right-24 -top-[5rem] md:-top-[35rem] lg:-top-[35rem] bg-brand-secondary/40  absolute -z-30 rounded-full blur-3xl' />

            <div className='w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] -left-42 md:-left-72  -bottom-[17rem]  lg:-left-64 md:-bottom-[30rem] lg:-bottom-[35rem]  bg-radial from-brand-tertiary to-transparent  absolute -z-10 rounded-full blur-3xl' />
            <div className='absolute flex -left-14  justify-end md:left-16 -top-32 md:-top-[32rem] w-full -z-20 '>
                <Cobe className='scale-150 ' />
            </div>
            <Container className='!lg:py-16'>
                <div>
                    <div className='flex flex-col gap-2 mb-4'>
                        <p className='text-xl md:text-3xl lg:text-5xl font-bold font-gravesend'>Grow Globally <br /> with Fractals</p>
                        <p>Seamlessly manage inventory, optimize operations, and scale your <br /><span className='font-taken-by-vultures text-4xl'>business worldwide.</span> </p>
                        <PrimaryButton fill className='w-fit !px-3'>
                            <div className=' flex items-center gap-1'>
                                <Image src={Star} alt='star' className='w-5' />
                                <span>Get Started</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            Naviagation
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Blogs</li>
                            <li>Vacancies</li>
                            <li>Our Expertise</li>
                            <li> Our Process</li>
                            <li>Contact Us</li>

                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            Solutions
                        </h3>
                        <ul className='flex flex-col gap-1'>

                            <li>Product Mangement</li>
                            <li>Desktop Breif </li>
                            <li>Mobile Breif </li>
                            <li>Web Breif </li>
                            <li>UI&UX Breif </li>
                            <li>Brand&Logo Breif </li>
                            <li>Soical Media Breif </li>


                        </ul>
                    </div>
                    <div className='flex flex-col gap-12 '>
                        <div>
                            <h3 className='font-bold text-lg mb-2'>
                                Legal
                            </h3>
                            <ul className='flex flex-col gap-1'>
                                <li>Privacy Policy</li>
                                <li>Terms Of Service</li>
                                <li>Cookies Settings</li>


                            </ul>
                        </div>
                        <div>
                            <h3 className='font-bold text-lg mb-2 '>
                                Partners
                            </h3>
                            <ul className='flex flex-col gap-1'>
                                <li>ReflectArt</li>


                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            Social Media
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>LinkedIn</li>
                            <li>Telegram</li>

                        </ul>
                    </div>
                </div>
                <div className='w-full flex justify-center py-12'>
                    <p>All Copyrights reserved for Fractals Group &copy;{new Date().getFullYear()}</p>
                </div>
            </Container>
        </footer>
    )
}
