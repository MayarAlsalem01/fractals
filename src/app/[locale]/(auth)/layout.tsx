import { Toaster } from '@/components/ui/sonner'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            {
                children
            }


        </div>
    )
}
