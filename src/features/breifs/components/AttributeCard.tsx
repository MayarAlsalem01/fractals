import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Edit3 } from 'lucide-react'
import { Attr } from '../types'

interface AttributeCardProps {
    attr: Attr;
}

export default function AttributeCard({ attr }: AttributeCardProps) {
    return (
        <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/20 hover:bg-gradient-to-br hover:from-brand-primary/5 hover:to-brand-secondary/5 hover:border-brand-primary/40 flex flex-col justify-between gap-3 group transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-sm relative overflow-hidden h-full">
            {/* Brand colored accent strip on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors">
                        {attr.label}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <Badge variant="secondary" className="bg-zinc-850 text-zinc-400 border border-zinc-800 text-[10px] uppercase font-mono px-1.5 py-0 group-hover:border-brand-secondary/30 transition-all">
                            {attr.type}
                        </Badge>
                        {attr.required ? (
                            <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] px-1 py-0 shrink-0">
                                Required
                            </Badge>
                        ) : (
                            <Badge className="bg-zinc-950 text-zinc-500 border border-zinc-800 text-[10px] px-1 py-0 shrink-0">
                                Optional
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono flex items-center justify-between">
                    <span>Key: {attr.key} | Width: {attr.width || 'medium'}</span>
                    <span className="text-[10px] text-brand-secondary font-semibold bg-brand-secondary/5 border border-brand-secondary/10 px-1.5 py-0.2 rounded shrink-0">
                        Pos: {attr.position}
                    </span>
                </div>
            </div>

            {/* Options list */}
            {attr.options && (
                <div className="pt-2 border-t border-zinc-800/60 group-hover:border-brand-primary/20 transition-all">
                    <span className="text-[10px] text-zinc-500 font-semibold block mb-1">Options:</span>
                    <div className="flex flex-wrap gap-1">
                        {(() => {
                            try {
                                const parsed = typeof attr.options === 'string' ? JSON.parse(attr.options) : attr.options;
                                if (Array.isArray(parsed)) {
                                    return parsed.map((opt: any, i: number) => (
                                        <Badge key={i} variant="outline" className="border-zinc-800 group-hover:border-brand-secondary/20 text-zinc-400 text-[10px] px-1.5 bg-zinc-950/80">
                                            {opt.label || opt.value || opt}
                                        </Badge>
                                    ));
                                }
                            } catch (e) {
                                return <span className="text-[10px] text-zinc-500">Error parsing options</span>;
                            }
                            return <span className="text-[10px] text-zinc-500">None</span>;
                        })()}
                    </div>
                </div>
            )}

            {/* Click-to-edit indicator */}
            <div className="flex justify-end pt-1">
                <span className="text-[10px] text-zinc-500 group-hover:text-brand-secondary font-medium flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="h-3 w-3" />
                    <span>Click to Edit</span>
                </span>
            </div>
        </div>
    )
}
