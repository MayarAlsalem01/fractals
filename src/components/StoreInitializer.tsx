// // src/StoreInitializer.tsx
// 'use client'

// import { Sectionss } from '@/app/[locale]/(app)/breif/desktop/clientInfo/page'
// import { useMultiStepFormStore } from '@/features/breifs/useMultiStepFormStore'
// import { useEffect, useRef } from 'react'

// interface StoreInitializerProps {
//     sections: Sectionss[]
//     fullSchema: any // ZodObject
// }

// export default function StoreInitializer({ sections, fullSchema }: StoreInitializerProps) {
//     const initialized = useRef(false)
//     const setSections = useMultiStepFormStore(state => state.setSections)

//     useEffect(() => {
//         if (!initialized.current) {
//             setSections(sections, fullSchema)
//             initialized.current = true
//         }
//     }, [sections, fullSchema, setSections])

//     return null // This component renders nothing
// }
