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
            // Destructure to separate @type from other properties to avoid duplication
            const { '@type': orgType, ...restOfOrg } = META_TAGS.ORGANIZATION;
            // Also remove @type from data to prevent conflicts
            const { '@type': dataType, ...cleanData } = data;
            return {
                '@type': 'NGO', // Use the explicit type for this component
                ...restOfOrg, // Spread the remaining properties from META_TAGS.ORGANIZATION (includes @context)
                ...cleanData, // Spread custom data without @type conflicts
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': data.url || '',
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
            // Remove @type from data to prevent conflicts
            const { '@type': dataType, ...cleanData } = data;
            return {
                '@context': 'https://schema.org',
                '@type': type,
                headline: cleanData.headline || '',
                description: cleanData.description || '',
                image: cleanData.image || [],
                datePublished: cleanData.datePublished || '',
                dateModified: cleanData.dateModified || '',
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
                    '@id': cleanData.url || '',
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
            // Remove @type from data to prevent conflicts
            const { '@type': dataType, ...cleanData } = data;
            return {
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: cleanData.name || '',
                description: cleanData.description || '',
                startDate: cleanData.startDate || '',
                endDate: cleanData.endDate || '',
                location: cleanData.location || {},
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
                offers: cleanData.offers || {},
            };
        } else if (type === 'WebPage') {
            // Remove @type from data to prevent conflicts
            const { '@type': dataType, ...cleanData } = data;
            return {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: cleanData.name || '',
                description: cleanData.description || '',
                url: cleanData.url || '',
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
    };

    const structuredData = getStructuredData();

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
}