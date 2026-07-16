import React from 'react'
import { getSession } from '@/app/api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation'
import getBriefTemplatesAction from '@/features/breifs/actions/getBriefTemplatesAction'
import TemplatesTable from '@/features/breifs/components/TemplatesTable'

export const dynamic = 'force-dynamic';

export default async function page() {
    const session = await getSession()
    if (!session) {
        redirect('/auth/sign_in')
    }

    const res = await getBriefTemplatesAction()
    const templates = res.ok && res.data ? res.data : []

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300">Brief Templates Management</h1>
                <p className="text-sm text-zinc-400">
                    Configure and manage the step-by-step templates (sections and questions) that users will fill out.
                </p>
            </div>

            {/* Glowing top line with brand gradient */}
            <div className="h-[2px] w-full bg-gradient-to-r from-brand-primary via-brand-tertiary to-brand-secondary rounded-full" />

            {/* Render table component */}
            <TemplatesTable templates={templates} />
        </div>
    )
}
