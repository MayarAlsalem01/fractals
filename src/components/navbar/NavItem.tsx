import { ReactNode } from "react";

export default function NavItem({ children, className, isActive = false }: { children: ReactNode, className?: string, isActive?: boolean }) {
    return (
        <li className={`text-xs text-nowrap 2xl:text-base uppercase relative after-w-0 after:absolute after:left-0 after:bottom-0 after:h-[0.5px] after:bg-white ${isActive ? 'text-accent-foreground   after:w-full   ' : 'text-white/70'} hover:after:w-full hover:after:h-0.5 hover:text-accent-foreground transition-all ${className}`}>
            {children}
        </li>
    )
}