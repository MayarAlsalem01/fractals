import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'guhch9bhhn6a6wws.public.blob.vercel-storage.com',
      },
    ],
  },
  // Enable static exports for full static generation
  // output: 'export', // Uncomment this if you want full static export (no dynamic routes)
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
