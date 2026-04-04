import VacancyApplicationForm from "@/features/vacancies/forms/VacancyApplicationForm";
import Vector1 from '../../../../../../public/assets/vectors/Artboard 1 copy.png'
import Vector2 from '../../../../../../public/assets/vectors/bfd8621ed5e1c9f605a25f6d00122b6ff6f69c5b.png'
import Image from "next/image";

export default async function page() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center overflow-hidden relative px-4 ">
            <Image src={Vector1} alt="" className="absolute top-0 left-0 -translate-x-60 w-[45rem] -translate-y-64 -z-10 blur-xl" />
            <Image src={Vector2} alt="" className="absolute bottom-0 end-0 translate-x-60 w-[45rem] translate-y-64 -z-10 blur-xl" />
            <VacancyApplicationForm />
        </div>
    )
}