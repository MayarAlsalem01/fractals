import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div>

            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
