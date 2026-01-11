import { useQuery } from '@tanstack/react-query'
import getAllBlogCategories from '../actions/getAllBlogCategories'

export default function useGetAllBlogCategories() {
    return useQuery({
        queryKey: ['all-blog-categories'],
        queryFn: getAllBlogCategories,
    })
}
