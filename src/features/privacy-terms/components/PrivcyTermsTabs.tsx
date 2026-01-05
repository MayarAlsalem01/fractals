'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link, usePathname } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

function getTabFromPath(path?: string | null) {
    if (!path) return 'cookies'
    if (path.includes('terms-of-service')) return 'terms'
    if (path.includes('privacy-policy')) return 'privacy'
    if (path.includes('cookies')) return 'cookies'
    return 'cookies'
}

export default function PrivcyTermsTabs() {
    const path = usePathname()
    const [value, setValue] = useState<string>(() => getTabFromPath(path))

    useEffect(() => {
        setValue(getTabFromPath(path))
    }, [path])

    return (
        <Tabs value={value} onValueChange={(v) => setValue(v)} className='mt-20 md:mt-0 '>
            <TabsList className='bg-muted/40 border border-muted backdrop-blur-2xl'>

                <Link href={'/privacy-terms/cookies'}>
                    <TabsTrigger value='cookies'>
                        Cookies Policy
                    </TabsTrigger>
                </Link>
                <Link href={'/privacy-terms/terms-of-service'}>
                    <TabsTrigger value='terms'>
                        Terms of Service
                    </TabsTrigger>
                </Link>
                <Link href={'/privacy-terms/privacy-policy'}>
                    <TabsTrigger value='privacy'>
                        Privacy Policy
                    </TabsTrigger>
                </Link>
            </TabsList>
        </Tabs>
    )
}
