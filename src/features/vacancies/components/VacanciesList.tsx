'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Plus, Trash2 } from "lucide-react"
import deleteVacancyAction from "../actions/deleteVacancyAction"
import { toast } from "sonner"
import { Link } from "@/i18n/navigation"

export default function VacanciesList({ data }: { data: any[] }) {

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this vacancy?')) return
        const res = await deleteVacancyAction(id)
        if (res.isError) {
            toast.error(res.error?.message || 'Failed to delete')
        } else {
            toast.success('Vacancy deleted')
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Vacancies</h1>
                <Link href="/dashboard/vacancies/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Vacancy
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No vacancies found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((vacancy) => (
                                <TableRow key={vacancy.id}>
                                    <TableCell className="font-medium">{vacancy.title}</TableCell>
                                    <TableCell className="max-w-xs truncate" title={vacancy.description}>
                                        {vacancy.description}
                                    </TableCell>
                                    <TableCell>{new Date(vacancy.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={`/dashboard/vacancies/update/${vacancy.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(vacancy.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

