import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'

export default async function GradientText({ children, className }: { children: ReactNode, className?: string }) {
    const locale = await getLocale()
    return (
        <p className={` uppercase  text-3xl  md:text-6xl lg:text-7xl bg-clip-text text-transparent  bg-gradient-to-r from-white/80 from-[2%] via-brand-secondary via-25% to-brand-primary  to-90%   py-1  font-gravesend font-bold ${className}`}>
            {children}
        </p>
    )
}
