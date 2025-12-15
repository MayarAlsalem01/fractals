import React from 'react'

export default function Container({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`px-4 md:px-12 py-8  md:py-28 ${className}`}>
            {children}
        </div>
    )
}
