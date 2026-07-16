import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings } from 'lucide-react'
import { brief_templates } from '@/db/schema'

interface TemplatesTableProps {
    templates: (typeof brief_templates.$inferSelect)[];
}

export default function TemplatesTable({ templates }: TemplatesTableProps) {
    return (
        <div className="rounded-xl border border-zinc-800/80 p-4 bg-zinc-950/20 backdrop-blur-md shadow-lg">
            {
                templates && templates.length > 0 ? (
                    <Table>
                        <TableHeader className="border-b border-zinc-850">
                            <TableRow className="hover:bg-transparent border-zinc-800">
                                <TableHead className="w-[80px] text-zinc-400 font-medium">ID</TableHead>
                                <TableHead className="text-zinc-400 font-medium">Template Name</TableHead>
                                <TableHead className="text-zinc-400 font-medium">Description</TableHead>
                                <TableHead className="text-zinc-400 font-medium">Version</TableHead>
                                <TableHead className="text-zinc-400 font-medium">Status</TableHead>
                                <TableHead className="text-right w-[180px] text-zinc-400 font-medium">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                templates.map((template) => (
                                    <TableRow key={template.id} className="border-zinc-850 hover:bg-zinc-900/20 transition-all duration-200">
                                        <TableCell className="font-semibold text-zinc-400">{template.id}</TableCell>
                                        <TableCell className="font-bold text-zinc-200">{template.name}</TableCell>
                                        <TableCell className="text-zinc-450 max-w-md truncate">{template.description || '-'}</TableCell>
                                        <TableCell className="text-zinc-450">
                                            <Badge variant="outline" className="border-brand-primary/20 text-brand-secondary bg-brand-primary/5">
                                                v{template.version}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {template.is_active ? (
                                                <Badge className="bg-green-500/10 text-green-400 border border-green-500/20">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-zinc-800 text-zinc-450 border border-zinc-700">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm" className="border-brand-primary/20 hover:border-brand-primary/50 bg-zinc-950 text-zinc-300 hover:text-zinc-100 hover:bg-brand-primary/10 gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
                                                <Link href={`/dashboard/briefs-mangment/${template.id}`}>
                                                    <Settings className="h-4 w-4 text-brand-secondary" />
                                                    <span>Manage Steps</span>
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-20 text-zinc-500 bg-zinc-950/50 rounded-xl border border-dashed border-zinc-800">
                        No brief templates found in the database.
                    </div>
                )
            }
        </div>
    )
}
