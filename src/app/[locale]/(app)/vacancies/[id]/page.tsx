import getPublicVacancyByIdAction from "@/features/vacancies/actions/getPublicVacancyByIdAction";
import V1 from '../../../../../../public/assets/vectors/Artboard 1 copy 3.png'
import V2 from '../../../../../../public/assets/vectors/Artboard 1 copy.png'
import Blind from '@/components/Blind'
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

interface VacancySection {
    title: string;
    order: number;
    items: string[];
}

export default async function VacancyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const vacancyId = parseInt(id);

    if (isNaN(vacancyId)) {
        return <div className="p-12 text-center text-red-500">Invalid Vacancy ID</div>;
    }

    const res = await getPublicVacancyByIdAction(vacancyId);

    if (res.isError || !res.data) {
        return <div className="p-12 text-center text-red-500">{res.error?.message || 'Vacancy not found'}</div>;
    }

    const vacancy = res.data;
    const sections = (vacancy.sections as unknown as VacancySection[])?.sort((a, b) => a.order - b.order) || [];

    return (
        <div className="w-full min-h-screen relative ">
            <div className='px-4 md:px-24 lg:px-64 pb-12 pt-28'>
                <Blind className='' />

                {/* Backgrounds */}
                <Image src={V1} alt='' className={`absolute top-0 left-0 -translate-x-64 w-[45rem] -translate-y-64 blur-xl z-10 opacity-80`} />
                <div className='absolute bottom-0 left-0 w-full h-full  overflow-hidden'>
                    <Image src={V2} alt='' className={`w-[35rem] absolute top-1/2 -right-60 -translate-y-1/6 blur-xl z-10 opacity-80`} />
                </div>

                <div className="mb-8 z-20 relative">
                    <Link href="/vacancies" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vacancies
                    </Link>
                </div>

                <div className="space-y-8 z-20 relative">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            {vacancy.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Posted on {new Date(vacancy.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            {vacancy.description}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8 mt-8">
                        {sections.map((section, index) => (
                            <div key={index} className="  rounded-2xl ">
                                <h3 className="text-2xl font-semibold mb-4 text-primary font-gravesend tracking-wide">{section.title}:</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                            <span className="text-foreground/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Apply Button (Placeholder) */}
                    {/* <div className="pt-8">
                        <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 rounded-xl">
                            Apply for this Position
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
