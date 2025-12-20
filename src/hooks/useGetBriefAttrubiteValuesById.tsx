import getBriefAttrubiteValuesByIdAction from '@/features/breifs/actions/getBriefAttrubiteValuesByIdAction'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useGetBriefAttrubiteValuesById(id: number) {
    return useQuery({
        queryKey: [id],
        queryFn: async () => {
            const data = await getBriefAttrubiteValuesByIdAction(id)
            return data
        }
    })
}
