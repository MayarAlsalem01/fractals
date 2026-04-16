import PdfDownloader from '@/components/PdfDownloader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/db/drizzle'
import { briefs as briefsTable } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'
import { getSession } from '@/app/api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation'
import BriefStatusToggle from '@/features/breifs/components/BriefStatusToggle'
import DashboardBriefsFilters from '@/features/breifs/components/DashboardBriefsFilters'
import { Suspense } from 'react'

interface PageProps {
    searchParams: Promise<{ status?: string }>;
}

export default async function page({ searchParams }: PageProps) {
    const session = await getSession()
    if (!session) {
        redirect('/auth/sign_in')
    }

    const { status: statusFilter } = await searchParams

    const whereClause = statusFilter && statusFilter !== 'all'
        ? eq(briefsTable.status, statusFilter)
        : undefined

    const briefs = await db.query.briefs.findMany({
        where: whereClause,
        orderBy: [desc(briefsTable.created_at)],
        with: {
            briefTemplate: true
        }
    })
    console.log(briefs)
    return (
        <div className='w-full'>
            <div className="flex flex-col gap-4 mt-4">
                <h1 className="text-2xl font-bold">Briefs Management</h1>

                <Suspense fallback={<div className="h-10 w-48 bg-zinc-900 animate-pulse rounded-lg" />}>
                    <DashboardBriefsFilters />
                </Suspense>
            </div>

            <div className='rounded-lg shadow-sm mt-8 border border-zinc-800 p-4'>
                {
                    briefs && briefs.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead>Brief Type</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right w-[150px] ">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    briefs.map((brief) => (
                                        <TableRow key={brief.id}>
                                            <TableCell className="font-medium">{brief.id}</TableCell>
                                            <TableCell>{brief.briefTemplate.name}</TableCell>
                                            <TableCell className="text-zinc-400">{brief.created_at.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <BriefStatusToggle
                                                    briefId={brief.id}
                                                    currentStatus={brief.status || 'inactive'}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right flex justify-end gap-2 text-zinc-400">
                                                <PdfDownloader briefId={brief.id} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-20 text-zinc-500 bg-zinc-950/50 rounded-xl border border-dashed border-zinc-800">
                            No briefs found for this filter.
                        </div>
                    )
                }
            </div>
        </div >
    )
}
