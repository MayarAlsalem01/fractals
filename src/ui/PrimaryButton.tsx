'use client'
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function PrimaryButton({
    children,
    id,
    className,
    fill = false,
    onClick,
    type = 'button'
}: {
    fill?: boolean,
    children: ReactNode,
    id?: string,
    className?: string,
    onClick?: () => void,
    type?: 'button' | 'submit'
}) {
    return (
        <Button type={type} id={id} className={`btn bg-transparent rounded-none flex text-nowrap xl:text-lg px-3 lg:px-3 xl:px-6 py-2 rounded-tl-2xl rounded-br-2xl    relative  cursor-pointer overflow-hidden  items-center gap-2 backdrop-blur-sm inset-shadow-[1px_3px_18px] inset-shadow-white/20 border border-white/30 hover:bg-transparent hover:backdrop-blur-lg text-foreground  ${className}`}
            onClick={() => onClick?.()}
        >

            <div className="relative z-50">
                {
                    children
                }
            </div>
            <div className={`btn-blue-background absolute -left-5 -top-28  h-[calc(100%+100px)] w-2/4 bg-brand-tertiary rounded-full  transition-all duration-700 blur-md ${fill ? '' : 'opacity-0'} `} />
            <div className={`btn-blue-background absolute -left-5 -top-28  h-[calc(100%+100px)] w-2/4 bg-brand-tertiary rounded-full  transition-all duration-700 blur-md ${fill ? '' : 'opacity-0'} `} />
            <div className={`btn-pink-background absolute -left-4 blur-md  top-0 rotate-90 h-[calc(100%+100px)] w-2/4  bg-brand-primary rounded-full   duration-700 ${fill ? '' : 'opacity-0'}`} />
            <div className={`btn-pink-background absolute -left-4 blur-md  top-0 rotate-90 h-[calc(100%+100px)] w-2/4  bg-brand-primary rounded-full   duration-700 ${fill ? '' : 'opacity-0'}`} />
            <div className={`btn-cyan-background absolute -right-5 rotate-[10deg] -top-18   h-[calc(100%+100px)] w-2/3 rounded-bl-full  bg-radial from-brand-secondary to-transparent to-80%  transition-all duration-700 blur-lg ${fill ? '' : 'opacity-0'}`} />
            <div className={`btn-cyan-background absolute -right-5 rotate-[10deg] -top-18   h-[calc(100%+100px)] w-2/3 rounded-bl-full  bg-radial from-brand-secondary to-transparent to-80%  transition-all duration-700 blur-lg ${fill ? '' : 'opacity-0'}`} />
        </Button>
    )
}