// // app/brief/[templateId]/[stepKey]/page.tsx
// 'use client'

// import { useForm, FieldValues } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter, useParams } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import { useMultiStepFormStore } from '@/features/breifs/useMultiStepFormStore'
// import StepFormRenderer from '@/components/StepFormRenderer'

// // NOTE: You will need to fetch the full sections data in a layout or a parent
// // component and pass it down, or fetch it here. For simplicity, we assume
// // the store is initialized elsewhere or we fetch the full data here.

// export default function StepPage() {
//     const router = useRouter()
//     const params = useParams()
//     const { templateId, stepKey } = params

//     // 1. Get state and actions from the store
//     const { formData, sections, fullSchema, updateFormData } = useMultiStepFormStore()

//     // 2. Identify the current step and its attributes
//     const currentStepIndex = sections.findIndex(s => s.key === stepKey)
//     const currentSection = sections[currentStepIndex]

//     if (!currentSection || !fullSchema) {
//         // Handle loading or invalid step
//         return <div>Loading or Invalid Step...</div>
//     }

//     // 3. Initialize RHF with the full schema and current store data
//     const formMethods = useForm({
//         resolver: zodResolver(fullSchema),
//         defaultValues: formData,
//         mode: 'onBlur',
//     })

//     const { trigger, getValues, handleSubmit, formState: { isSubmitting } } = formMethods
//     const currentStepKeys = currentSection.attributes.map(attr => attr.key)

//     const isLastStep = currentStepIndex === sections.length - 1
//     const nextStep = sections[currentStepIndex + 1]
//     const prevStep = sections[currentStepIndex - 1]

//     // 4. Handle Next/Submit
//     const handleNext = async () => {
//         // Validate only the fields in the current step
//         const isValid = await trigger(currentStepKeys as (keyof FieldValues)[], { shouldFocus: true })

//         if (isValid) {
//             // Update store with current values before navigating
//             updateFormData(getValues() as Record<string, any>)

//             if (isLastStep) {
//                 // Final Submission Logic (Call Server Action)
//                 // You would need to call your final submission function here
//                 console.log('Final Submission Triggered!')
//                 // Example: saveBriefAction(templateId, getValues())
//             } else {
//                 // Navigate to the next step's URL
//                 router.push(`/brief/${templateId}/${nextStep.key}`)
//             }
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit(handleNext)}>
//             <h2 className="text-xl font-semibold">{currentSection.title}</h2>
//             <p className="text-sm text-gray-500">Step {currentStepIndex + 1} of {sections.length}</p>

//             {/* Render the inputs for this step */}
//             <StepFormRenderer section={currentSection} formMethods={formMethods} />

//             {/* Navigation Buttons */}
//             <div className="mt-8 flex justify-between">
//                 {prevStep && (
//                     <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => router.push(`/brief/${templateId}/${prevStep.key}`)}
//                     >
//                         Back
//                     </Button>
//                 )}
//                 <div className={!prevStep ? 'ml-auto' : ''}>
//                     <Button type={isLastStep ? 'submit' : 'button'} onClick={handleNext} disabled={isSubmitting}>
//                         {isLastStep ? (isSubmitting ? 'Submitting...' : 'Submit Brief') : 'Next Step'}
//                     </Button>
//                 </div>
//             </div>
//         </form>
//     )
// }
import { notFound } from 'next/navigation'
import React from 'react'

export default function page() {
    return notFound()
}
