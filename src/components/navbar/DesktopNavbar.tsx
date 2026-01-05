'use client'
import NavItem from './NavItem'
import { LanguageMenu } from '../LanguageMenu/LanguageMenu'
import PrimaryButton from '@/ui/PrimaryButton'
import Image from 'next/image'
import Star from '../../../public/assets/star.png'
import { Link as navLinks } from './Navbar'
import { Link, usePathname } from '@/i18n/navigation'

export default function DesktopNavbar({ links }: { links: navLinks[] }) {
    const path = usePathname()
    console.log(path)
    return (
        <div className=' w-full hidden lg:flex items-center justify-end'>
            <ul className={`hidden lg:flex  font-gravesend   items-center lg:gap-5 xl:gap-8  justify-center  w-[80%]`}>
                {
                    links.map((link, i) => <Link href={link.href} key={i}>
                        <NavItem key={i} isActive={path === link.href ? true : false}>{link.name} </NavItem>
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
        <Link href={'/expertise'} className='hidden md:flex'>
            <PrimaryButton id='navBtn' fill className='hidden md:flex'>
                <div className='relative z-50 flex items-center  gap-1'>
                    <Image src={Star} alt='star' className='w-5 transition-all duration-500' />
                    <p >Get started</p>
                </div>
            </PrimaryButton>
        </Link>
    )
}