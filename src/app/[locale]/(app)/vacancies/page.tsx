import V1 from '../../../../../public/assets/vectors/Artboard 1 copy 3.png'
import V2 from '../../../../../public/assets/vectors/Artboard 1 copy.png'
import Blind from '@/components/Blind'
import VacanciesSection from '@/features/vacancies/components/VacanciesSection'
import getVacanciesPaginationAction from '@/features/vacancies/actions/getVacanciesPaginationAction'
import VacanciesGrid from '@/features/vacancies/components/VacanciesGrid'
import Image from 'next/image'

export default async function page() {
    const { data: result } = await getVacanciesPaginationAction(1, 6)

    return (
        <div className='w-full'>
            <VacanciesSection />
            <section className='px-4 md:px-24 lg:px-64 py-8 relative'>
                <Blind className='' />

                {/* Background Vector 1 */}
                <Image
                    src={V1}
                    alt=''
                    className={`absolute top-0 left-0 -translate-x-60 w-[45rem] -translate-y-64 -z-10 blur-xl `}
                />

                {/* Background Vector 2 */}
                <div className='absolute bottom-0 left-0 w-full h-full -z-10 overflow-hidden'>
                    <div className='w-full h-full relative overflow-hidden'>
                        <Image
                            src={V2}
                            alt=''
                            className={`w-[35rem] absolute top-1/2 -right-60 -translate-y-1/6 blur-xl`}
                        />
                    </div>
                </div>

                <VacanciesGrid
                    initialData={result?.data || []}
                    initialPagination={result?.pagination}
                />
            </section>
        </div>
    )
}
