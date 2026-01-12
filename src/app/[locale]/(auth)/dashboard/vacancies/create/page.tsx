'use client'
import VacancyForm from "@/features/vacancies/forms/VacancyForm";
import { useRouter } from "next/navigation";

export default function CreateVacancyPage() {
    const router = useRouter();
    return (
        <div className="p-6 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Create New Vacancy</h1>
            <VacancyForm onSuccess={() => router.push('./../')} />
        </div>
    )
}
