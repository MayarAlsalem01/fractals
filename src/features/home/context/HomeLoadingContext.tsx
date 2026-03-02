'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface HomeLoadingContextType {
    fontsLoaded: boolean;
    videoLoaded: boolean;
    setVideoLoaded: (loaded: boolean) => void;
    isReady: boolean;
}

const HomeLoadingContext = createContext<HomeLoadingContextType | undefined>(undefined);

export function HomeLoadingProvider({ children }: { children: React.ReactNode }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        // Check if fonts are already loaded or wait for them
        if (document.fonts.status === 'loaded') {
            setFontsLoaded(true);
        } else {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
        }
    }, []);

    const isReady = useMemo(() => fontsLoaded && videoLoaded, [fontsLoaded, videoLoaded]);

    return (
        <HomeLoadingContext.Provider value={{ fontsLoaded, videoLoaded, setVideoLoaded, isReady }}>
            {children}
        </HomeLoadingContext.Provider>
    );
}

export function useHomeLoading() {
    const context = useContext(HomeLoadingContext);
    if (context === undefined) {
        throw new Error('useHomeLoading must be used within a HomeLoadingProvider');
    }
    return context;
}
