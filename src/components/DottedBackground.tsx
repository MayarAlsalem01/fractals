"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function DotBackgroundDemo({ children, className }: { children: ReactNode, className?: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const glowBlurRef = useRef<HTMLDivElement | null>(null);
    const glowSharpRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const blur = glowBlurRef.current;
        const sharp = glowSharpRef.current;
        if (!container || !blur || !sharp) return;

        // radius of the glow circle in px (tweakable)
        const RADIUS = 120;

        function handlePointerMove(e: PointerEvent) {
            const rect = container!.getBoundingClientRect();
            const x = Math.round(e.clientX - rect.left);
            const y = Math.round(e.clientY - rect.top);

            // Build mask strings centered on the pointer coordinates.
            // We make two masks: one for the soft/blur layer (bigger) and one for the sharp layer (smaller).
            const sharpMask = `radial-gradient(circle at ${x}px ${y}px, rgba(0,0,0,0.95) 0px, rgba(0,0,0,0.6) ${Math.round(
                RADIUS * 0.5
            )}px, transparent ${RADIUS}px)`;

            const blurMask = `radial-gradient(circle at ${x}px ${y}px, rgba(0,0,0,0.95) 0px, rgba(0,0,0,0.6) ${Math.round(
                RADIUS * 0.8
            )}px, transparent ${Math.round(RADIUS * 1.6)}px)`;

            // Apply mask (with webkit fallback)
            sharp!.style.webkitMaskImage = sharpMask;
            sharp!.style.maskImage = sharpMask;

            blur!.style.webkitMaskImage = blurMask;
            blur!.style.maskImage = blurMask;

            // show overlays (they fade via CSS)
            blur!.style.opacity = "1";
            sharp!.style.opacity = "1";
        }

        function handlePointerLeave() {
            // hide overlays (they will fade thanks to CSS transitions)
            blur!.style.opacity = "0";
            sharp!.style.opacity = "0";
        }

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerleave", handlePointerLeave);
        container.addEventListener("pointerdown", handlePointerMove); // in case of touch press
        container.addEventListener("touchmove", (ev: any) => {
            // also support touch (use first touch)
            if (ev.touches && ev.touches[0]) {
                const t = ev.touches[0];
                handlePointerMove(new PointerEvent("pointermove", { clientX: t.clientX, clientY: t.clientY }));
            }
        });

        return () => {
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex h-fit w-full items-center justify-center bg-white dark:bg-black select-none",
            )}
        >
            {/* base dot pattern (non-glowing) */}
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#40404082_1px,transparent_1px)]"
                )}
                aria-hidden
            />

            {/* blurred, soft glow layer (bigger halo) */}
            <div
                ref={glowBlurRef}
                aria-hidden
                style={{
                    // same dot pattern but with a warm glow color; blurred to make a halo
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage: "radial-gradient(circle at 0 0, #000, transparent)", // initial placeholder
                    maskImage: "radial-gradient(circle at 0 0, #000, transparent)",
                }}
                className={cn(
                    "pointer-events-none absolute inset-0 filter blur-[6px] opacity-0 transition-[opacity] duration-300",
                    // subtle blend for dark mode as well
                    "mix-blend-screen dark:mix-blend-screen"
                )}
            />

            {/* sharp glowing dots inside the circle (crisp) */}
            <div
                ref={glowSharpRef}
                aria-hidden
                style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage: "radial-gradient(circle at 0 0, #000, transparent)",
                    maskImage: "radial-gradient(circle at 0 0, #000, transparent)",
                }}
                className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-[opacity] duration-200"
                )}
            />

            {/* optional content on top */}
            <div className={cn("relative z-10  w-full", className)}>
                {children}
            </div>
        </div>
    );
}
