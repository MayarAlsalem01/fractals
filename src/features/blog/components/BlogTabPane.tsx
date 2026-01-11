'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode, useState } from 'react'
import Image from 'next/image'
import SecondryButton from '@/ui/SecondryButton'
import useGetAllBlogCategories from '@/features/blogCategory/hooks/useGetAllBlogCategories'
import { Skeleton } from '@/components/ui/skeleton'
import useGetBlogs from '@/features/blogCategory/hooks/useGetBlogs'
import { Link } from '@/i18n/navigation'

export default function BlogTabPane({ limit }: { limit?: number }) {
    const [activeTab, setActiveTab] = useState('all')
    const { data: categories } = useGetAllBlogCategories()

    const selectedCategoryId = activeTab === 'all' ? undefined : Number(activeTab)

    const { data: blogsData, isLoading: isBlogsLoading } = useGetBlogs({ categoryId: selectedCategoryId, limit: limit })

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className=' items-end  '  >
            <TabsList className='  border border-accent rounded-4xl bg-transparent h-fit flex-wrap !justify-start px-3 gap-2 py-2  backdrop-blur-sm relative z-40'>
                <BlogTabsTrigger value="all">All</BlogTabsTrigger>
                {categories?.data?.map((category) => (
                    <BlogTabsTrigger key={category.id} value={String(category.id)}>
                        {category.name}
                    </BlogTabsTrigger>
                ))}
            </TabsList>
            <TabsContent value={activeTab} className='w-full '>
                <BlogsGrid>
                    {isBlogsLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className='gap-3 overflow-hidden z-30'>
                                <CardHeader>
                                    <Skeleton className="h-48 w-full rounded-2xl" />
                                    <Skeleton className="h-4 w-3/4 mt-4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mt-2" />
                                    <Skeleton className="h-4 w-5/6 mt-2" />
                                </CardContent>
                            </Card>
                        ))
                    ) : blogsData?.blogs.length === 0 ? (
                        <div className="col-span-full text-center py-10 opacity-70">
                            No blogs found in this category.
                        </div>
                    ) : (
                        blogsData?.blogs.map((blog, i) => (
                            <div key={blog.id} className={limit && i >= 3 ? 'hidden md:block' : ''}>
                                <BlogCard
                                    title={blog.title}
                                    text={blog.short_description}
                                    image={blog.image_url}
                                    id={blog.id}
                                    createdAt={blog.created_at}
                                />
                            </div>
                        ))
                    )}
                </BlogsGrid>
            </TabsContent>
        </Tabs>
    )
}

function BlogTabsTrigger({ value, children }: { value: string, children: ReactNode }) {
    return (
        <TabsTrigger value={value} className='rounded-4xl flex-none'>{children}</TabsTrigger>

    )
}
function BlogsGrid({ children }: { children: ReactNode }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {children}
        </div>
    )
}
export function BlogCard({ title, text, image, id, createdAt }: { title: string, text: string, image: string, id: number, createdAt: Date }) {
    return (
        <Card className=' w-full relative bg-transparent gap-3 overflow-hidden z-30'>

            <CardHeader >
                <div className="relative w-full h-48 rounded-2xl overflow-hidden z-40 opacity-90">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className='object-cover'
                    />
                </div>
                <CardTitle>
                    <p className='text-lg font-bold line-clamp-2'>{title}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='opacity-80 leading-relaxed line-clamp-3'>
                    {
                        text
                    }
                </p>
            </CardContent>
            <CardFooter className='flex flex-col items-end gap-1'>
                <SecondryButton className='z-50'>
                    <Link href={`/blogs/${id}`}>Read More</Link>
                </SecondryButton>

                <p className='text-xs opacity-50 self-start'>last updated: {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.round((createdAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 'day')}</p>
            </CardFooter>

            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 -translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-primary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-secondary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 -translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-primary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-secondary to-black blur-3xl' />
        </Card>
    )
}