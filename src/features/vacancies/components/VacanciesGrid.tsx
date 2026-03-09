'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import getVacanciesPaginationAction from '../actions/getVacanciesPaginationAction'
import VacancyCard from './VacancyCard'
import { Vacancy } from '@/db/schema'
import { Loader2 } from 'lucide-react'
import { PaginationResult } from '@/types/result'

interface VacanciesGridProps {
    initialData?: Vacancy[];
    initialPagination?: PaginationResult<Vacancy[]>['pagination'];
}

export default function VacanciesGrid({ initialData = [], initialPagination }: VacanciesGridProps) {
    const [vacancies, setVacancies] = useState<Vacancy[]>(initialData)
    const [page, setPage] = useState(initialPagination?.current || 1)
    const [hasMore, setHasMore] = useState(initialPagination ? initialPagination.current < initialPagination.pages : false)
    const [loading, setLoading] = useState(false)

    // Helper to load more
    const loadMore = async () => {
        if (loading || !hasMore) return
        setLoading(true)
        const nextPage = page + 1
        const res = await getVacanciesPaginationAction(nextPage)

        if (!res.isError && res.data) {
            setVacancies(prev => [...prev, ...res.data!.data])
            setPage(nextPage)
            setHasMore(nextPage < res.data!.pagination.pages)
        }
        setLoading(false)
    }

    // If no initial data was passed, we might want to fetch on mount, 
    // but typically we'll pass initial data from the server page.
    // For now assuming initialData is always provided or empty.

    return (
        <div id='vacancies' className='flex flex-col gap-8 items-center w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full relative'>
                {vacancies.map((vacancy) => (
                    <VacancyCard
                        key={vacancy.id}
                        id={vacancy.id}
                        title={vacancy.title}
                        description={vacancy.description}
                        createdAt={new Date(vacancy.created_at)}
                    />
                ))}
            </div>

            {hasMore && (
                <Button
                    onClick={loadMore}
                    disabled={loading}
                    variant="outline"
                    className="mt-4 min-w-[150px]"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {loading ? 'Loading...' : 'Load More'}
                </Button>
            )}

            {!loading && vacancies.length === 0 && (
                <p className="text-muted-foreground text-center py-10">No vacancies open at the moment.</p>
            )}
        </div>
    )
}
