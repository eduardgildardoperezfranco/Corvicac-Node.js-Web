import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guía de Accesibilidad - CORVICAC',
    description: 'Descubre cómo CORVICAC se compromete con la accesibilidad web. Guía completa de herramientas, configuraciones y estándares WCAG 2.1 AA para una experiencia inclusiva.',
    keywords: [
        'accesibilidad web',
        'herramientas de accesibilidad',
        'WCAG 2.1 AA',
        'CORVICAC accesibilidad',
        'diseño inclusivo',
        'navegación por teclado',
        'lector de pantalla',
        'contraste de colores',
        'tamaño de fuente',
        'modo de lectura'
    ],
    openGraph: {
        title: 'Guía de Accesibilidad - CORVICAC',
        description: 'Comprometidos con la accesibilidad para todos. Descubre nuestras herramientas y configuraciones para una experiencia web inclusiva.',
        url: 'https://corvicac.org/accessibility-guide',
        type: 'website',
        locale: 'es_CO',
        siteName: 'CORVICAC',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Guía de Accesibilidad - CORVICAC',
        description: 'Herramientas y configuraciones para una experiencia web inclusiva y accesible.',
        creator: '@CORVICAC',
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
    alternates: {
        canonical: 'https://corvicac.org/accessibility-guide',
    },
    category: 'technology',
    verification: {
        google: 'your-google-verification-code',
    }
};