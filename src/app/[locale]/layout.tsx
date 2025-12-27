import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import SessionProvider from "@/lib/SessionProvider";
import QueryClientProvider from "@/lib/QueryClientProvider";
import { Toaster } from "sonner";


const gravesend = localFont({
  variable: "--font-gravesend",
  src: [
    { path: '../../../public/fonts/gravesend-sans-family/gravesend-sans-medium.ttf', weight: "400", style: "normal" },
    { path: '../../../public/fonts/gravesend-sans-family/gravesend-sans-bold.ttf', weight: "700", style: "normal" }
  ]
})


const gilory = localFont({
  variable: "--font-gilory",
  src: [
    // Use filesystem-relative paths so the compiler can resolve these files
    { path: "../../../public/fonts/gilroy/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/gilroy/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/gilroy/Gilroy-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/gilroy/Gilroy-Bold.ttf", weight: "700", style: "normal" },
    // { path: "../../../public/fonts/Sen/static/Sen-Medium.ttf", weight: "500", style: "normal" },
    // { path: "../../../public/fonts/Sen/static/Sen-SemiBold.ttf", weight: "600", style: "normal" },
    // { path: "../../../public/fonts/Sen/static/Sen-Bold.ttf", weight: "700", style: "normal" },
    // { path: "../../../public/fonts/Sen/static/Sen-ExtraBold.ttf", weight: "800", style: "normal" },
    // // Fallback to variable file if present
    // { path: "../../../public/fonts/Sen/Sen-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
  ],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use a site URL from environment for dev (ngrok/localtunnel) or fallback to production
const SITE_URL = 'https://fractals-zeta.vercel.app';

export const metadata: Metadata = {
  title: "Fractals | The Capital of Art & Digital Innovation",
  description: "Creative and technology-driven agency crafting digital experiences where art, code, and human emotion converge. Web development, mobile apps, UI/UX design, and branding for luxury brands.",
  keywords: [
    "digital agency",
    "web development",
    "mobile app development",
    "UI/UX design",
    "branding",
    "digital design",
    "creative agency",
    "luxury brands",
    "digital experiences",
    "innovation",
    "design services",
    "technology solutions"
  ],
  authors: [{ name: "Fractals Agency" }],
  creator: "Fractals",
  publisher: "Fractals",
  applicationName: "Fractals",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/assets/logo/favicon.ico",
    apple: "/assets/logo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Fractals | The Capital of Art & Digital Innovation",
    description: "We develop. We design. We connect. We inspire. Fractals is where creativity meets intelligence.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    siteName: "Fractals",
    images: [
      {
        url: `${SITE_URL}/assets/logo/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fractals Agency - The Capital of Art"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractals | The Capital of Art & Digital Innovation",
    description: "Creative and technology-driven agency crafting digital experiences.",
    images: [`${SITE_URL}/assets/logo/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  classification: "Digital Agency",
};

// Generate static params for all supported locales

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]; // List all supported locales
}
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({
  children,
  params
}: Props) {

  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  console.log(SITE_URL)
  return (
    <html lang={locale}   >
      <body
        className={`dark  ${gravesend.variable}  ${gilory.variable} ${geistMono.variable}  antialiased `}
      >
        <NextIntlClientProvider >
          <SessionProvider>
            <QueryClientProvider>

              {children}
            </QueryClientProvider>
          </SessionProvider>
          <Toaster richColors position='top-right' />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
