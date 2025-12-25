import Container from "@/components/Container";
import { Link } from "@/i18n/navigation";
import GradientText from "@/ui/GradientText";
import PrimairyButton from '@/ui/PrimaryButton';
import TransparentTextAnimation from "@/ui/TransparentTextAnimtion";
import { getTranslations } from "next-intl/server";
export default async function Hero() {
    const t = await getTranslations('hero')
    return (
        <Container className="!py-0  relative">

            <section className='  h-screen w-full flex flex-col items-center justify-center gap-3 '>
                <GradientText>{t('title')} </GradientText>
                <TransparentTextAnimation>
                    <p className='bg-clip-text text-transparent linaer-g bg-gradient-to-r from-white/75 to-white/5 from-40% md:from-80% md:text-2xl font-bold w-[20ch] md:w-fit'>
                        {t('subtitle')}
                    </p>
                </TransparentTextAnimation>
                <div className='flex flex-col  items-center justify-center md:text-lg'>
                    <TransparentTextAnimation>
                        <p className='bg-clip-text text-transparent line-clamp-2  bg-gradient-to-r from-white/80 from-70%  to-transparent max-w-[60ch] '>
                            {
                                t('description')
                            }

                        </p>
                    </TransparentTextAnimation>

                </div>
                <Link href={'/expertise'}>
                    <PrimairyButton className="w-fit px-5 !py-6">
                        <p>Explore Expertise</p>
                    </PrimairyButton>
                </Link>
            </section>
        </Container>
    )
}