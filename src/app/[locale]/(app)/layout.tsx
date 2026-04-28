import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import ScrollUpButton from '@/components/ScrollUpButton'
import AttributionPopupWrapper from '@/features/attribution/components/AttributionPopupWrapper'
import { ReactNode } from 'react'

export default async function layout({ children, params }: { children: ReactNode, params: Promise<{ locale: string }> }) {
    const locale = await (await params).locale;
    return (
        <div>

            <Navbar locale={locale} />
            {children}
            <Footer locale={locale} />
            {/* <ScrollUpButton /> */}
            <AttributionPopupWrapper />

        </div>
    )
}
