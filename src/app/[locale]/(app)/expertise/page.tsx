// app/.../page.jsx  (or wherever your original page is)
import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import BgImage from "../../../../../public/assets/Expertice.png";
import BgMobileImage from "../../../../../public/assets/Expertise-Mobile.png";
import Container from "@/components/Container";
import Blind from "@/components/Blind";
import Star from "../../../../../public/assets/star.png";
import { getTranslations } from "next-intl/server";
import DotBackgroundDemo from "@/components/DottedBackground";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import SecondryButton from "@/ui/SecondryButton";

export default async function page() {
    const t = await getTranslations('expertise')
    const services = [
        {
            key: "web",
            title: t('web devlopenet.title'),
            description: null,
            bullets: [
                t('web devlopenet.Custom-built websites with modern frameworks'),
                t('web devlopenet.Fast, scalable, and interactive'),
                t('web devlopenet.Integrations: CMS, APIs, cloud hosting, SEO optimization'),
                t('web devlopenet.Framer motion, Shopify, Wordpress, Wix Studio'),
            ],
        },
        {
            key: "mobile",
            title: t('mobile app development.title'),
            description: t('mobile app development.description'),
            bullets: [
                t('mobile app development.Native or Cross-platform apps'),
                t('mobile app development.Elegant UI, intuitive UX, and seamless performance'),
                t('mobile app development.From MVP to full-scale product'),
            ],
        },
        {
            key: "uiux",
            title: t('ui ux design.title'),
            description: t('ui ux design.description'),

            bullets: [
                t('ui ux design.Human-centered experiences that fuse art and usability'),
                t('ui ux design.Services: wireframing, prototyping, motion design, and usability testing'),
            ],
        },
        {
            key: "desktop",
            title: t('desktop applications.title'),
            description: t('desktop applications.description'),
            bullets: [
                t('desktop applications.Smart, secure, and performance-focused systems'),
                t('desktop applications.Smart, secure, and performance-focused systems')
            ],
        },
        {
            key: "branding",
            title: t('Branding & Logo Design.title'),
            description: t('Branding & Logo Design.description'),
            bullets: [
                t('Branding & Logo Design.Visual storytelling that defines who you are'),
                t('Branding & Logo Design.Deliverables: logo, typography, color palette, brand system'),
            ],
        },
        {
            key: "marketing",
            title: t('Marketing & Social Media Management.title'),
            description: t('Marketing & Social Media Management.description'),
            bullets: [
                t('Marketing & Social Media Management.Strategy, storytelling, and visual identity consistency'),
                t('Marketing & Social Media Management.Growth-driven campaigns powered by analytics and creativity'),
            ],
        },
    ];

    return (
        <div className="w-full">
            <Image
                src={BgImage}
                alt=""
                className="w-full h-full object-cover absolute left-0 top-0 -z-10 hidden md:block"
            />
            <Image
                src={BgMobileImage}
                alt=""
                className="w-full h-full object-cover absolute left-0 top-0 -z-10 md:hidden"
            />

            <section className="h-screen relative  py-28">
                <Container className="!py-0 h-full" >
                    <div className="h-full w-full items-center flex flex-col md:flex-row justify-between   " dir="ltr">
                        <div className="flex flex-col items-start gap-4 md:gap-8 uppercase w-full">
                            <LinkButton href="/brief/web" className=" border-brand-secondary  bg-linear-to-tr  from-brand-secondary/30 to-brand-secondary/5 to-95% md:translate-x-24">
                                Web Development
                            </LinkButton>
                            <LinkButton href="/brief/mobile" className="border text-sm md:text-base border-brand-secondary  bg-linear-to-tr  from-brand-secondary/30 to-brand-secondary/5 to-95% ">
                                Mobile App Development
                            </LinkButton>
                            <LinkButton href="/brief/desktop" className="border-brand-secondary  bg-linear-to-tr  from-brand-secondary/30 to-brand-secondary/5 to-95% md:translate-x-24" >
                                Desktop Application
                            </LinkButton>
                        </div>

                        <div className="flex items-end justify-end uppercase w-full h-full md:h-auto md:pe-12" dir="ltr">
                            <div className="flex flex-col gap-4 md:gap-8 text-sm md:text-base self-end">
                                <LinkButton href="/brief/ui_ux" className="w-fit border self-end md:self-auto border-brand-primary  bg-linear-to-tr  from-brand-primary/30 to-brand-primary/5 to-95% ">
                                    UI/UX Design
                                </LinkButton>
                                <LinkButton href="/brief/brand_logo" className="w-fit self-end md:self-auto border border-brand-primary  bg-linear-to-tr  from-brand-primary/30 to-brand-primary/5 to-95% font-gravesend md:translate-x-10 ">
                                    Branding & Logo Design
                                </LinkButton>
                                <LinkButton href="brief/social_media" className="w-fit border self-end md:self-auto border-brand-primary bg-linear-to-tr  from-brand-primary/30 to-brand-primary/5 to-95%  ">
                                    Social Media Management
                                </LinkButton>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <DotBackgroundDemo>
                <Container className="relative ">
                    <Blind />
                    <section className="flex flex-col gap-12">
                        {services.map((s) => (
                            <ServiceCard
                                key={s.key}
                                title={s.title}
                                description={s.description}
                                bullets={s.bullets}
                                icon={Star}
                            />
                        ))}
                    </section>
                </Container>
            </DotBackgroundDemo>
        </div>
    );
}


async function ServiceCard({
    title,
    description,
    bullets = [],
    buttonText = "Go to brief",
    icon, // pass an imported image module (e.g. Star)
    className = "",
}: { title: string; description: React.ReactNode | null; bullets?: string[]; buttonText?: string; icon?: StaticImageData; className?: string; }) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div className="flex items-center gap-2">
                {icon && <Image src={icon} alt="" className="w-3 h-3 md:w-6 md:h-6" />}
                <h2 className={`text-xl md:text-3xl font-gravesend font-bold`}>{title}</h2>
            </div>

            {description && (
                <p className="text-base leading-relaxed max-w-[90ch]">
                    {description}
                </p>
            )}

            {bullets.length > 0 && (
                <ul className="list-disc list-inside flex flex-col gap-2 text-accent-foreground/70">
                    {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                    ))}
                </ul>
            )}

            <SecondryButton className="w-fit">{buttonText}</SecondryButton>
        </div>
    );
}
function LinkButton({ className, href, children }: { className?: string, href: string, children: ReactNode }) {
    return (
        <Button asChild className={`border text-sm md:text-base  px-4 py-2 bg-transparent text-accent-foreground rounded-none rounded-tl-2xl rounded-br-2xl  font-gravesend  hover:bg-transparent ${className}`}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}