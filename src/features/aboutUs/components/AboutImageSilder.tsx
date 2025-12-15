'use client'
import Image, { StaticImageData } from 'next/image'
import Image1 from '../../../../public/assets/aboutus/small flag.png'
import Image2 from '../../../../public/assets/aboutus/2.png'
import Image3 from '../../../../public/assets/aboutus/4.png'
import Image4 from '../../../../public/assets/aboutus/5.png'
import Image5 from '../../../../public/assets/aboutus/11.png'
import Image6 from '../../../../public/assets/aboutus/Mousepad_2.jpg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AboutImageSilder() {
    const containerRef = useRef(null)
    useGSAP(() => {
        let targets = gsap.utils.toArray(".image");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center'
            },
            repeat: -1,
        });
        targets.forEach((target, index) => {
            console.log(index)
            tl.to(target!, {

                x: '-350vw',
                duration: index === 2 || index === 5 ? 20 : 25,
                ease: 'none',
            }, 0

            )
        })

    }, [])
    return (

        <div ref={containerRef} className='h-screen flex justify-start items-center relative overflow-hidden pointer-events-none '>
            <ImageSlider src={Image1} alt='' className={`
                               object-cover absolute top-1/2 -translate-y-1/2  rounded-lg 
                            left-full
                            `} />
            <ImageSlider src={Image2} alt='' className={`
                              object-cover absolute top-1/3 -translate-y-1/2  rounded-lg 
                            left-[calc(100%_+_30rem)]
                            `} />
            <ImageSlider src={Image3} alt='' className={`
                              object-cover absolute top-1/2 -translate-y-1/6  rounded-lg 
                            left-[calc(100%_+_60rem)]
                            
                            `} />
            <ImageSlider src={Image4} alt='' className={`
                              object-cover absolute top-1/2 -translate-y-1/3  rounded-lg 
                            left-[calc(100%_+_90rem)]
                            `} />
            <ImageSlider src={Image5} alt='' className={`
                              object-cover absolute top-1/2 -translate-y-1/2  rounded-lg 
                            left-[calc(100%_+_120rem)]
                            `} />
            <ImageSlider src={Image6} alt='' className={`
                              object-cover absolute top-1/3 -translate-y-1/2  rounded-lg 
                            left-[calc(100%_+_150rem)]
                            `} />

        </div>

    )
}
function ImageSlider({ src, alt, className }: { src: StaticImageData, alt: string, className?: string }) {
    return <Image src={src} alt={alt} className={`
                            image w-[15rem] h-[10rem] md:w-[25rem] md:h-[15rem]  object-cover  ${className}
                            `} />
}
