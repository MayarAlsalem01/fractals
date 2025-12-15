import React from 'react'
import NavItem from './NavItem'
import { getLocale, getTranslations } from 'next-intl/server'
import { LanguageMenu } from '../LanguageMenu/LanguageMenu'
import PrimaryButton from '@/ui/PrimaryButton'
import Image from 'next/image'
import Star from '../../../public/assets/star.png'
import { Link as navLinks } from './Navbar'
import { Link } from '@/i18n/navigation'

export default async function DesktopNavbar({ links }: { links: navLinks[] }) {
    return (
        <div className=' w-full hidden lg:flex items-center justify-end'>
            <ul className={`hidden lg:flex  font-gravesend   items-center lg:gap-5 xl:gap-8  justify-center  w-[80%]`}>
                {
                    links.map((link, i) => <Link href={link.href} key={i}>
                        <NavItem key={i}>{link.name} </NavItem>
                    </Link>)
                }

            </ul>
            <div className='flex gap-3 items-center'>
                <LanguageMenu className='hidden md:flex' />
                <NavDesktopBtn />
            </div>
        </div>
    )
}

function NavDesktopBtn() {
    return (
        <PrimaryButton id='navBtn' fill className='hidden md:flex'>
            <div className='relative z-50 flex items-center  gap-1'>
                <Image src={Star} alt='star' className='w-5 transition-all duration-500' />
                <p >Get started</p>
            </div>
        </PrimaryButton>
    )
}