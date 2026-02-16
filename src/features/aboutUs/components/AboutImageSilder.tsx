'use client'
import Image, { StaticImageData } from 'next/image'
import Clinic_1 from '../../../../public/assets/latest_project/clinic_1.jpg'
import Clinic_2 from '../../../../public/assets/latest_project/clinic_2.jpg'
import Clinic_3 from '../../../../public/assets/latest_project/clinic_3.jpg'
import Clinic_4 from '../../../../public/assets/latest_project/clinic_4.jpg'
import Expert_Move_1 from '../../../../public/assets/latest_project/expert_move_1.png'
import Expert_Move_2 from '../../../../public/assets/latest_project/expert_move_2.png'
import Expert_Move_3 from '../../../../public/assets/latest_project/expert_move_3.png'
import Expert_Move_4 from '../../../../public/assets/latest_project/expert_move_4.png'
import Rideon_1 from '../../../../public/assets/latest_project/rideon_1.jpg'
import Rideon_2 from '../../../../public/assets/latest_project/rideon_2.jpg'
import Rideon_3 from '../../../../public/assets/latest_project/rideon_3.jpg'
import Chat_1 from '../../../../public/assets/latest_project/chat_1.png'
import Chat_2 from '../../../../public/assets/latest_project/chat_2.png'
import Chat_3 from '../../../../public/assets/latest_project/chat_3.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
gsap.registerPlugin(useGSAP, ScrollTrigger)

// Images grouped by project — groups stay spatially near each other but each image has its own speed
const imageGroups: { images: { src: StaticImageData; top: string; speed: number }[] }[] = [
    {
        // Clinic group
        images: [
            { src: Clinic_1, top: '18%', speed: 0 },
            { src: Clinic_2, top: '55%', speed: 2 },
            { src: Clinic_3, top: '32%', speed: 1 },
            { src: Clinic_4, top: '62%', speed: 2 },
        ],
    },
    {
        // Expert Move group
        images: [
            { src: Expert_Move_1, top: '15%', speed: 1 },
            { src: Expert_Move_2, top: '50%', speed: 0 },
            { src: Expert_Move_3, top: '28%', speed: 2 },
            { src: Expert_Move_4, top: '60%', speed: 1 },
        ],
    },
    {
        // Rideon group
        images: [
            { src: Rideon_1, top: '20%', speed: 2 },
            { src: Rideon_2, top: '55%', speed: 0 },
            { src: Rideon_3, top: '35%', speed: 1 },
        ],
    },
    {
        // Chat group
        images: [
            { src: Chat_1, top: '22%', speed: 1 },
            { src: Chat_2, top: '52%', speed: 2 },
            { src: Chat_3, top: '38%', speed: 0 },
        ],
    },
]

// Flatten groups into a flat list with pre-calculated x offsets
const withinGroupSpacing = 18; // vw — tight spacing within a group
const betweenGroupGap = 25;    // vw — smaller gap so groups overlap in time

const sliderImages: { src: StaticImageData; top: string; speed: number; offsetVw: number }[] = []
let cursor = 0;
imageGroups.forEach((group, gi) => {
    if (gi > 0) cursor += betweenGroupGap;
    group.images.forEach((img, ii) => {
        if (ii > 0) cursor += withinGroupSpacing;
        sliderImages.push({ ...img, offsetVw: cursor });
    });
});

export default function AboutImageSilder() {
    const containerRef = useRef(null)

    useGSAP(() => {
        const images = gsap.utils.toArray<HTMLElement>(".image");
        const exitX = -130; // vw — just past the left edge of the viewport

        // Speed tiers in vw/s
        const speedValues = [10, 14, 18]; // slow, medium, fast

        // Position each image using its pre-calculated group offset
        images.forEach((img, i) => {
            gsap.set(img, { x: `${sliderImages[i].offsetVw}vw` })
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
            },
            repeat: -1,
        });

        images.forEach((img, i) => {
            const config = sliderImages[i];
            const distance = config.offsetVw - exitX; // total travel in vw
            const speed = speedValues[config.speed];
            const duration = distance / speed;

            tl.to(img, {
                x: `${exitX}vw`,
                duration,
                ease: 'none',
            }, 0)
        });
    }, [])

    return (
        <div className='mt-8'>
            <TransparentTextAnimation>
                <p className='font-gravesend text-4xl md:text-7xl w-fit mx-auto font-bold bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90%'>
                    Our Latest Projects
                </p>
            </TransparentTextAnimation>
            <div ref={containerRef} className='h-screen flex justify-start items-center relative overflow-hidden pointer-events-none'>
                {sliderImages.map((img, i) => (
                    <Image
                        key={i}
                        src={img.src}
                        alt=''
                        className='image w-[15rem] h-[10rem] md:w-[25rem] md:h-[15rem] object-cover absolute rounded-lg'
                        style={{ top: img.top, left: '100%' }}
                    />
                ))}
            </div>
        </div>
    )
}
