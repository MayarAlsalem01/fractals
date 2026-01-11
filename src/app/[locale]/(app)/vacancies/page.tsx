import BgImage from '../../../../../public/assets/vacancies/Untitled-1.png'
import Image from 'next/image'
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion'
import { BlogCard } from '@/features/blog/components/BlogTabPane'
import V1 from '../../../../../public/assets/vectors/Artboard 1 copy 3.png'
import V2 from '../../../../../public/assets/vectors/Artboard 1 copy.png'
import Container from '@/components/Container'
import Blind from '@/components/Blind'
import { getTranslations } from 'next-intl/server'
import VacanciesSection from '@/features/vacancies/components/VacanciesSection'
export default async function page() {
    const t = await getTranslations('vacancies')
    return (

        <div className=' w-full    '>
            <VacanciesSection />
            <section className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-24 lg:px-64 py-8 relative'>
                <Blind className='' />

                <Image src={V1} alt='' className={`absolute top-0  left-0 -translate-x-60 w-[45rem] -translate-y-64 -z-10 blur-xl `} />
                <div className=' absolute bottom-0 left-0  w-full h-full -z-10   overflow-hidden'>
                    <div className='w-full h-full relative overflow-hidden'>
                        <Image src={V2} alt='' className={` w-[35rem] absolute top-1/2 -right-60  -translate-y-1/6 blur-xl`} />
                    </div>
                </div>

                {/* <BlogCard text='We are hiring a creative Social Media Specialist to manage our digital presence, create engaging content, and grow our community. You will be responsible for strategy execution, daily posting, and analyzing performance metrics to drive brand awareness. If you have experience in social media marketing, excellent copywriting skills, and a passion for digital...' title='Social Media Specialist' />

                <BlogCard text='We are seeking a talented Graphic Designer to create visual concepts that communicate our brand message effectively. You will be responsible for designing digital and print assets, including social media graphics, logos, and marketing materials, using Adobe Creative Suite. If you have a strong portfolio, a keen eye for aesthetics, and the ability to collaborate with our marketing team...' title='Graphic Designer' />

                <BlogCard text='We are looking for a skilled UI/UX Designer to create intuitive and visually appealing digital experiences. You will be responsible for conducting user research, creating wireframes and prototypes, and designing high-fidelity interfaces that solve user problems. Proficiency in design tools like Figma or Adobe XD and a strong understanding of user-centered design principles are essential.' title='UI-UX Designer' />


                <BlogCard text='We are looking for a skilled Front-End Developer to translate UI/UX designs into responsive, interactive web applications. You will be responsible for implementing visual elements, ensuring cross-browser compatibility, and optimizing applications for maximum speed and scalability. Proficiency in HTML, CSS, JavaScript, and modern frameworks like React or Vue is essential.' title='Front-End Developer' />

                <BlogCard text='We are seeking a talented Flutter Developer to build high-quality, cross-platform mobile applications for iOS and Android using a single codebase. You will be responsible for writing clean Dart code, implementing UI designs, connecting to third-party APIs, and ensuring smooth performance. Experience with state management, widget testing, and the app deployment process to the App Store and Google Play is essential.' title='Flutter Developer' />

                <BlogCard text='We are seeking a skilled Back-End Developer to build and maintain the server-side logic and databases that power our applications. You will be responsible for developing robust APIs, optimizing system performance, and ensuring data security and scalability. Proficiency in server-side languages (such as Node.js, Python, or PHP) and database management is essential.' title='Back-End Developer' /> */}
            </section>
        </div>

    )
}
