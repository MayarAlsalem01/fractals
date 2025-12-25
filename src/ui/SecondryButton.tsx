'use client'
import { ReactNode } from 'react'

export default function SecondryButton({ children, type = 'button', onClick, className }: { children: ReactNode, type?: 'button' | 'submit', onClick?: () => void, className?: string }) {
    return (
        <button type={type} onClick={onClick} className={`sec-btn  px-3 py-1 border border-accent-foreground/30 rounded-br-2xl rounded-tl-2xl  relative overflow-hidden whitespace-nowrap ${className}`}>
            {children}
            <div className=" btn-pink-background w-24 h-24 bg-radial from-brand-primary to-transparent to-70% absolute top-5 left-0 hover:-left-4 rounded-full blur  transition-all -z-10 duration-300" />
            <div className="w-24 h-24 bg-radial btn-cyan-background from-brand-secondary to-transparent to-40% absolute -top-16 -right-14 rounded-full blur transition-all -z-10 duration-300" />
            <div className="w-24 h-24 btn-blue-background bg-radial from-brand-tertiary to-transparent to-40% absolute -top-16 -right-2 rounded-full blur transition-all -z-10 duration-300" />
        </button>
    )
}
