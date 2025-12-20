'use client'

import React, { useMemo, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Components and Store

// UI Components (Assuming these are correct)
import { Button } from '@/components/ui/button'
import StepFormRenderer from '@/components/StepFormRenderer'
import { useMultiStepFormStore } from './useMultiStepFormStore'
import { buildZodSchema } from '@/lib/zodFromAttributes'
import insertBriefAttributeAction from './actions/insertBriefAttributeAction'
import { BriefAttributeInsertValues } from '@/db/schema'
import { toast } from 'sonner'
import PrimaryButton from '@/ui/PrimaryButton'
import SecondryButton from '@/ui/SecondryButton'

// --- Type Definitions (Re-using the structure from the store) ---

type Attr = {
    id: number
    key: string
    label: string
    type: string
    required: boolean | null
    width?: string | null
    options?: any
    meta?: any
}

type Section = {
    id: number
    key: string
    title: string
    position: number
    attributes: Attr[]
}

// --- Utility Functions (Copied from user's original file) ---

function prepareAttributePayload(formData: Record<string, any>, allAttributes: Attr[]) {
    return allAttributes.map(attr => {
        const raw = formData[attr.key];
        const value = raw === undefined ? null : raw;
        const valueText =
            value === null
                ? null
                : Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value);

        return {
            attribute_id: attr.id,
            key: attr.key,
            value: String(value),
            value_text: valueText?.toString(),
        };
    });
}

// --- Multi-Step Form Wrapper Component ---

interface MultiStepFormWrapperProps {
    sections: Section[]
    onSubmit?: (payload: ReturnType<typeof prepareAttributePayload>) => void,
    templateId: number
}

export default function MultiStepFormWrapper({ sections, onSubmit: finalSubmit, templateId }: MultiStepFormWrapperProps) {
    const {
        formData,
        currentStep,
        fullSchema: schemaSate,
        setSections,
        updateFormData,
        goToNextStep,
        goToPreviousStep,
    } = useMultiStepFormStore()

    // 1. Calculate full schema and initialize store on mount
    const allAttributes = useMemo(() => sections.flatMap(s => s.attributes), [sections])
    const fullSchema = buildZodSchema(allAttributes)
    useEffect(() => {
        // Initialize the store with sections and the full schema
        setSections(sections, fullSchema)
    }, [sections, setSections])

    // 2. Initialize React Hook Form with the full schema and current store data
    const formMethods = useForm({
        resolver: zodResolver(fullSchema),
        defaultValues: formData, // Use data from store as default
        mode: 'onChange',
    })

    const { trigger, getValues, handleSubmit, formState: { isSubmitting } } = formMethods

    // Sync RHF values with Zustand store on every render (or on blur/change)
    // This is crucial for maintaining state across steps
    useEffect(() => {
        // We use watch or getValues to sync the form state back to Zustand
        const subscription = formMethods.watch((value) => {
            updateFormData(value as Record<string, any>)
        })
        return () => subscription.unsubscribe()
    }, [formMethods, updateFormData])


    // 3. Step Management
    const currentSection = sections[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === sections.length - 1

    // Get keys for the current step's attributes for targeted validation
    const currentStepKeys = useMemo(() => currentSection.attributes.map(attr => attr.key), [currentSection])

    // 4. Handle moving to the next step
    const handleNext = async () => {
        // Trigger validation only for the fields in the current step
        const isValid = await trigger(currentStepKeys as (keyof FieldValues)[], { shouldFocus: true })

        if (isValid) {
            // Update store with current values before moving
            updateFormData(getValues() as Record<string, any>)
            console.log(formData)
            goToNextStep()
        }
    }

    // 5. Handle final form submission
    const onFinalSubmit = async (data: any) => {
        // Final validation is implicitly handled by handleSubmit
        const payload = prepareAttributePayload(data, allAttributes)
        console.log(payload)
        const res = await insertBriefAttributeAction({ values: payload, templateId: templateId })
        if (!res.ok) {
            toast.error(res.error?.message)
        }
        else {
            toast.success('Your brief submitted successfully ')
        }
    }

    // 6. Render the form
    if (!currentSection) {
        return <div>Loading form...</div> // Or a proper loading state
    }

    return (
        <form onSubmit={handleSubmit(onFinalSubmit)}>
            {/* Step Indicator */}
            <div className="mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-brand-primary">{currentSection.title}</h2>
                <p className="text-sm text-gray-500">
                    Step {currentStep + 1} of {sections.length}
                </p>
            </div>

            {/* Current Step's Fields (The DynamicBriefForm equivalent) */}
            <StepFormRenderer section={currentSection} formMethods={formMethods} />

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
                {!isFirstStep && (
                    <SecondryButton


                        onClick={goToPreviousStep}
                    >
                        Back
                    </SecondryButton>
                )}
                <div className={`flex gap-1 items-center justify-center  ${isFirstStep ? 'w-full' : ''}`}>
                    {
                        Array.from({ length: sections.length - 1 }).map((_, i) =>
                            <span key={i} className={`w-2 h-2  block rounded-full ${currentStep === i ? 'scale-150 bg-accent-foreground mx-0.5' : 'bg-accent-foreground/80'}`} />)
                    }
                </div>
                <div className={isFirstStep ? 'ml-auto' : ''}>
                    {isLastStep ? (
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Brief'}
                        </Button>
                    ) : (
                        <SecondryButton onClick={handleNext}>
                            Next Step
                        </SecondryButton>
                    )}
                </div>
            </div>
        </form>
    )
}

