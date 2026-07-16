'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddStepDialog from './AddStepDialog'
import AddFieldDialog from './AddFieldDialog'
import EditFieldDialog from './EditFieldDialog'
import AttributeCard from './AttributeCard'
import { Section } from '../types'

interface TemplateStepsTabsProps {
    sections: Section[];
    templateId: number;
}

export default function TemplateStepsTabs({ sections, templateId }: TemplateStepsTabsProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-200">Template Steps & Fields</h2>
                    <p className="text-xs text-zinc-500">Configure steps and click on individual fields to edit details or sort order.</p>
                </div>
                {/* Add Step Action */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400 font-medium">Add Step</span>
                    <AddStepDialog templateId={templateId} />
                </div>
            </div>

            {sections.length > 0 ? (
                <Tabs defaultValue={sections[0].id.toString()} className="w-full">
                    <div className="flex items-center mb-6">
                        <TabsList className="bg-zinc-950 border border-zinc-800 p-1 flex-wrap h-auto gap-1">
                            {sections.map((section) => (
                                <TabsTrigger
                                    key={section.id}
                                    value={section.id.toString()}
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary/20 data-[state=active]:to-brand-secondary/20 data-[state=active]:text-zinc-100 border border-transparent data-[state=active]:border-brand-primary/30 text-xs px-3 py-1.5 transition-all"
                                >
                                    {section.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {sections.map((section) => (
                        <TabsContent key={section.id} value={section.id.toString()} className="space-y-4 outline-none focus-visible:outline-none">
                            <div className="rounded-xl border border-zinc-800/85 bg-zinc-950/10 p-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                                    <div>
                                        <h3 className="text-md font-semibold text-zinc-200">{section.title}</h3>
                                        <p className="text-xs text-zinc-500 font-mono">Key: {section.key} | Position: {section.position}</p>
                                    </div>
                                    {/* Add Field Button */}
                                    <AddFieldDialog sectionId={section.id} templateId={templateId} />
                                </div>

                                {section.attributes && section.attributes.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.attributes.map((attr) => (
                                            <EditFieldDialog key={attr.id} attribute={attr} templateId={templateId}>
                                                <div>
                                                    <AttributeCard attr={attr} />
                                                </div>
                                            </EditFieldDialog>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-zinc-500 bg-zinc-950/40 rounded-lg border border-dashed border-zinc-800">
                                        No fields configured for this step. Click "Add Field" above to configure some.
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            ) : (
                <div className="text-center py-16 text-zinc-500 bg-zinc-950/30 rounded-xl border border-dashed border-zinc-800">
                    No steps configured for this template yet. Click the "+" button at the top right to add a step.
                </div>
            )}
        </div>
    )
}
