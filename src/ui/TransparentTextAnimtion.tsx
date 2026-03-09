'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAnimate, inView } from 'framer-motion';

interface TransparentTextAnimationProps {
    children: ReactNode;
}

/**
 * Client Component wrapper for Framer Motion animation.
 * It uses useAnimate to scope the animation to all 'p' tags within its children,
 * mimicking the original GSAP ScrollTrigger behavior.
 */
export default function TransparentTextAnimation({ children }: TransparentTextAnimationProps) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!scope.current) return;

        // Find all 'p' tags within the scoped container
        const paragraphs = scope.current.querySelectorAll('p');

        paragraphs.forEach((p: HTMLParagraphElement) => {
            // Use inView to trigger the animation when the paragraph enters the viewport.
            // Adjust margin to match the GSAP 'start: top 80%' and 'end: top 50%' logic as closely as possible.
            inView(p, () => {
                animate(p, {
                    // @ts-ignore - CSS variables are supported but might not be in the base types
                    '--tw-gradient-from-position': '100%',
                }, {
                    duration: 1,
                    ease: "easeOut"
                });
            }, {
                // margin: "top right bottom left"
                // This margin shrinks the trigger area from the bottom, 
                // effectively triggering when the element is further up the screen.
                margin: "0px 0px -20% 0px"
            });
        });
    }, [scope, animate]);

    return (
        <div ref={scope} className='relative'>
            {children}
        </div>
    );
}
