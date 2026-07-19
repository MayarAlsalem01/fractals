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
import { useTranslations } from 'next-intl'

export default function BlogTabPane({ limit }: { limit?: number }) {
    const t = useTranslations('blog')
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
                            {t('notFound')}
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
                                    category={blog.category.name}
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
export function BlogCard({ title, text, image, id, createdAt, category }: { title: string, text: string, image: string, id: number, createdAt: Date, category: string }) {
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
                <div className='w-full flex items-center justify-between z-50'>
                    <p className='text-transparent bg-clip-text text- bg-linear-to-r from-brand-primary to-brand-secondary font-bold uppercase text-xs'>{category}</p>
                    <SecondryButton >
                        <Link href={`/blogs/${id}`}>Read More</Link>
                    </SecondryButton>
                </div>

                <p className='text-xs opacity-50 self-start'>last updated: {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.round((createdAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 'day')}</p>
            </CardFooter>
            <div className='absolute inset-x-[-25%] top-1/2 -translate-y-1/2 w-2/3 aspect-square rounded-full bg-brand-primary/60  blur-[100px] -z-10' />
            <div className='absolute inset-x-[80%] -top-12 w-2/3 aspect-square rounded-full bg-brand-secondary/60  blur-[100px] -z-10' />
            <div className='absolute inset-x-full -translate-x-1/2 bottom-[-40%] w-2/3 aspect-square rounded-full bg-brand-tertiary/60  blur-3xl -z-10' />
        </Card>
    )
}