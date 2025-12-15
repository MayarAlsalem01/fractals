'use client'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import React from 'react'
import deleteBlogAction from '../actions/deleteBlogAction'
import { toast } from 'sonner'

export default function DeleteBlogButton({ blogId }: { blogId: number }) {
    const { isPending, mutate } = useMutation({
        mutationFn: async (blogId: number) => {
            const res = await deleteBlogAction(blogId)
            console.log(res)
            if (res.isError)
                throw new Error(res.error?.message || 'deleted failed')
            return res
        },
        onSuccess: () => {
            toast.success(`blog with id: ${blogId} deleted`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return (
        <Button
            onClick={() => mutate(blogId)}
            disabled={isPending}
            variant="ghost" size="icon"
            className="text-red-500">
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
