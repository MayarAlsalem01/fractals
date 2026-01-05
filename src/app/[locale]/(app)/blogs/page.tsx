import BlogTabPane from '@/features/blog/components/BlogTabPane'
import Image from 'next/image'
import Vc from '../../../../../public/assets/vectors/Artboard 1 copy.png'
export default function page() {
    return (
        <section className='px-4 xl:px-32 py-28 relative'>
            <div className='hidden absolute md:flex justify-end overflow-hidden top-0 right-0'>
                <Image src={Vc} alt='' className='w-1/2 relative z-30 right-[-28%]  2xl:right-[-35%] opacity-80 -top-12 blur-xl' />
            </div>
            <div className='hidden absolute md:flex  overflow-hidden top-0 right-0'>
                <Image src={Vc} alt='' className='w-1/2 relative z-30 left-[-25%]  rotate-[130deg] opacity-80 -top-32 lg:-top-56 xl:-top-72 blur-xl' />
            </div>
            <h1 className='text-7xl uppercase font-bold mx-auto w-fit opacity-70 mix-blend-overlay'>Blogs</h1>
            <BlogTabPane />
        </section>
    )
}
