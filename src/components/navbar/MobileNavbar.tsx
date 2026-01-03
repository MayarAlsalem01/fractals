'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Star from '../../../public/assets/star.png'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import PrimaryButton from '@/ui/PrimaryButton'
import { Link as LinkType } from './Navbar'
import NavItem from './NavItem'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageMenu } from '../LanguageMenu/LanguageMenu'


export default function MobileNavbar({ links }: { links: LinkType[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null)
    const path = usePathname()
    useEffect(() => {
        if (!isOpen) return

        const onDocPointer = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node | null
            if (!target) return
            // if click is outside wrapper, close
            if (!wrapperRef.current?.contains(target)) {
                setIsOpen(false)
            }
        }

        const onScroll = () => setIsOpen(false)
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }

        document.addEventListener('mousedown', onDocPointer)
        document.addEventListener('touchstart', onDocPointer)
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('keydown', onKey)

        return () => {
            document.removeEventListener('mousedown', onDocPointer)
            document.removeEventListener('touchstart', onDocPointer)
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('keydown', onKey)
        }
    }, [isOpen])
    return (
        <div ref={wrapperRef} className='flex items-center gap-2  lg:hidden'>
            <NavMobileBtn />
            <button ref={toggleBtnRef} onClick={() => setIsOpen(!isOpen)} className='py-1 px-2 rounded-2xl rounded-tr-none rounded-bl-none  text-foreground text-lg inset-shadow-[1px_1px_8px] inset-shadow-white/20'  >
                <Menu size={'32'} />
            </button>
            <ul className={`absolute  flex flex-col gap-4   w-full start-0 top-[calc(100%+8px)] py-5 px-6 rounded-2xl rounded-tr-none rounded-bl-none bg-black/70 border border-white/30 inset-shadow-[1px_5px_18px] inset-shadow-white/20 transition-transform duration-300 z-30  ${isOpen ? 'translate-y-0 ' : '-translate-y-[calc(100%+8rem)] '}`}>
                {
                    links.map((link, i) => (
                        <Link href={link.href} key={i}>
                            <NavItem className='py-1 w-fit ' isActive={path === link.href ? true : false}>{link.name}</NavItem>
                        </Link>
                    ))
                }
                <LanguageMenu className='!bg-black' />
            </ul>
        </div>
    )
}
function NavMobileBtn() {
    return (
        <PrimaryButton fill className='bg-linear-to-tr from-brand-primary to-brand-tertiary to-65% '>
            <div className='flex items-center gap-2'>
                <Image src={Star} alt='star' className='w-5' />
                <p className='font-semibold hidden md:block'>Get Started</p>
            </div>
        </PrimaryButton>
    )
}