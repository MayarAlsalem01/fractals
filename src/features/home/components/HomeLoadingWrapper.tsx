'use client';

import React from 'react';
import { HomeLoadingProvider, useHomeLoading } from '../context/HomeLoadingContext';
import LoadingScreen from '@/ui/LoadingScreen';

function LoadingStateContainer({ children }: { children: React.ReactNode }) {
    const { isReady } = useHomeLoading();

    return (
        <>
            <LoadingScreen isVisible={!isReady} />
            <div className={isReady ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
                {children}
            </div>
        </>
    );
}

export default function HomeLoadingWrapper({ children }: { children: React.ReactNode }) {
    return (
        <HomeLoadingProvider>
            <LoadingStateContainer>
                {children}
            </LoadingStateContainer>
        </HomeLoadingProvider>
    );
}
