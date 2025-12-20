import React, { ReactNode } from 'react'
import Vc1 from '../../../../../public/assets/vectors/bfd8621ed5e1c9f605a25f6d00122b6ff6f69c5b.png'
import Vc2 from '../../../../../public/assets/vectors/Artboard 1 copy.png'
import Image from 'next/image'
export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className='relative overflow-hidden'>

            <Image src={Vc1} alt='breif ' className='absolute -top-1/3 md:-top-1/4 lg:-top-1/2 xl:-top-1/2 -left-1/2   md:-left-1/4 w-full md:w-2/3 xl:w-1/2  object-cover -rotate-[115deg] -z-10' />
            <Image src={Vc2} alt='breif ' className='absolute -right-1/2 md:-right-1/3 lg:-right-1/6  -bottom-1/6  md:bottom-24 lg:-bottom-1/4 xl:-bottom-1/3  w-full md:w-2/3 xl:w-1/2 object-cover rotate-[55deg] -z-10' />

            {children}
        </div>
    )
}
