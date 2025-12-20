// app/[locale]/not-found.tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ErrorDesktop from '../../../public/assets/404/404-pc.png'
import ErrorMobile from '../../../public/assets/404/404-ipad.png'
import Image from 'next/image';
export default function NotFoundPage() {

    return (
        <div className='h-screen w-full flex  justify-center lg:justify-start lg:items-center relative pt-24 lg:pt-0 px-6 lg:px-32'>
            <div className='w-fit '>
                <p className='text-4xl font-bold uppercase font-gravesend mb-2 text-transparent bg-linear-to-r from-white via-brand-tertiary to-brand-primary to-65% bg-clip-text'>
                    Nothing to see
                </p>
                <p className='text-2xl font-semibold uppercase'>
                    error 404
                </p>
                <p className='text-lg text-accent-foreground/70 mt-2 '>
                    No matter how hard you try to hide us from art , we will see
                </p>
            </div>
            <Image src={ErrorDesktop} alt='404' className='hidden lg:block w-full h-full absolute top-0 left-0 -z-10 brightness-75 object-cover' />
            <Image src={ErrorMobile} alt='404' className='block lg:hidden w-full h-full absolute top-0 left-0 -z-10 brightness-75 object-cover' />
        </div>
    );
}
