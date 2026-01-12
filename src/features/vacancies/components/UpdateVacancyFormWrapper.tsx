'use client'

import { useRouter } from 'next/navigation'
import VacancyForm from '../forms/VacancyForm'
import { Vacancy } from '@/db/schema'

export default function UpdateVacancyFormWrapper({ initialData, vacancyId }: { initialData: Vacancy, vacancyId: number }) {
    const router = useRouter()

    // Map DB type to Form type
    const formValues = {
        title: initialData.title,
        description: initialData.description,
        sections: initialData.sections as any // Cast jsonb to match form schema
    }

    return (
        <VacancyForm
            initialData={formValues}
            vacancyId={vacancyId}
            onSuccess={() => router.push('../../')}
        />
    )
}
