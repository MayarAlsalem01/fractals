import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PrimaryButton from '@/ui/PrimaryButton'
import React, { ReactNode } from 'react'
import BlogImage from '../../../../public/assets/licensed-image.png'
import Image from 'next/image'
export default function BlogTabPane() {
    const creativity = [
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
        {
            title: 'The Silent Language Shaping Our World',
            text: '  When we hear the word "Design," many immediately think of attractive colors, sleek shapes, or high fashion. However, the reality is far deeper. Design is "visual intelligence." It is a strategic planning process aimed at improving our...'
        },
    ]
    return (
        <Tabs defaultValue='Creativity' className=' justify-end' dir='rtl' >
            <TabsList className='  border border-accent rounded-4xl bg-transparent h-fit flex-wrap !justify-start px-3 gap-2 py-2 '>
                <BlogTabsTrigger value="Creativity"  >Creativity</BlogTabsTrigger>
                <BlogTabsTrigger value="Development">Development</BlogTabsTrigger>
                <BlogTabsTrigger value="AI & Tech">AI & Tech</BlogTabsTrigger>
                <BlogTabsTrigger value="Business">Business</BlogTabsTrigger>
                <BlogTabsTrigger value="Fractals">Fractals</BlogTabsTrigger>
            </TabsList>
            <TabsContent value="Creativity">
                <BlogsGrid>
                    {
                        creativity.map((creativity, i) => <BlogCard text={creativity.text} title={creativity.title} key={i} />)
                    }

                </BlogsGrid>
            </TabsContent>
            <TabsContent value="Development">
                <BlogsGrid>
                    {
                        creativity.map((creativity, i) => <BlogCard text={creativity.text} title={creativity.title} key={i} />)
                    }

                </BlogsGrid>
            </TabsContent>
            <TabsContent value="AI & Tech">
                <BlogsGrid>
                    {
                        creativity.map((creativity, i) => <BlogCard text={creativity.text} title={creativity.title} key={i} />)
                    }

                </BlogsGrid>
            </TabsContent>
            <TabsContent value="Business">
                <BlogsGrid>
                    {
                        creativity.map((creativity, i) => <BlogCard text={creativity.text} title={creativity.title} key={i} />)
                    }

                </BlogsGrid>
            </TabsContent>
            <TabsContent value="Fractals">
                <BlogsGrid>
                    {
                        creativity.map((creativity, i) => <BlogCard text={creativity.text} title={creativity.title} key={i} />)
                    }

                </BlogsGrid>
            </TabsContent>

        </Tabs>
    )
}
function BlogTabsTrigger({ value, children }: { value: string, children: ReactNode }) {
    return (
        <TabsTrigger value={value} className='rounded-4xl flex-none'>{children}</TabsTrigger>

    )
}
function BlogsGrid({ children }: { children: ReactNode }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {children}
        </div>
    )
}
export function BlogCard({ title, text }: { title: string, text: string }) {
    return (
        <Card className=' relative bg-transparent gap-3 overflow-hidden'>

            <CardHeader >
                <Image src={BlogImage} alt='asd' className='w-full object-cover rounded-2xl z-40 opacity-90' />
                <CardTitle>
                    <p className='text-lg font-bold'>{title}</p>

                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='opacity-80 leading-relaxed line-clamp-5'>
                    {
                        text
                    }
                </p>
            </CardContent>
            <CardFooter className='flex justify-end'>
                <PrimaryButton>Read More</PrimaryButton>
            </CardFooter>

            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 -translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-primary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-secondary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 -translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-primary to-black blur-3xl' />
            <div className='w-full h-[calc(100%+100px)] absolute left-0 top-0 -z-10 translate-x-60 -translate-y-20  rounded-full bg-radial from-brand-secondary to-black blur-3xl' />
        </Card>
    )
}