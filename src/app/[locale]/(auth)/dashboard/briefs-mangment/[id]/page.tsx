import React from 'react'
import { getSession } from '@/app/api/auth/[...nextauth]/auth'
import { redirect, notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import getBriefTemplateByIdAction from '@/features/breifs/actions/getBriefTemplateByIdAction'
import getBriefSectionsAction from '@/features/breifs/actions/getBriefSectionsAction'
import TemplateHeaderCard from '@/features/breifs/components/TemplateHeaderCard'
import TemplateStepsTabs from '@/features/breifs/components/TemplateStepsTabs'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
    const session = await getSession()
    if (!session) {
        redirect('/auth/sign_in')
    }

    const { id } = await params
    const templateId = Number(id)

    if (isNaN(templateId)) {
        return notFound()
    }

    // Fetch the brief template using the extracted action
    const templateRes = await getBriefTemplateByIdAction(templateId)
    const template = templateRes.ok ? templateRes.data : undefined

    if (!template) {
        return notFound()
    }

    // Fetch sections and their attributes using the action
    const sections = await getBriefSectionsAction(templateId)

    return (
        <div className="w-full space-y-6">
            {/* Back Button */}
            <div>
                <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 gap-1.5 -ml-3 hover:bg-zinc-900/60 transition-all">
                    <Link href="/dashboard/briefs-mangment">
                        <ArrowLeft className="h-4 w-4 text-brand-secondary" />
                        <span>Back to Templates</span>
                    </Link>
                </Button>
            </div>

            {/* Template Header Card Component */}
            <TemplateHeaderCard template={template} />

            {/* Template Steps & Tabs Component */}
            <TemplateStepsTabs sections={sections} templateId={templateId} />
        </div>
    )
}
