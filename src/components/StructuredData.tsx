'use client';

import Head from 'next/head';
import { META_TAGS } from '@/lib/constants';

interface StructuredDataProps {
    type?: 'NGO' | 'Article' | 'Event' | 'NewsArticle' | 'WebPage';
    data?: Record<string, any>;
}

export default function StructuredData({ type = 'NGO', data = {} }: StructuredDataProps) {
    const getStructuredData = () => {
        if (type === 'NGO') {
            return {
                '@context': 'https://schema.org',
                '@type': 'NGO',
                ...META_TAGS.ORGANIZATION,
                ...data,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://corvicac.org',
                },
                knowsAbout: [
                    'Conflicto armado en Colombia',
                    'Víctimas del conflicto',
                    'Derechos humanos',
                    'Justicia transicional',
                    'Reparación a víctimas',
                    'Ayuda humanitaria',
                    'Apoyo fiscal a víctimas',
                    'Reintegración social',
                    'Restitución de tierras',
                    'Paz total en Colombia',
                    'Proceso de paz',
                    'Desplazamiento forzado',
                    'Crisis humanitaria',
                ],
                areaServed: {
                    '@type': 'Country',
                    name: 'Colombia',
                },
                slogan: 'Justicia, Igualdad, Respeto',
                foundingDate: '2010',
                taxID: '900.000.000-0',
                nonprofitStatus: '501(c)(3) Equivalent',
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Servicios para Víctimas del Conflicto Armado',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Asesoría Legal',
                                description: 'Asistencia legal para víctimas del conflicto armado',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Apoyo Psicológico',
                                description: 'Atención psicológica para víctimas del conflicto',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Restitución de Tierras',
                                description: 'Asistencia en procesos de restitución de tierras',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Formación y Capacitación',
                                description: 'Programas educativos para víctimas del conflicto',
                            },
                        },
                    ],
                },
            };
        } else if (type === 'Article' || type === 'NewsArticle') {
            return {
                '@context': 'https://schema.org',
                '@type': type,
                headline: data.headline || '',
                description: data.description || '',
                image: data.image || [],
                datePublished: data.datePublished || '',
                dateModified: data.dateModified || '',
                author: {
                    '@type': 'Organization',
                    name: 'CORVICAC',
                    url: 'https://corvicac.org',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'CORVICAC',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://corvicac.org/images/logo.png',
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': data.url || '',
                },
                about: [
                    'Conflicto armado en Colombia',
                    'Víctimas del conflicto',
                    'Derechos humanos',
                    'Justicia transicional',
                ],
                inLanguage: 'es-CO',
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'CORVICAC',
                    url: 'https://corvicac.org',
                },
            };
        } else if (type === 'Event') {
            return {
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: data.name || '',
                description: data.description || '',
                startDate: data.startDate || '',
                endDate: data.endDate || '',
                location: data.location || {},
                organizer: {
                    '@type': 'Organization',
                    name: 'CORVICAC',
                    url: 'https://corvicac.org',
                },
                about: [
                    'Conflicto armado en Colombia',
                    'Víctimas del conflicto',
                    'Derechos humanos',
                ],
                inLanguage: 'es-CO',
                offers: data.offers || {},
            };
        } else if (type === 'WebPage') {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: data.name || '',
                description: data.description || '',
                url: data.url || '',
                mainEntity: META_TAGS.ORGANIZATION,
                about: [
                    'Conflicto armado en Colombia',
                    'Víctimas del conflicto',
                    'Derechos humanos',
                    'Justicia transicional',
                    'Reparación a víctimas',
                    'Ayuda humanitaria',
                    'Apoyo fiscal a víctimas',
                ],
                inLanguage: 'es-CO',
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'CORVICAC',
                    url: 'https://corvicac.org',
                },
                dateModified: new Date().toISOString(),
            };
        }
        return {};
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(getStructuredData()),
            }}
        />
    );
}
