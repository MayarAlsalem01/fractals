'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
    isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            // Delay unmounting to allow fade-out animation
            const timer = setTimeout(() => setShouldRender(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="relative w-32 h-32 md:w-48 md:h-48"
                    >
                        <Image
                            src="/assets/logo/loadingLogo.svg"
                            alt="Fractals Logo"
                            fill
                            className="object-contain "
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-[2px] bg-white/20 mt-8 relative overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-brand-primary w-1/2"
                        />
                    </motion.div>

                    <p className="text-white/40 font-gilory mt-4 text-sm tracking-widest uppercase">
                        Loading Excellence
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
