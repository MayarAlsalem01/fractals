'use client';

import React, { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TransparentTextAnimationProps {
    children: ReactNode;
}

/**
 * Client Component wrapper for GSAP animation.
 * It uses a container ref to scope the animation to all 'p' tags within it,
 * allowing the children to be rendered by a Server Component.
 */
export default function TransparentTextAnimation({ children }: TransparentTextAnimationProps) {
    // 1. Create a ref for the container element
    const containerRef = useRef(null);

    useGSAP(() => {
        // 2. GSAP logic is scoped to the containerRef
        //    gsap.utils.toArray finds all elements matching the selector ('p')
        //    within the specified scope (containerRef.current).
        const paragraphs = gsap.utils.toArray('p', containerRef.current);

        paragraphs.forEach((p, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    // Use the individual paragraph as the trigger
                    trigger: p as HTMLParagraphElement,
                    markers: false,
                    start: 'top 80%',
                    end: 'top 50%',
                    invalidateOnRefresh: true,
                },
            });

            tl.to(p as HTMLParagraphElement, {
                // Your original animation property
                '--tw-gradient-from-position': '100%',
                duration: 1,
            });
        });

        // Ensure ScrollTrigger refreshes after layout has potentially shifted
        // especially on pages with lots of dynamic content like the Home Page.
        ScrollTrigger.refresh();

    }, { scope: containerRef });

    // 3. Render a wrapper div with the ref and pass the Server Component children inside.
    return (
        <div ref={containerRef} className='relative'>
            {children}
        </div>
    );
}