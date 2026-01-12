import getVacanciesAction from "@/features/vacancies/actions/getVacanciesAction";
import VacanciesList from "@/features/vacancies/components/VacanciesList";

export default async function VacanciesPage() {
    const res = await getVacanciesAction();

    // Fallback empty array if error or no data
    const vacancies = (res.isError || !res.data) ? [] : res.data;

    return (
        <div className="p-6">
            <VacanciesList data={vacancies} />
        </div>
    )
}
