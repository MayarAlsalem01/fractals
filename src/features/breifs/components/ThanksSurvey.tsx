'use client'

import React, { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Loader2, Smile, Meh, Frown, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import submitBriefFeedbackAction from '../actions/submitBriefFeedbackAction'
import { toast } from 'sonner'
import { Link } from '@/i18n/navigation'

import { useTranslations } from 'next-intl'



const ratings = [
    { value: 'very_hard', label: 'very_hard' as const, color: 'text-zinc-400' },
    { value: 'hard', label: 'hard' as const, color: 'text-zinc-400' },
    { value: 'neutral', label: 'neutral' as const, color: 'text-zinc-400' },
    { value: 'easy', label: 'easy' as const, color: 'text-zinc-400' },
    { value: 'very_easy', label: 'very_easy' as const, color: 'text-zinc-400' },
]

export default function ThanksSurvey() {
    const t = useTranslations('thanks.survey')
    const [selected, setSelected] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleRating = (value: string) => {
        setSelected(value)
        startTransition(async () => {
            const res = await submitBriefFeedbackAction(value)
            if (res.ok) {
                setIsSubmitted(true)
                toast.success(t('appreciate'))
            } else {
                toast.error(res.error?.message || 'Failed to submit feedback')
            }
        })
    }

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="flex justify-center">
                    <div className="bg-green-500/10 p-3 rounded-full">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white">{t('appreciate')}</h2>
                <p className="text-zinc-400">{t('improve')}</p>
                <div className="pt-6">
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            {t('returnHome')} <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">{t('title')}</h3>
                <p className="text-zinc-400 text-sm">{t('subtitle')}</p>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {ratings.map((item) => {
                    const isSelected = selected === item.value

                    return (
                        <button
                            key={item.value}
                            disabled={isPending}
                            onClick={() => handleRating(item.value)}
                            className={`flex flex-col items-center gap-3 transition-all duration-300 group`}
                        >
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-all duration-300 ${isSelected
                                ? "bg-white border-white text-black scale-110 shadow-lg shadow-white/20"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800"
                                } ${isPending && !isSelected ? "opacity-40 grayscale" : ""}`}>
                                {isPending && isSelected ? (
                                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
                                ) : (
                                    <RatingIcon value={item.value} className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center " />
                                )}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${isSelected ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"
                                }`}>
                                {t(`ratings.${item.label}`)}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
const RatingIcon = ({ value, className }: { value: string; className?: string }) => {
    switch (value) {
        case 'very_hard':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
                    <path d="M7 15c1-2 3-3 5-3s4 1 5 3" />
                </svg>
            )
        case 'hard':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
                    <path d="M8 14c0.5-0.8 1.5-1.5 4-1.5s3.5 0.7 4 1.5" />
                </svg>
            )
        case 'neutral':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
                    <path d="M8 12h8" />
                </svg>
            )
        case 'easy':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
                    <path d="M8 10c0.5 0.8 1.5 1.5 4 1.5s3.5-0.7 4-1.5" />
                </svg>
            )
        case 'very_easy':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
                    <path d="M7 9c1 2 3 3 5 3s4-1 5-3" />
                </svg>
            )
        default:
            return null
    }
}