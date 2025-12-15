'use client'
import { SessionProvider as NextSessionProvider, useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export default function SessionProvider({ children }: { children: ReactNode }) {
    return (
        <NextSessionProvider  >
            {children}
        </NextSessionProvider>
    )
}
