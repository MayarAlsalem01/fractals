import PrimaryButton from '@/ui/PrimaryButton'
import React from 'react'
import Container from '../Container'
import Cobe from '../Cobe'
import Blind from '../Blind'

export default function Footer() {
    return (
        <footer className='relative overflow-hidden '>
            <div className='w-[700px] h-[700px] left-0 -top-64 bg-radial from-brand-primary to-transparent to-80%   absolute -z-10 rounded-full blur-3xl' />
            <div className='w-[700px] h-[700px] -right-12 -top-64 bg-brand-secondary/40  absolute -z-10 rounded-full blur-3xl' />
            <div className='w-4/5 h-2/3 md:h-1/2 -left-1/4 -bottom-32 bg-brand-tertiary  absolute -z-10 rounded-full blur-3xl' />
            <div className='absolute -right-24 md:-right-14 -z-20 -top-24 md:-top-60 '>
                <Cobe />
            </div>
            <Container>
                <div>
                    <div className='flex flex-col gap-2 mb-4'>
                        <p className='text-xl md:text-3xl font-bold'>Grow Globally with Fractals</p>
                        <p>Seamlessly manage inventory, optimize operations, and scale your business worldwide.</p>
                        <PrimaryButton fill className='w-fit'>Get Started</PrimaryButton>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            Naviagation
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Our Expertise</li>
                            <li> Our Process</li>
                            <li>Contact Us</li>

                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-lg'>
                            Documentation
                        </h3>
                        <ul className='flex flex-col gap-1'>
                            <li>Blogs</li>
                            <li>Vacancies</li>
                            <li>Privacy Policy</li>

                        </ul>
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
            </Container>
        </footer>
    )
}
