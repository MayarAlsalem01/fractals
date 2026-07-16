import React from 'react'
import { Badge } from '@/components/ui/badge'
import { brief_templates } from '@/db/schema'

interface TemplateHeaderCardProps {
    template: typeof brief_templates.$inferSelect;
}

export default function TemplateHeaderCard({ template }: TemplateHeaderCardProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/10 via-brand-tertiary/5 to-brand-secondary/15 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-2xl -z-10" />
            
            <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300">
                        {template.name}
                    </h1>
                    <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary bg-brand-primary/5 text-xs">
                        v{template.version}
                    </Badge>
                    {template.is_active ? (
                        <Badge className="bg-green-500/10 text-green-400 border border-green-500/25">
                            Active
                        </Badge>
                    ) : (
                        <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700">
                            Inactive
                        </Badge>
                    )}
                </div>
                <p className="text-zinc-400 text-sm max-w-2xl">{template.description || "No description provided."}</p>
            </div>

            <div className="text-xs text-zinc-500 font-mono bg-zinc-950/40 px-3 py-1.5 rounded-lg border border-zinc-800/80">
                Created: {template.created_at.toLocaleDateString()}
            </div>
        </div>
    )
}
