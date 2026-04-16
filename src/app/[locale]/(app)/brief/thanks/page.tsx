import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CheckCircle2, ChevronRight, Home, LayoutPanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Container from '@/components/Container'
import ThanksSurvey from '@/features/breifs/components/ThanksSurvey'

import { getTranslations } from 'next-intl/server'

export default async function ThanksPage() {
    const t = await getTranslations('thanks')
    const cookieStore = await cookies()
    const hasSubmitted = cookieStore.get('pending_feedback_id')

    if (!hasSubmitted) {
        // redirect('/expertise')
    }

    return (
        <div className="min-h-screen pt-24 pb-12 relative overflow-hidden flex flex-col items-center md:justify-center">
            {/* Background Decorations */}
            {/* <Image
                src={Vector1}
                alt=""
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-7xl opacity-30 blur-3xl pointer-events-none"
            />
            <Image
                src={Vector2}
                alt=""
                className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-7xl opacity-30 blur-3xl pointer-events-none"
            /> */}

            <Container className="relative z-10 !p-0">
                <div className="max-w-3xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 mb-4">
                        <div className="flex justify-center">
                            <div className="bg-brand-primary/10 p-5 rounded-full ring-1 ring-brand-primary/30 relative">
                                <CheckCircle2 className="w-8 h-8 text-brand-primary" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary rounded-full animate-ping" />
                            </div>
                        </div>

                        <div className="space-y-4">

                            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto px-4">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <Link href="/">
                                <Button size="lg" className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-black px-8">
                                    <Home className="w-4 h-4 mr-2" /> {t('backToHome')}
                                </Button>
                            </Link>
                            <Link href="/brief">
                                <Button size="lg" variant="outline" className="rounded-full border-zinc-700 hover:bg-zinc-900 border-2">
                                    <LayoutPanelLeft className="w-4 h-4 mr-2" /> {t('viewTemplates')}
                                </Button>
                            </Link>
                        </div> */}
                    </div>

                    {/* Divider */}
                    {/* <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent my-16" /> */}

                    {/* Feedback Section */}
                    <div className="bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                        <ThanksSurvey />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/">
                            <Button size="lg" className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-black px-8">
                                <Home className="w-4 h-4 mr-2" /> {t('backToHome')}
                            </Button>
                        </Link>
                        <Link href="/expertise">
                            <Button size="lg" variant="outline" className="rounded-full border-zinc-700 hover:bg-zinc-900 border-2">
                                <LayoutPanelLeft className="w-4 h-4 mr-2" /> {t('viewTemplates')}
                            </Button>
                        </Link>
                    </div>

                </div>
            </Container>
        </div>
    )
}
