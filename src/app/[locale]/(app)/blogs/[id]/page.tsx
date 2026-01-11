'use server'
import PlaceHolderImage from '../../../../../../public/assets/licensed-image.png'
import Image from 'next/image'
import getBlogPostById from '@/features/blog/actions/getBlogPostById'
import { notFound } from 'next/navigation'
export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blogPost = await getBlogPostById(Number(id))
    console.log(blogPost)
    if (!blogPost.isError && blogPost.data === undefined) {
        return notFound()
    }
    if (blogPost.isError) {
        return <div>error</div>
    }
    if (blogPost.data)
        return (
            <div className='w-full px-36 py-32'>

                <div className='flex  justify-center mx-auto'>
                    <div className='w-full aspect-16/7 bg-gray-700 rounded-lg relative overflow-hidden'>
                        <Image src={blogPost.data.image_url ?? PlaceHolderImage} fill alt='asd' className='w-full h-full rounded-lg object-fit ' />
                        <div className='w-full  h-full bg-black/70 absolute top-0 left-0' />
                        <div className='absolute left-0 w-full bottom-0 px-4 py-4'>
                            <p className='text-3xl font-bold text-white '>{blogPost.data.title}</p>
                            <p className=' text-white opacity-40 '>posted at : {blogPost.data.created_at.toLocaleDateString('en-GB')}</p>

                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <div dangerouslySetInnerHTML={{ __html: blogPost.data.long_description }} />

                </div>
            </div>
        )
}
