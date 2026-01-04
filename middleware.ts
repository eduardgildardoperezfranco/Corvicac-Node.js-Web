import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported languages
const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'de', 'pt', 'it', 'ar', 'zh', 'ja', 'ru'];
const DEFAULT_LANGUAGE = 'es';

// Paths that should not be redirected
const EXCLUDED_PATHS = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/sitemap.xml',
    '/robots.txt',
    '/manifest.json',
    '/sw.js',
    '/workbox-',
];

function isExcludedPath(pathname: string): boolean {
    return EXCLUDED_PATHS.some(path => pathname.startsWith(path));
}

function getPreferredLanguage(request: NextRequest): string {
    // 1. Check for explicit language in URL
    const pathname = request.nextUrl.pathname;
    const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    if (langMatch && SUPPORTED_LANGUAGES.includes(langMatch[1])) {
        return langMatch[1];
    }

    // 2. Check for saved preference in cookie
    const savedLang = request.cookies.get('preferred-language')?.value;
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        return savedLang;
    }

    // 3. Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const languages = acceptLanguage
            .split(',')
            .map(lang => lang.split(';')[0].trim())
            .filter(lang => SUPPORTED_LANGUAGES.includes(lang));
        
        if (languages.length > 0) {
            return languages[0];
        }
    }

    // 4. Check browser language
    const browserLang = request.headers.get('x-vercel-ip-country');
    if (browserLang) {
        // Map countries to languages (simplified)
        const countryToLang: Record<string, string> = {
            'CO': 'es', 'ES': 'es', 'MX': 'es', 'AR': 'es', 'CL': 'es',
            'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
            'FR': 'fr', 'BE': 'fr', 'CA': 'fr',
            'DE': 'de', 'AT': 'de', 'CH': 'de',
            'BR': 'pt', 'PT': 'pt',
            'IT': 'it', 'CH': 'it',
            'SA': 'ar', 'AE': 'ar', 'EG': 'ar',
            'CN': 'zh', 'HK': 'zh', 'TW': 'zh',
            'JP': 'ja',
            'RU': 'ru',
        };
        
        const lang = countryToLang[browserLang];
        if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
            return lang;
        }
    }

    return DEFAULT_LANGUAGE;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for excluded paths
    if (isExcludedPath(pathname)) {
        return NextResponse.next();
    }

    // Skip for API routes
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Check if the pathname already has a language prefix
    const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    
    if (!langMatch) {
        // No language prefix found, redirect to default language
        const preferredLang = getPreferredLanguage(request);
        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLang}${pathname}`;
        
        const response = NextResponse.redirect(url);
        
        // Set cookie for future requests
        response.cookies.set('preferred-language', preferredLang, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });

        return response;
    }

    const currentLang = langMatch[1];
    
    // Validate language
    if (!SUPPORTED_LANGUAGES.includes(currentLang)) {
        // Invalid language, redirect to default
        const url = request.nextUrl.clone();
        url.pathname = url.pathname.replace(/^\/[a-z]{2}/, `/${DEFAULT_LANGUAGE}`);
        return NextResponse.redirect(url);
    }

    // Check if user has a preferred language different from current
    const preferredLang = getPreferredLanguage(request);
    const savedLang = request.cookies.get('preferred-language')?.value;
    
    if (savedLang && savedLang !== currentLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        // User has a saved preference that differs from current URL
        const url = request.nextUrl.clone();
        url.pathname = url.pathname.replace(/^\/[a-z]{2}/, `/${savedLang}`);
        return NextResponse.redirect(url);
    }

    // Add language to response headers for client-side access
    const response = NextResponse.next();
    response.headers.set('x-current-language', currentLang);
    
    return response;
}

// Configure which paths this middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};