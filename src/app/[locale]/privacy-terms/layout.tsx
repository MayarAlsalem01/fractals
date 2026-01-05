'use server'
import Container from '@/components/Container'
import Navbar from '@/components/navbar/Navbar'
import PrivcyTermsTabs from '@/features/privacy-terms/components/PrivcyTermsTabs'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='relative overflow-hidden'>
            <div className='fixed w-96 h-96 rounded-full bg-radial from-brand-secondary to-transparent -top-44 md:-top-32 -right-56 md:-right-32 blur-3xl -z-10' />
            <div className='fixed w-96 h-96 rounded-full bg-radial from-brand-primary to-brand-primary/5 to-70% blur-3xl  top-full left-1/2 -translate-1/2 -z-10' />

            <Navbar />
            <Container>
                <PrivcyTermsTabs />
                {
                    children
                }
            </Container>
        </main>
    )
}
