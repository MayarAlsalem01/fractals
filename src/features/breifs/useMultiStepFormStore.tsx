import { create } from 'zustand'

// --- Type Definitions (Re-using the structure from the original plan) ---

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

// --- Store State and Actions ---

interface MultiStepFormState {
    // The complete form data object
    formData: Record<string, any>
    // The current step index
    currentStep: number
    // The structure of the form (sections and attributes)
    sections: Section[]
    // The full Zod schema for all fields
    fullSchema: any // Should be ZodObject, but using 'any' for simplicity here

    // Actions
    setSections: (sections: Section[], fullSchema: any) => void
    updateFormData: (data: Partial<Record<string, any>>) => void
    goToNextStep: () => void
    goToPreviousStep: () => void
    resetForm: () => void
}

const initialFormData: Record<string, any> = {}

export const useMultiStepFormStore = create<MultiStepFormState>((set, get) => ({
    formData: initialFormData,
    currentStep: 0,
    sections: [],
    fullSchema: null,

    setSections: (sections, fullSchema) => {
        // Calculate initial default values based on the sections
        const allAttributes = sections.flatMap(s => s.attributes)
        const defaultValues: Record<string, any> = {}
        allAttributes.forEach((a) => {
            defaultValues[a.key] = a.meta?.defaultValue ?? (a.type === 'multiselect' ? [] : '')
        })

        set({
            sections,
            fullSchema,
            formData: defaultValues, // Initialize form data with defaults
            currentStep: 0,
        })
    },

    updateFormData: (data) => set((state) => ({
        formData: {
            ...state.formData,
            ...data,
        },
    })),

    goToNextStep: () => set((state) => {
        const isLastStep = state.currentStep === state.sections.length - 1
        if (isLastStep) return state // Cannot go past the last step
        return { currentStep: state.currentStep + 1 }
    }),

    goToPreviousStep: () => set((state) => {
        const isFirstStep = state.currentStep === 0
        if (isFirstStep) return state // Cannot go before the first step
        return { currentStep: state.currentStep - 1 }
    }),

    resetForm: () => set({
        formData: initialFormData,
        currentStep: 0,
        sections: [],
        fullSchema: null,
    }),
}))
