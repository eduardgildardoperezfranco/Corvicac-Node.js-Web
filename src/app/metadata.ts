import { Metadata } from 'next';
import { META_TAGS } from '@/lib/constants';

export const metadata: Metadata = {
    title: {
        default: META_TAGS.DEFAULT_TITLE,
        template: META_TAGS.TITLE_TEMPLATE,
    },
    description: META_TAGS.DEFAULT_DESCRIPTION,
    keywords: META_TAGS.DEFAULT_KEYWORDS.split(', '),
    authors: [{ name: META_TAGS.AUTHOR }],
    creator: META_TAGS.AUTHOR,
    publisher: 'CORVICAC',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://corvicac.org'),
    alternates: {
        canonical: '/',
        languages: {
            'es-CO': '/es',
            'en': '/en',
            'fr': '/fr',
            'pt': '/pt',
            'de': '/de',
            'it': '/it',
            'zh': '/zh',
            'ja': '/ja',
            'ar': '/ar',
            'ru': '/ru',
        },
    },
    openGraph: {
        type: META_TAGS.OPEN_GRAPH.TYPE,
        locale: META_TAGS.OPEN_GRAPH.LOCALE,
        url: 'https://corvicac.org',
        title: META_TAGS.DEFAULT_TITLE,
        description: META_TAGS.DEFAULT_DESCRIPTION,
        siteName: META_TAGS.OPEN_GRAPH.SITE_NAME,
        images: [
            {
                url: META_TAGS.OPEN_GRAPH.IMAGE,
                width: META_TAGS.OPEN_GRAPH.IMAGE_WIDTH,
                height: META_TAGS.OPEN_GRAPH.IMAGE_HEIGHT,
                alt: 'CORVICAC - Ayuda Humanitaria y Apoyo Fiscal a Víctimas del Conflicto en Colombia',
            },
        ],
    },
    twitter: {
        card: META_TAGS.TWITTER.CARD,
        title: META_TAGS.DEFAULT_TITLE,
        description: META_TAGS.DEFAULT_DESCRIPTION,
        images: [META_TAGS.TWITTER.IMAGE],
        creator: META_TAGS.TWITTER.CREATOR,
        site: META_TAGS.TWITTER.SITE,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/icon.png', type: 'image/png', sizes: '32x32' },
            { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
            { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
            { url: '/apple-icon.png', type: 'image/png', sizes: '180x180', rel: 'apple-touch-icon' },
        ],
    },
    manifest: '/manifest.json',
    other: {
        'theme-color': '#1E7F43',
        'msapplication-TileColor': '#1E7F43',
        'charset': META_TAGS.CHARSET,
    },
    verification: {
        google: META_TAGS.VERIFICATION.GOOGLE,
        yandex: META_TAGS.VERIFICATION.YANDEX,
        bing: META_TAGS.VERIFICATION.BING,
    },
    category: 'nonprofit',
};
