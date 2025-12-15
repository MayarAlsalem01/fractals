// components/StepNavigator.tsx
'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Section = { key: string; title?: string }

export default function StepNavigator({
    templateSections,
    onBeforeNavigate,
    onFinal,
    successPath,
}: {
    templateSections: Section[]
    /**
     * Called before navigating. return false to prevent navigation.
     * async allowed.
     * (currentKey, nextKey, isLast) => boolean | Promise<boolean | void> | void
     */
    onBeforeNavigate?: (currentKey: string, nextKey: string | null, isLast: boolean) => Promise<boolean | void> | boolean | void
    /**
     * Called when user clicks Submit on last step. If provided, it's awaited.
     * If not provided, navigator will push `successPath` (if given), or do nothing.
     */
    onFinal?: () => Promise<void> | void
    /**
     * Optional path to navigate to after successful final submit, e.g. "/en/breif/desktop/success"
     */
    successPath?: string
}) {
    const pathname = usePathname() ?? '/'
    const router = useRouter()
    const segments = useMemo(() => pathname.split('/').filter(Boolean), [pathname])
    const lang = segments[0] ?? 'en'
    // user uses '/en/breif/[briefType]/[sectionKey]'
    const briefType = segments[2] ?? segments[1] ?? 'desktop'
    const currentSectionKey = segments[3] ?? templateSections?.[0]?.key ?? ''

    const currentIndex = Math.max(0, templateSections.findIndex(s => s.key === currentSectionKey))
    const isLast = currentIndex === templateSections.length - 1
    const prevSection = templateSections[currentIndex - 1]
    const nextSection = templateSections[currentIndex + 1]

    const makePath = (sectionKey: string | null) => {
        if (!sectionKey) return null
        return `/${lang}/breif/${briefType}/${sectionKey}`
    }

    async function handleBack() {
        if (!prevSection) return
        const target = makePath(prevSection.key)
        router.push(target!)
    }

    async function handleNext() {
        const nextKey = nextSection?.key ?? null

        if (onBeforeNavigate) {
            try {
                const result = await onBeforeNavigate(currentSectionKey, nextKey, isLast)
                if (result === false) return // cancelled by caller
            } catch (e) {
                // if callback throws, stop navigation
                console.error('onBeforeNavigate error', e)
                return
            }
        }

        if (isLast) {
            // final action
            if (onFinal) {
                try {
                    await onFinal()
                    if (successPath) router.push(successPath)
                } catch (e) {
                    console.error('onFinal error', e)
                }
            } else if (successPath) {
                router.push(successPath)
            } else {
                // nothing to do if no onFinal and no successPath
            }
            return
        }

        // navigate to next step
        const target = makePath(nextKey)
        if (target) router.push(target)
    }

    return (
        <div className="mt-6 flex items-center justify-end gap-3">
            {prevSection && (
                <button
                    type="button"
                    className="px-3 py-1 rounded border"
                    onClick={handleBack}
                >
                    Back
                </button>
            )}

            <button
                type="button"
                className="px-4 py-2 rounded bg-black text-white"
                onClick={handleNext}
            >
                {isLast ? 'Submit' : 'Next'}
            </button>
        </div>
    )
}
