import Image from 'next/image'
import React, { ReactNode } from 'react'
import Star from '../../../public/assets/star.png'
import logo from '../../../public/assets/logo/logo.svg'
import { LanguageMenu } from '../LanguageMenu/LanguageMenu'
import MobileNavbar from './MobileNavbar'
import { getTranslations } from 'next-intl/server'
import PrimaryButton from '@/ui/PrimaryButton'
import DesktopNavbar from './DesktopNavbar'
export type Link = {
    href: string,
    name: string
}
export default async function Navbar() {
    const t = await getTranslations('navbar')
    const links: Link[] = [
        {
            href: '/',
            name: t('home')
        },
        {
            href: '/about_us',
            name: t('aboutUs')
        },
        {
            href: '/expertise',
            name: t('Expertise')
        },
        {
            href: '/blogs',
            name: t('Blogs')
        },
        {
            href: '/vacancies',
            name: t('vacances')
        },
        {
            href: '/contact_us',
            name: t('ContactUs')
        },
    ]
    return (
        <nav className='w-full px-4 lg:px-12 xl:px-24 py-2 fixed top-0 z-50 '>
            <div className='w-full flex justify-between items-center px-6  py-4 bg-transparent rounded-tl-4xl rounded-br-4xl backdrop-blur-lg border border-white/30 inset-shadow-[3px_5px_18px] inset-shadow-white/20'>
                <Image src={logo} alt='asd' className='w-32 2xl:w-42' />
                <DesktopNavbar links={links} />
                <MobileNavbar links={links} />
            </div>
        </nav>
    )
}
function NavItem({ children, isActive = false }: { children: ReactNode, isActive?: boolean }) {
    return (
        <li className={`text-xs text-nowrap 2xl:text-base uppercase relative after-w-0 after:absolute after:left-0 after:bottom-0 after:h-[0.5px] after:bg-white ${isActive ? 'text-accent-foreground   after:w-full   ' : 'text-white/70'} hover:after:w-full hover:after:h-0.5 hover:text-accent-foreground transition-all`}>
            {children}
        </li>
    )
}
function NavMobileBtn() {
    return (
        <button className='bg-linear-to-bl block md:hidden from-brand-tertiary  to-brand-primary  py-2 px-2 rounded-tl-2xl rounded-br-2xl'>
            <Image src={Star} alt='star' className='w-7' />
        </button>
    )
}

// function NavBtn() {
//     return (
//         <div>
//             <NavDesktopBtn />
//             <NavMobileBtn />
//         </div>
//     )
// }
