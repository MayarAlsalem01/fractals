import { useQuery } from '@tanstack/react-query'
import getBlogsPagintion from '../actions/getBlogsPagintion'

type UseGetBlogsOptions = {
    categoryId?: number;
    page?: number;
    limit?: number;
}

export default function useGetBlogs({ categoryId, page = 1, limit = 10 }: UseGetBlogsOptions = {}) {
    return useQuery({
        queryKey: ['blogs', categoryId, page, limit],
        queryFn: () => getBlogsPagintion({
            filter: { categoryId },
            page,
            limit
        })
    })
}
