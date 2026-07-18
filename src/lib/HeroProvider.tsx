'use client'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React from "react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function HeroProvider({ children }: { children: React.ReactNode }) {
    useGSAP(() => {
        const tl = gsap.timeline()
        tl.fromTo('.animated-hero',
            {
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            },
            {
                delay: 1,
                duration: 1.8,
                ease: 'power3.out',
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

            },

        )
        tl.fromTo('.navbar', {
            y: -100,
            opacity: 0

        }, {
            y: 0,
            opacity: 1
        })
        tl.fromTo(".hero-text ",
            {
                opacity: 0,
                y: -10
            },
            {
                opacity: 1,
                y: 0,
            }, '<')
        gsap.fromTo('.animated-hero ', {
            scale: 1
        }, {
            scrollTrigger: {
                trigger: '.animated-hero',
                scrub: true,
                start: "top tpo",
                end: 'bottom center',
                // markers: true

            },
            scale: .9,
            y: 150,


        })
        gsap.fromTo('.aboutus-container ', {
            scale: .8,

        }, {
            scrollTrigger: {
                trigger: '.animated-hero',
                pin: true,
                pinSpacing: false,
                scrub: true,

            },
            scale: 1,


        })

        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.aboutus-container',
                // markers: true,
                start: "top top",
                toggleActions: "play pause resume reverse"

            }
        })

        aboutTl.fromTo('.about-title',
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
            }
        )
        aboutTl.fromTo('.about-descrption', {
            opacity: 0,
            x: -100
        }, {
            opacity: 1,
            x: 0,
        })
        aboutTl.fromTo('.about-btn', {
            opacity: 0,
            y: -10
        }, {
            opacity: 1,
            y: 0,
        })
    })



    return (

        <>
            {children}
        </>

    )
}
