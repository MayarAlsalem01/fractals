'use client';

import React, { useRef, useEffect } from 'react';
import { useHomeLoading } from '../context/HomeLoadingContext';

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setVideoLoaded } = useHomeLoading();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlayThrough = () => {
            setVideoLoaded(true);
        };

        // If video is already ready
        if (video.readyState >= 4) {
            setVideoLoaded(true);
        }

        video.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, [setVideoLoaded]);

    return (
        <div className='absolute -top-0 h-screen w-full overflow-hidden -z-20 object-cover'>
            <div className='w-full h-full relative brightness-[80%]'>
                <video
                    ref={videoRef}
                    className='h-full object-cover scale-[1] md:ccale-[1.5] xl:scale-110 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full'
                    playsInline
                    src='/videos/heroVideo.mp4'
                    preload='auto'
                    autoPlay
                    controls={false}
                    muted
                    loop
                />
            </div>
        </div>
    );
}
