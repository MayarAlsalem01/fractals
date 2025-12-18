import BlogTabPane from '@/features/blog/components/BlogTabPane'
import React from 'react'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function page() {
    return (
        <section className=' px-12 py-28'>
            <BlogTabPane />
        </section>
    )
}
