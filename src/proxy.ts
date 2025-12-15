// /middleware.ts

import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing'; // Assuming you still want to use your routing config

// --- Configuration for next-intl ---
// IMPORTANT: We need to access your locales from the routing config.
// Assuming your routing config (./i18n/routing.ts) exports an object like:
// { locales: ['en', 'de', 'fr'], defaultLocale: 'en', ... }
const locales = routing.locales;

// 1. Initialize the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// 2. Define the main middleware function
const mainMiddleware = (req: NextRequest) => {
    // Pass the request to the next-intl middleware for locale handling
    return intlMiddleware(req);
};

// 3. Wrap the main middleware with withAuth
export default withAuth(
    mainMiddleware,
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // --- NextAuth Authorization Logic for Localized Paths ---

                // 1. Define the protected paths (without locale prefix)
                // Add all your protected paths here (e.g., '/dashboard', '/profile', '/settings')
                const protectedPaths = ['/dashboard', '/blogs'];

                // 2. Create a regex to match any locale prefix followed by a protected path
                // This regex handles paths like:
                // - /dashboard (if no locale prefix is used)
                // - /en/dashboard
                // - /de/dashboard/settings
                const localePrefix = locales.join('|');
                // The regex looks for:
                // ^/  (start of path)
                // (${localePrefix})?  (optional locale prefix, e.g., 'en' or 'de')
                // (${protectedPaths.join('|')}) (one of the protected paths, e.g., 'dashboard')
                // (/?.*)?$ (optional trailing slash and anything after, e.g., '/settings')
                const protectedPathRegex = new RegExp(`^/(${localePrefix})?(${protectedPaths.join('|')})(/.*)?$`);

                // 3. Check if the current pathname matches a protected path
                const isProtected = protectedPaths.some(path => {
                    // Check for the path with a locale prefix: /en/dashboard
                    const withLocale = locales.some(locale => pathname.startsWith(`/${locale}${path}`));
                    // Check for the path without a locale prefix (if your config allows it): /dashboard
                    const withoutLocale = pathname.startsWith(path);

                    return withLocale || withoutLocale;
                });

                // A simpler, more robust check using the regex:
                const isProtectedByRegex = protectedPathRegex.test(pathname);

                if (isProtectedByRegex) {
                    // If it's a protected path, require a token (user must be logged in)
                    return !!token;
                }

                // Allow access to all other routes (public pages)
                return true;
            },
        },

    }
);

// 4. Combined Matcher Configuration
export const config = {
    // The matcher should cover all paths that need to be processed by *either* middleware.
    matcher: [
        // Match all pathnames except for standard exclusions and files with a dot
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
        // Explicitly include the NextAuth API routes for session handling
        '/api/auth/:path*',
    ],
};
