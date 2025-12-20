import PdfDonwloader from '@/components/PdfDownloader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/db/drizzle'
import { briefs as briefsTable } from '@/db/schema'
import getBlogsAction from '@/features/blog/actions/getBlogsAction'
import { desc } from 'drizzle-orm'
import dynamic from 'next/dynamic'

export default async function page() {
    const briefs = await db.query.briefs.findMany({
        orderBy: [desc(briefsTable.created_at)],
        with: {
            briefTemplate: true
        }
    })

    return (
        <div className='w-full'>

            <div className='rounded-lg shadow-sm mt-8'>

                {
                    briefs && briefs.length > 0 && <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>brief type</TableHead>
                                <TableHead>created_at</TableHead>
                                <TableHead className="text-right w-[200px] ">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {
                                briefs.map((brief) => <TableRow key={brief.id}>
                                    <TableCell className="font-medium">{brief.id}</TableCell>
                                    <TableCell>{brief.briefTemplate.name}</TableCell>
                                    <TableCell>{brief.created_at.toLocaleString()}</TableCell>
                                    <TableCell className="text-right flex justify-end">
                                        <PdfDonwloader briefId={brief.id} />
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                }
            </div>
        </div >
    )
}
