'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'
import SecondryButton from '@/ui/SecondryButton'
import { Link } from '@/i18n/navigation'
import BgImage from '../../../../public/assets/licensed-image.png'

interface VacancyCardProps {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
}

export default function VacancyCard({ id, title, description, createdAt }: VacancyCardProps) {
    return (
        <Card className='w-full relative bg-transparent gap-3 overflow-hidden z-30'>
            <CardHeader>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden z-40 opacity-90">
                    <Image
                        src={BgImage}
                        alt={title}
                        fill
                        className='object-cover'
                    />
                </div>
                <CardTitle>
                    <p className='text-lg font-bold line-clamp-2'>{title}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='opacity-80 leading-relaxed line-clamp-3'>
                    {description}
                </p>
            </CardContent>
            <CardFooter className='flex flex-col items-end gap-1'>
                <SecondryButton className='z-50'>
                    {/* Assuming we might want a detailed view later, but for now user just said "read more button". 
                        Linking to a detail page if it exists or just a placeholder? 
                        User didn't specify a public detail page, only dashboard create/update pages.
                        However, "read more" implies a detail view. I'll link to `/vacancies/${id}` for now.
                        If that page doesn't exist, I'll have to create it or it will 404.
                        Reflecting on user request: "in this page add a vacanciy card...". 
                        I will assume /vacancies/[id] is the intended target.
                    */}
                    <Link href={`/vacancies/${id}`}>Read More</Link>
                </SecondryButton>

                <p className='text-xs opacity-50 self-start'>
                    Posted: {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                        Math.round((new Date(createdAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                        'day'
                    )}
                </p>
            </CardFooter>

            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 -translate-x-60 -translate-y-20 rounded-full bg-radial from-brand-primary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 translate-x-60 -translate-y-20 rounded-full bg-radial from-brand-secondary to-black blur-3xl' />
        </Card>
    )
}
