import Video from 'next-video';
import MyVideo from '../../../../videos/_title_subtle_202511011239_b47rj.mp4'
import Hero from '@/features/home/components/Hero';
import AboutUs from '@/features/aboutUs/components/AboutUs';
import Services from '@/features/home/components/Services';
import TransparentTextAnimation from '@/ui/TransparentTextAnimtion';
import Process from '@/features/home/components/Process';
import BlogTabPane from '@/features/blog/components/BlogTabPane';
import VacanciesSection from '@/features/vacancies/components/VacanciesSection';
import Container from '@/components/Container';
import Blind from '@/components/Blind';
import ContactUs from '@/features/contact/components/ContactUs';
import { routing } from '@/i18n/routing';
import getBriefAttrubiteValuesByIdAction from '@/features/breifs/actions/getBriefAttrubiteValuesByIdAction';



export default async function Home() {
  // create template

  return (
    <div >
      <main>
        <div className=" w-full  ">

          <div className='absolute  -top-0 h-screen w-full overflow-hidden -z-20 object-cover '>
            <div className='w-full h-full relative brightness-[80%]'>
              <Video className='h-full object-cover scale-[4] md:ccale-[1.5] xl:scale-110 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full' playsInline src={MyVideo} autoPlay controls={false} muted loop maxResolution='720p' minResolution='720p' />
              {/* <Image src={Bg} alt='asd' className='w-full h-full object-fit' /> */}

            </div>
          </div>
          <Hero />
          <div className='relative'>
            <AboutUs />
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-b from-transparent to-black to-80%' />
          </div>
          <Services />
          <Process />

          <Container className='bg-black'>
            <section className=' relative '>
              <TransparentTextAnimation>
                <p className='text-4xl lg:text-7xl font-gravesend font-bold w-fit mx-auto bg-clip-text text-transparent bg-linear-to-r from-white/80 to-white/0 to-90%'>Blogs</p>
              </TransparentTextAnimation>

              <BlogTabPane />


            </section>
          </Container>

          <div className='relative'>
            <VacanciesSection />
            <div className='w-full h-full absolute top-0 left-0 bg-linear-to-t from-transparent to-black to-95\% ' />
          </div>

          <ContactUs />

        </div>
      </main>
    </div>
  );
}
