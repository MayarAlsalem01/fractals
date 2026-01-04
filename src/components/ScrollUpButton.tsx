'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Arrow from '../../public/assets/scrollArrow.png'
export default function ScrollUpButton() {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        // Function to check the scroll position and update the state
        const handleScroll = () => {
            // Use window.scrollY or window.pageYOffset
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // Update showButton state based on the scroll position
            if (scrollPosition > 0) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    // Optional: Function to smoothly scroll back to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    };
    return (
        <div className={`rounded-full w-12 h-12 fixed bottom-5 left-12 bg-brand-primary/0 backdrop-blur-3xl z-50 cursor-pointer transition-opacity ${showButton ? 'opacity-100' : "opacity-0 pointer-events-none"}`} onClick={scrollToTop}
        >
            <Image src={Arrow} alt='Up Arrow' />
        </div>
    )
}
