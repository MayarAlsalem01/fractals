'use client'

import { useCallback, useState } from "react";

/**
 * useColorList Hook
 * 
 * Manages the color list state with add and remove operations.
 * Designed to work seamlessly with React Hook Form.
 */

interface UseColorListReturn {
    colors: string[];
    addColor: (color: string) => void;
    removeColor: (index: number) => void;
    clearColors: () => void;
    setColors: (colors: string[]) => void;
}

export function useColorList(initialColors: string[] = []): UseColorListReturn {
    const [colors, setColors] = useState<string[]>(initialColors);

    const addColor = useCallback((color: string) => {
        const normalizedColor = color.toUpperCase();
        setColors((prev) => {
            // Prevent duplicates
            if (prev.includes(normalizedColor)) {
                return prev;
            }
            return [...prev, normalizedColor];
        });
    }, []);

    const removeColor = useCallback((index: number) => {
        setColors((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const clearColors = useCallback(() => {
        setColors([]);
    }, []);

    return {
        colors,
        addColor,
        removeColor,
        clearColors,
        setColors,
    };
}
