'use client'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import React from 'react'
import deleteCategoryAction from '../actions/deleteCategoryAction'
import { toast } from 'sonner'

export default function DeleteCategoryButton({ categoryId }: { categoryId: number }) {
    const { isPending, mutate } = useMutation({
        mutationFn: async (categoryId: number) => {
            const res = await deleteCategoryAction(categoryId)
            if (res.isError)
                throw new Error(res.error?.message || 'deleted failed')
            return res
        },
        onSuccess: () => {
            toast.success(`Category deleted successfully`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return (
        <Button
            onClick={() => mutate(categoryId)}
            disabled={isPending}
            variant="ghost" size="icon"
            className="text-red-500">
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
