import Hero from '@/features/home/components/Hero';
import HeroVideo from '@/features/home/components/HeroVideo';
import HomeLoadingWrapper from '@/features/home/components/HomeLoadingWrapper';
import AboutUs from '@/features/aboutUs/components/AboutUs';
import Services from '@/features/home/components/Services';
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion';
import Process from '@/features/home/components/Process';
import BlogTabPane from '@/features/blog/components/BlogTabPane';
import VacanciesSection from '@/features/vacancies/components/VacanciesSection';
import Container from '@/components/Container';
import ContactUs from '@/features/contact/components/ContactUs';
import { Link } from '@/i18n/navigation';
import PrimaryButton from '@/ui/PrimaryButton';
import { getTranslations } from 'next-intl/server';



export default async function Home() {
  // create template
  const t = await getTranslations('buttons')
  const blog = await getTranslations('blog')
  return (
    <HomeLoadingWrapper>
      <main>

        <div className=" w-full  ">

          <HeroVideo />
          <Hero />
          <div className='relative'>
            <AboutUs canDisplayReadButton />
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-b from-transparent from-70% to-black ' />
          </div>
          <Services />
          <Process />

          <Container className='bg-black px-4'>
            <section className='pt-20 relative z-40'>
              <TransparentTextAnimation>
                <p className='text-4xl lg:text-7xl font-gravesend font-bold w-fit mx-auto bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90%'>{blog('title')}</p>
              </TransparentTextAnimation>
              <div >
                <BlogTabPane limit={6} />
                <div className='flex justify-between items-center mt-10 mx-auto w-fit'>

                  <Link href="/blogs" className='text-brand-primary font-medium '>
                    <PrimaryButton>
                      {t('view all')}
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            </section>
          </Container>

          <div className='relative'>
            <VacanciesSection />
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-t from-transparent from-25% to-black  ' />

          </div>

          <div className='relative'>
            <ContactUs />
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-b from-black to-5% md:to-10%  to-transparent  ' />
          </div>
        </div>
      </main>
    </HomeLoadingWrapper>
  );
}
