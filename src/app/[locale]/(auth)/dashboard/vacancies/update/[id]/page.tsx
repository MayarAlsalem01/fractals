import getVacancyByIdAction from "@/features/vacancies/actions/getVacancyByIdAction";
import UpdateVacancyFormWrapper from "@/features/vacancies/components/UpdateVacancyFormWrapper";
import { redirect } from "next/navigation";

export default async function UpdateVacancyPage({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
        return <div className="p-6 text-red-500">Invalid Vacancy ID</div>;
    }

    const res = await getVacancyByIdAction(id);

    if (res.isError || !res.data) {
        return <div className="p-6 text-red-500">Error: {res.error?.message || 'Vacancy not found'}</div>;
    }

    return (
        <div className="p-6 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Edit Vacancy: {res.data.title}</h1>
            <UpdateVacancyFormWrapper initialData={res.data} vacancyId={id} />
        </div>
    )
}
