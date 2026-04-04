import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import ScrollUpButton from '@/components/ScrollUpButton'
import AttributionPopupWrapper from '@/features/attribution/components/AttributionPopupWrapper'
import { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {
    return (
        <div>

            <Navbar />
            {children}
            <Footer />
            {/* <ScrollUpButton /> */}
            <AttributionPopupWrapper />

        </div>
    )
}
