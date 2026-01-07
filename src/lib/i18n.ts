// Sistema de Internacionalización (i18n) para CORVICAC
// Soporte UTF-8 y múltiples idiomas para alcance global

export type Language = 'es' | 'en' | 'fr' | 'de' | 'pt' | 'it' | 'ar' | 'zh' | 'ja' | 'ru';

export interface Translations {
    // Metadata
    metadata: {
        title: string;
        description: string;
        keywords: string;
    };

    // Navigation
    nav: {
        home: string;
        about: string;
        projects: string;
        programs: string;
        support: string;
    };

    // Common
    common: {
        donate: string;
        learnMore: string;
        contact: string;
        back: string;
        close: string;
        loading: string;
        error: string;
        success: string;
        warning: string;
        info: string;
        currency: string;
        people: string;
        families: string;
        projects: string;
        programs: string;
        countries: string;
        years: string;
        months: string;
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };

    // Hero Section
    hero: {
        title: string;
        subtitle: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
        stats: {
            people: string;
            projects: string;
            success: string;
            countries: string;
        };
    };

    // About Section
    about: {
        title: string;
        mission: string;
        vision: string;
        values: string;
        history: string;
    };

    // Projects
    projects: {
        title: string;
        filterByCategory: string;
        filterByStatus: string;
        status: {
            active: string;
            planned: string;
            inProgress: string;
            atRisk: string;
            completed: string;
        };
        categories: {
            justice: string;
            education: string;
            economic: string;
            health: string;
            housing: string;
            agriculture: string;
        };
        projectDetails: {
            duration: string;
            budget: string;
            beneficiaries: string;
            startDate: string;
            endDate: string;
            impact: string;
            details: string;
            support: string;
        };
    };

    // Programs
    programs: {
        title: string;
        filterByCategory: string;
        filterByStatus: string;
        categories: {
            justice: string;
            mentalHealth: string;
            economic: string;
            education: string;
            social: string;
            rural: string;
            gender: string;
            youth: string;
        };
        programDetails: {
            duration: string;
            monthlyCost: string;
            beneficiaries: string;
            impact: string;
            costPerBeneficiary: string;
            knowProgram: string;
            support: string;
        };
    };

    // Support Page
    support: {
        hero: {
            title: string;
            subtitle: string;
            description: string;
            onlineSponsors: string;
            ctaPrimary: string;
            ctaSecondary: string;
        };
        impactStories: {
            title: string;
            description: string;
            before: string;
            after: string;
        };
        internationalCertification: {
            title: string;
            description: string;
            selectCountry: string;
            taxDeduction: string;
            certificationType: string;
            legalFramework: string;
            processingTime: string;
            benefits: {
                global: string;
                premium: string;
                legal: string;
                fast: string;
            };
        };
        sponsorshipTiers: {
            title: string;
            description: string;
            psychologicalTriggers: string;
            certificationLevel: string;
        };
        form: {
            title: string;
            description: string;
            fullName: string;
            company: string;
            email: string;
            phone: string;
            taxId: string;
            address: string;
            country: string;
            amount: string;
            message: string;
            submit: string;
            freeConsultation: string;
            summary: {
                title: string;
                amount: string;
                savings: string;
                effectiveCost: string;
                rate: string;
            };
        };
        testimonials: {
            title: string;
            description: string;
        };
        finalCta: {
            title: string;
            description: string;
            urgency: string;
            express: string;
            global: string;
            premium: string;
            disclaimer: string;
        };
    };

    // Footer
    footer: {
        contact: string;
        address: string;
        phone: string;
        email: string;
        social: string;
        newsletter: string;
        subscribe: string;
        copyright: string;
    };

    // Accessibility
    aria: {
        skipToContent: string;
        mainNavigation: string;
        mobileMenu: string;
        openMenu: string;
        closeMenu: string;
        image: string;
        video: string;
        audio: string;
    };

    // Error Messages
    errors: {
        general: string;
        notFound: string;
        network: string;
        validation: {
            required: string;
            email: string;
            phone: string;
            amount: string;
            minAmount: string;
        };
    };

    // Success Messages
    success: {
        donation: string;
        contact: string;
        subscription: string;
    };
}

// Traducciones completas en UTF-8 para cada idioma
export const translations: Record<Language, Translations> = {
    es: {
        metadata: {
            title: "CORVICAC - Corporación de Víctimas del Conflicto Armado Colombiano",
            description: "Organización sin ánimo de lucro que apoya a víctimas del conflicto armado colombiano. Justicia, paz y reconciliación.",
            keywords: "CORVICAC, víctimas, conflicto armado, justicia, paz, Colombia, derechos humanos, desplazamiento forzado"
        },
        nav: {
            home: "Inicio",
            about: "Nosotros",
            projects: "Proyectos",
            programs: "Programas",
            support: "Apoyar"
        },
        common: {
            donate: "Donar",
            learnMore: "Conocer más",
            contact: "Contacto",
            back: "Atrás",
            close: "Cerrar",
            loading: "Cargando...",
            error: "Error",
            success: "Éxito",
            warning: "Advertencia",
            info: "Información",
            currency: "COP",
            people: "personas",
            families: "familias",
            projects: "proyectos",
            programs: "programas",
            countries: "países",
            years: "años",
            months: "meses",
            days: "días",
            hours: "horas",
            minutes: "minutos",
            seconds: "segundos"
        },
        hero: {
            title: "Transforme Vidas, Transforme el Mundo",
            subtitle: "Su Legado Comienza Aquí",
            description: "Cada segundo que pasa, 3 personas pierden su hogar por desplazamiento forzado. Pero con su apoyo, podemos convertir ese dolor en esperanza, esa desesperación en dignidad, y crear un futuro donde todos tengan una oportunidad real de prosperar.",
            ctaPrimary: "🌟 Convertirse en Ángel Guardian",
            ctaSecondary: "📞 Asesoría Internacional Gratis",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Conoce Nuestra Historia",
            mission: "Misión",
            vision: "Visión",
            values: "Valores",
            history: "Historia"
        },
        projects: {
            title: "Nuestros Proyectos Transformadores",
            filterByCategory: "Filtrar por categoría",
            filterByStatus: "Filtrar por estado",
            status: {
                active: "Activo",
                planned: "Planeado",
                inProgress: "En Ejecución",
                atRisk: "En Riesgo",
                completed: "Finalizado"
            },
            categories: {
                justice: "Justicia y Derechos",
                education: "Educación",
                economic: "Desarrollo Económico",
                health: "Salud",
                housing: "Vivienda",
                agriculture: "Agricultura"
            },
            projectDetails: {
                duration: "Duración",
                budget: "Presupuesto",
                beneficiaries: "Beneficiarios",
                startDate: "Inicio",
                endDate: "Finalización",
                impact: "Impacto Esperado",
                details: "Conocer Proyecto",
                support: "Apoyar"
            }
        },
        programs: {
            title: "Nuestros Programas de Transformación",
            filterByCategory: "Filtrar por categoría",
            filterByStatus: "Filtrar por estado",
            categories: {
                justice: "Justicia y Derechos",
                mentalHealth: "Salud Mental",
                economic: "Desarrollo Económico",
                education: "Educación",
                social: "Inclusión Social",
                rural: "Desarrollo Rural",
                gender: "Género y Equidad",
                youth: "Juventud"
            },
            programDetails: {
                duration: "Duración",
                monthlyCost: "Costo Mensual",
                beneficiaries: "Población Objetivo",
                impact: "Impacto Esperado",
                costPerBeneficiary: "Costo por Beneficiario",
                knowProgram: "Conocer Programa",
                support: "Apoyar"
            }
        },
        support: {
            hero: {
                title: "Transforme Vidas, Transforme el Mundo",
                subtitle: "Su Legado Comienza Aquí",
                description: "Cada segundo que pasa, 3 personas pierden su hogar por desplazamiento forzado. Pero con su apoyo, podemos convertir ese dolor en esperanza, esa desesperación en dignidad, y crear un futuro donde todos tengan una oportunidad real de prosperar.",
                onlineSponsors: "En línea ahora: 237 patrocinadores activos",
                ctaPrimary: "🌟 Convertirse en Ángel Guardian",
                ctaSecondary: "📞 Asesoría Internacional Gratis"
            },
            impactStories: {
                title: "Historias que Conmueven, Resultados que Transforman",
                description: "Estas no son solo estadísticas, son vidas reales que cambiaron para siempre",
                before: "Antes",
                after: "Después"
            },
            internationalCertification: {
                title: "Sistema Internacional de Certificación Fiscal",
                description: "Maximice sus beneficios fiscales en cualquier país del mundo. Nuestro sistema de certificación internacional le garantiza ahorros reales y cumplimiento legal en más de 50 países.",
                selectCountry: "Seleccione su País",
                taxDeduction: "Deducción Fiscal Estimada",
                certificationType: "Tipo de Certificación",
                legalFramework: "Marco Legal",
                processingTime: "Tiempo de Procesamiento",
                benefits: {
                    global: "Cobertura Global - Sin fronteras",
                    premium: "Asesoría Premium - Personalizada",
                    legal: "Documentación Legal - Completa y certificada",
                    fast: "Procesamiento Rápido - 24-72 horas"
                }
            },
            sponsorshipTiers: {
                title: "Escoja su Nivel de Impacto Transformador",
                description: "Cada nivel está diseñado para maximizar su satisfacción, reconocimiento y beneficios fiscales",
                psychologicalTriggers: "Gatillos Psicológicos",
                certificationLevel: "Certificación"
            },
            form: {
                title: "¿Prefiere un Plan Personalizado?",
                description: "Complete el formulario y reciba una asesoría fiscal internacional gratuita. Nuestro equipo le ayudará a maximizar sus beneficios y crear un plan de impacto a su medida.",
                fullName: "Nombre Completo *",
                company: "Empresa/Organización",
                email: "Correo Electrónico *",
                phone: "Teléfono de Contacto *",
                taxId: "Número de Identificación Fiscal *",
                address: "Dirección Fiscal Completa *",
                country: "País de Residencia Fiscal *",
                amount: "Monto de Patrocinio (COP)",
                message: "Mensaje Específico o Proyecto de Interés",
                submit: "🚀 Enviar Solicitud de Patrocinio Premium",
                freeConsultation: "📞 Solicitar Asesoría Gratis",
                summary: {
                    title: "Resumen de Beneficios Fiscales",
                    amount: "Monto Patrocinado:",
                    savings: "Ahorro Fiscal Estimado:",
                    effectiveCost: "Costo Efectivo:",
                    rate: "Tasa de Deducción:"
                }
            },
            testimonials: {
                title: "Voces de Nuestros Aliados Internacionales",
                description: "Lo que dicen quienes ya transformaron sus vidas patrocinando con CORVICAC"
            },
            finalCta: {
                title: "El Momento es Ahora",
                description: "No espere a que otros transformen el mundo. Únase a nuestra red exclusiva de filántropos internacionales y conviértase en protagonista de historias de superación, dignidad y esperanza que trascienden fronteras.",
                urgency: "¡ÚLTIMAS 24 HORAS! - 15% adicional en beneficios fiscales",
                express: "Procesamiento Express - 24-48 horas",
                global: "Cobertura Global - 50+ países",
                premium: "Asesoría Premium - Sin costo adicional",
                disclaimer: "*Oferta válida por tiempo limitado. Certificación fiscal sujeta a requisitos legales de cada país. Ahorros reales dependen de la legislación fiscal vigente."
            }
        },
        footer: {
            contact: "Contacto",
            address: "Dirección",
            phone: "Teléfono",
            email: "Correo Electrónico",
            social: "Redes Sociales",
            newsletter: "Boletín Informativo",
            subscribe: "Suscribirse",
            copyright: "Derechos de autor"
        },
        aria: {
            skipToContent: "Saltar al contenido",
            mainNavigation: "Menú de navegación",
            mobileMenu: "Menú móvil",
            openMenu: "Abrir menú",
            closeMenu: "Cerrar menú",
            image: "Imagen",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
            notFound: "Página no encontrada",
            network: "Error de red. Verifique su conexión.",
            validation: {
                required: "Este campo es requerido",
                email: "Por favor, ingrese un correo electrónico válido",
                phone: "Por favor, ingrese un número de teléfono válido",
                amount: "Por favor, ingrese un monto válido",
                minAmount: "El monto mínimo es $5,000,000 COP"
            }
        },
        success: {
            donation: "¡Gracias por su donación! Un asesor se pondrá en contacto pronto.",
            contact: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto.",
            subscription: "¡Suscripción exitosa! Recibirá novedades en su correo."
        }
    },

    en: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    },

    fr: {
        metadata: {
            title: "CORVICAC - Corporation des Victimes du Conflit Armé Colombien",
            description: "Organisation à but non lucratif qui soutient les victimes du conflit armé colombien. Justice, paix et réconciliation.",
            keywords: "CORVICAC, victimes, conflit armé, justice, paix, Colombie, droits humains, déplacement forcé"
        },
        nav: {
            home: "Accueil",
            about: "À Propos",
            projects: "Projets",
            programs: "Programmes",
            support: "Soutenir"
        },
        common: {
            donate: "Faire un Don",
            learnMore: "En Savoir Plus",
            contact: "Contact",
            back: "Retour",
            close: "Fermer",
            loading: "Chargement...",
            error: "Erreur",
            success: "Succès",
            warning: "Avertissement",
            info: "Information",
            currency: "COP",
            people: "personnes",
            families: "familles",
            projects: "projets",
            programs: "programmes",
            countries: "pays",
            years: "années",
            months: "mois",
            days: "jours",
            hours: "heures",
            minutes: "minutes",
            seconds: "secondes"
        },
        hero: {
            title: "Transformez des Vies, Transformez le Monde",
            subtitle: "Votre Héritage Commence Ici",
            description: "Chaque seconde, 3 personnes perdent leur foyer à cause du déplacement forcé. Mais avec votre soutien, nous pouvons transformer cette douleur en espoir, ce désespoir en dignité, et créer un avenir où chacun a une véritable opportunité de prospérer.",
            ctaPrimary: "🌟 Devenir un Ange Gardien",
            ctaSecondary: "📞 Consultation Internationale Gratuite",
            stats: {
                people: "8 000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Connaître Notre Histoire",
            mission: "Mission",
            vision: "Vision",
            values: "Valeurs",
            history: "Histoire"
        },
        projects: {
            title: "Nos Projets Transformateurs",
            filterByCategory: "Filtrer par catégorie",
            filterByStatus: "Filtrer par statut",
            status: {
                active: "Actif",
                planned: "Planifié",
                inProgress: "En Cours",
                atRisk: "En Danger",
                completed: "Terminé"
            },
            categories: {
                justice: "Justice et Droits",
                education: "Éducation",
                economic: "Développement Économique",
                health: "Santé",
                housing: "Logement",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Durée",
                budget: "Budget",
                beneficiaries: "Bénéficiaires",
                startDate: "Début",
                endDate: "Fin",
                impact: "Impact Attendu",
                details: "En Savoir Plus",
                support: "Soutenir"
            }
        },
        programs: {
            title: "Nos Programmes de Transformation",
            filterByCategory: "Filtrer par catégorie",
            filterByStatus: "Filtrer par statut",
            categories: {
                justice: "Justice et Droits",
                mentalHealth: "Santé Mentale",
                economic: "Développement Économique",
                education: "Éducation",
                social: "Inclusion Sociale",
                rural: "Développement Rural",
                gender: "Genre et Équité",
                youth: "Jeunesse"
            },
            programDetails: {
                duration: "Durée",
                monthlyCost: "Coût Mensuel",
                beneficiaries: "Population Cible",
                impact: "Impact Attendu",
                costPerBeneficiary: "Coût par Bénéficiaire",
                knowProgram: "En Savoir Plus",
                support: "Soutenir"
            }
        },
        support: {
            hero: {
                title: "Transformez des Vies, Transformez le Monde",
                subtitle: "Votre Héritage Commence Ici",
                description: "Chaque seconde, 3 personnes perdent leur foyer à cause du déplacement forcé. Mais avec votre soutien, nous pouvons transformer cette douleur en espoir, ce désespoir en dignité, et créer un avenir où chacun a une véritable opportunité de prospérer.",
                onlineSponsors: "En ligne maintenant : 237 sponsors actifs",
                ctaPrimary: "🌟 Devenir un Ange Gardien",
                ctaSecondary: "📞 Consultation Internationale Gratuite"
            },
            impactStories: {
                title: "Histoires qui Touchent, Résultats qui Transforment",
                description: "Ce ne sont pas seulement des statistiques, ce sont des vies réelles qui ont changé pour toujours",
                before: "Avant",
                after: "Après"
            },
            internationalCertification: {
                title: "Système de Certification Fiscale Internationale",
                description: "Maximisez vos avantages fiscaux dans n'importe quel pays du monde. Notre système de certification internationale vous garantit des économies réelles et la conformité légale dans plus de 50 pays.",
                selectCountry: "Sélectionnez Votre Pays",
                taxDeduction: "Déduction Fiscale Estimée",
                certificationType: "Type de Certification",
                legalFramework: "Cadre Légal",
                processingTime: "Délai de Traitement",
                benefits: {
                    global: "Couverture Globale - Sans frontières",
                    premium: "Conseil Premium - Personnalisé",
                    legal: "Documentation Légale - Complète et certifiée",
                    fast: "Traitement Rapide - 24-72 heures"
                }
            },
            sponsorshipTiers: {
                title: "Choisissez Votre Niveau d'Impact Transformateur",
                description: "Chaque niveau est conçu pour maximiser votre satisfaction, votre reconnaissance et vos avantages fiscaux",
                psychologicalTriggers: "Déclencheurs Psychologiques",
                certificationLevel: "Certification"
            },
            form: {
                title: "Préférez un Plan Personnalisé ?",
                description: "Complétez le formulaire et recevez une consultation fiscale internationale gratuite. Notre équipe vous aidera à maximiser vos avantages et à créer un plan d'impact sur mesure.",
                fullName: "Nom Complet *",
                company: "Entreprise/Organisation",
                email: "Adresse Email *",
                phone: "Numéro de Téléphone *",
                taxId: "Numéro d'Identification Fiscale *",
                address: "Adresse Fiscale Complète *",
                country: "Pays de Résidence Fiscale *",
                amount: "Montant du Parrainage (COP)",
                message: "Message Spécifique ou Projet d'Intérêt",
                submit: "🚀 Envoyer la Demande de Parrainage Premium",
                freeConsultation: "📞 Demander une Consultation Gratuite",
                summary: {
                    title: "Résumé des Avantages Fiscaux",
                    amount: "Montant Parrainé:",
                    savings: "Économies Fiscales Estimées:",
                    effectiveCost: "Coût Effectif:",
                    rate: "Taux de Déduction:"
                }
            },
            testimonials: {
                title: "Voix de Nos Alliés Internationaux",
                description: "Ce que disent ceux qui ont déjà transformé leurs vies en parrainant avec CORVICAC"
            },
            finalCta: {
                title: "Le Moment est Maintenant",
                description: "N'attendez pas que d'autres transforment le monde. Rejoignez notre réseau exclusif de philanthropes internationaux et devenez le protagoniste d'histoires de dépassement, de dignité et d'espoir qui transcendent les frontières.",
                urgency: "DERNIÈRES 24 HEURES ! - 15% d'avantages fiscaux supplémentaires",
                express: "Traitement Express - 24-48 heures",
                global: "Couverture Globale - 50+ pays",
                premium: "Conseil Premium - Sans coût supplémentaire",
                disclaimer: "*Offre pour durée limitée. Certification fiscale soumise aux exigences légales de chaque pays. Économies réelles dépendent de la législation fiscale en vigueur."
            }
        },
        footer: {
            contact: "Contact",
            address: "Adresse",
            phone: "Téléphone",
            email: "Email",
            social: "Réseaux Sociaux",
            newsletter: "Bulletin d'Information",
            subscribe: "S'abonner",
            copyright: "Droits d'Auteur"
        },
        aria: {
            skipToContent: "Aller au contenu",
            mainNavigation: "Navigation principale",
            mobileMenu: "Menu mobile",
            openMenu: "Ouvrir le menu",
            closeMenu: "Fermer le menu",
            image: "Image",
            video: "Vidéo",
            audio: "Audio"
        },
        errors: {
            general: "Une erreur s'est produite. Veuillez réessayer.",
            notFound: "Page non trouvée",
            network: "Erreur réseau. Veuillez vérifier votre connexion.",
            validation: {
                required: "Ce champ est requis",
                email: "Veuillez saisir une adresse email valide",
                phone: "Veuillez saisir un numéro de téléphone valide",
                amount: "Veuillez saisir un montant valide",
                minAmount: "Le montant minimum est de 5 000 000 COP"
            }
        },
        success: {
            donation: "Merci pour votre don ! Un conseiller vous contactera bientôt.",
            contact: "Message envoyé avec succès. Nous vous contacterons bientôt.",
            subscription: "Abonnement réussi ! Vous recevrez des actualités par email."
        }
    },

    de: {
        metadata: {
            title: "CORVICAC - Körperschaft der kolumbianischen Konfliktopfer",
            description: "Non-profit-Organisation, die Opfern des kolumbianischen bewaffneten Konflikts hilft. Gerechtigkeit, Frieden und Versöhnung.",
            keywords: "CORVICAC, Opfer, bewaffneter Konflikt, Gerechtigkeit, Frieden, Kolumbien, Menschenrechte, erzwungene Vertreibung"
        },
        nav: {
            home: "Startseite",
            about: "Über Uns",
            projects: "Projekte",
            programs: "Programme",
            support: "Unterstützen"
        },
        common: {
            donate: "Spenden",
            learnMore: "Mehr erfahren",
            contact: "Kontakt",
            back: "Zurück",
            close: "Schließen",
            loading: "Wird geladen...",
            error: "Fehler",
            success: "Erfolg",
            warning: "Warnung",
            info: "Information",
            currency: "COP",
            people: "Personen",
            families: "Familien",
            projects: "Projekte",
            programs: "Programme",
            countries: "Länder",
            years: "Jahre",
            months: "Monate",
            days: "Tage",
            hours: "Stunden",
            minutes: "Minuten",
            seconds: "Sekunden"
        },
        hero: {
            title: "Verändern Sie Leben, verändern Sie die Welt",
            subtitle: "Ihr Vermächtnis beginnt hier",
            description: "Jede Sekunde verlieren 3 Menschen ihr Zuhause durch erzwungene Vertreibung. Doch mit Ihrer Unterstützung können wir diesen Schmerz in Hoffnung, diese Verzweiflung in Würde verwandeln und eine Zukunft schaffen, in der jeder die echte Chance hat, zu gedeihen.",
            ctaPrimary: "🌟 Ein Himmelsbote werden",
            ctaSecondary: "📞 Kostenlose internationale Beratung",
            stats: {
                people: "8.000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Unsere Geschichte kennenlernen",
            mission: "Mission",
            vision: "Vision",
            values: "Werte",
            history: "Geschichte"
        },
        projects: {
            title: "Unsere Transformationsprojekte",
            filterByCategory: "Nach Kategorie filtern",
            filterByStatus: "Nach Status filtern",
            status: {
                active: "Aktiv",
                planned: "Geplant",
                inProgress: "In Bearbeitung",
                atRisk: "Gefährdet",
                completed: "Abgeschlossen"
            },
            categories: {
                justice: "Gerechtigkeit und Rechte",
                education: "Bildung",
                economic: "Wirtschaftliche Entwicklung",
                health: "Gesundheit",
                housing: "Wohnen",
                agriculture: "Landwirtschaft"
            },
            projectDetails: {
                duration: "Dauer",
                budget: "Budget",
                beneficiaries: "Begünstigte",
                startDate: "Anfang",
                endDate: "Ende",
                impact: "Erwartete Wirkung",
                details: "Mehr erfahren",
                support: "Unterstützen"
            }
        },
        programs: {
            title: "Unsere Transformationsprogramme",
            filterByCategory: "Nach Kategorie filtern",
            filterByStatus: "Nach Status filtern",
            categories: {
                justice: "Gerechtigkeit und Rechte",
                mentalHealth: "Mentale Gesundheit",
                economic: "Wirtschaftliche Entwicklung",
                education: "Bildung",
                social: "Soziale Eingliederung",
                rural: "Ländliche Entwicklung",
                gender: "Geschlecht und Gleichheit",
                youth: "Jugend"
            },
            programDetails: {
                duration: "Dauer",
                monthlyCost: "Monatliche Kosten",
                beneficiaries: "Zielgruppe",
                impact: "Erwartete Wirkung",
                costPerBeneficiary: "Kosten pro Begünstigten",
                knowProgram: "Mehr erfahren",
                support: "Unterstützen"
            }
        },
        support: {
            hero: {
                title: "Verändern Sie Leben, verändern Sie die Welt",
                subtitle: "Ihr Vermächtnis beginnt hier",
                description: "Jede Sekunde verlieren 3 Menschen ihr Zuhause durch erzwungene Vertreibung. Doch mit Ihrer Unterstützung können wir diesen Schmerz in Hoffnung, diese Verzweiflung in Würde verwandeln und eine Zukunft schaffen, in der jeder die echte Chance hat, zu gedeihen.",
                onlineSponsors: "Jetzt online: 237 aktive Sponsoren",
                ctaPrimary: "🌟 Ein Himmelsbote werden",
                ctaSecondary: "📞 Kostenlose internationale Beratung"
            },
            impactStories: {
                title: "Geschichten, die berühren, Ergebnisse, die verwandeln",
                description: "Dies sind keine Statistiken, es sind echte Leben, die für immer verändert wurden",
                before: "Vorher",
                after: "Nachher"
            },
            internationalCertification: {
                title: "Internationales Steuerzertifizierungssystem",
                description: "Maximieren Sie Ihre Steuervorteile in jedem Land der Welt. Unser internationales Zertifizierungssystem garantiert Ihnen echte Einsparungen und gesetzliche Einhaltung in mehr als 50 Ländern.",
                selectCountry: "Wählen Sie Ihr Land",
                taxDeduction: "Geschätzte Steuerabzug",
                certificationType: "Zertifizierungsart",
                legalFramework: "Rechtlicher Rahmen",
                processingTime: "Bearbeitungszeit",
                benefits: {
                    global: "Globale Abdeckung - Ohne Grenzen",
                    premium: "Premium-Beratung - Personalisiert",
                    legal: "Rechtliche Dokumentation - Vollständig und zertifiziert",
                    fast: "Schnelle Bearbeitung - 24-72 Stunden"
                }
            },
            sponsorshipTiers: {
                title: "Wählen Sie Ihre transformative Wirkungsebene",
                description: "Jede Ebene ist darauf ausgelegt, Ihre Zufriedenheit, Anerkennung und Steuervorteile zu maximieren",
                psychologicalTriggers: "Psychologische Auslöser",
                certificationLevel: "Zertifizierung"
            },
            form: {
                title: "Bevorzugen Sie einen maßgeschneiderten Plan?",
                description: "Füllen Sie das Formular aus und erhalten Sie eine kostenlose internationale Steuerberatung. Unser Team hilft Ihnen, Ihre Vorteile zu maximieren und einen maßgeschneiderten Wirkungsplan zu erstellen.",
                fullName: "Vollständiger Name *",
                company: "Unternehmen/Organisation",
                email: "E-Mail-Adresse *",
                phone: "Telefonnummer *",
                taxId: "Steueridentifikationsnummer *",
                address: "Vollständige steuerliche Adresse *",
                country: "Land des steuerlichen Wohnsitzes *",
                amount: "Sponsoringbetrag (COP)",
                message: "Spezifische Nachricht oder Projekt von Interesse",
                submit: "🚀 Premium-Sponsoring-Anfrage senden",
                freeConsultation: "📞 Kostenlose Beratung anfordern",
                summary: {
                    title: "Zusammenfassung der Steuervorteile",
                    amount: "Gesponsorter Betrag:",
                    savings: "Geschätzte Steuereinsparungen:",
                    effectiveCost: "Effektive Kosten:",
                    rate: "Abzugsrate:"
                }
            },
            testimonials: {
                title: "Stimmen unserer internationalen Verbündeten",
                description: "Was diejenigen sagen, die ihre Leben bereits durch Sponsoring mit CORVICAC verwandelt haben"
            },
            finalCta: {
                title: "Der Moment ist jetzt",
                description: "Warten Sie nicht, bis andere die Welt verändern. Treten Sie unserem exklusiven Netzwerk internationaler Philanthropen bei und werden Sie zum Protagonisten von Geschichten des Durchhaltens, der Würde und der Hoffnung, die Grenzen überschreiten.",
                urgency: "LETZTE 24 STUNDEN! - 15% zusätzliche Steuervorteile",
                express: "Express-Bearbeitung - 24-48 Stunden",
                global: "Globale Abdeckung - 50+ Länder",
                premium: "Premium-Beratung - Keine zusätzlichen Kosten",
                disclaimer: "*Zeitlich begrenztes Angebot. Steuerzertifizierung unterliegt den gesetzlichen Anforderungen jedes Landes. Tatsächliche Einsparungen hängen von der geltenden Steuergesetzgebung ab."
            }
        },
        footer: {
            contact: "Kontakt",
            address: "Adresse",
            phone: "Telefon",
            email: "E-Mail",
            social: "Soziale Medien",
            newsletter: "Newsletter",
            subscribe: "Abonnieren",
            copyright: "Urheberrechte"
        },
        aria: {
            skipToContent: "Zum Inhalt springen",
            mainNavigation: "Hauptnavigation",
            mobileMenu: "Mobiles Menü",
            openMenu: "Menü öffnen",
            closeMenu: "Menü schließen",
            image: "Bild",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
            notFound: "Seite nicht gefunden",
            network: "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
            validation: {
                required: "Dieses Feld ist erforderlich",
                email: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
                phone: "Bitte geben Sie eine gültige Telefonnummer ein",
                amount: "Bitte geben Sie einen gültigen Betrag ein",
                minAmount: "Der Mindestbetrag beträgt 5.000.000 COP"
            }
        },
        success: {
            donation: "Vielen Dank für Ihre Spende! Ein Berater wird sich bald mit Ihnen in Verbindung setzen.",
            contact: "Nachricht erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.",
            subscription: "Abonnement erfolgreich! Sie erhalten Neuigkeiten in Ihrem E-Mail-Postfach."
        }
    },

    pt: {
        metadata: {
            title: "CORVICAC - Corporação de Vítimas do Conflito Armado Colombiano",
            description: "Organização sem fins lucrativos que apoia vítimas do conflito armado colombiano. Justiça, paz e reconciliação.",
            keywords: "CORVICAC, vítimas, conflito armado, justiça, paz, Colômbia, direitos humanos, deslocamento forçado"
        },
        nav: {
            home: "Início",
            about: "Sobre Nós",
            projects: "Projetos",
            programs: "Programas",
            support: "Apoiar"
        },
        common: {
            donate: "Doar",
            learnMore: "Saiba Mais",
            contact: "Contato",
            back: "Voltar",
            close: "Fechar",
            loading: "Carregando...",
            error: "Erro",
            success: "Sucesso",
            warning: "Aviso",
            info: "Informação",
            currency: "COP",
            people: "pessoas",
            families: "famílias",
            projects: "projetos",
            programs: "programas",
            countries: "países",
            years: "anos",
            months: "meses",
            days: "dias",
            hours: "horas",
            minutes: "minutos",
            seconds: "segundos"
        },
        hero: {
            title: "Transforme Vidas, Transforme o Mundo",
            subtitle: "Seu Legado Começa Aqui",
            description: "A cada segundo, 3 pessoas perdem seu lar por deslocamento forçado. Mas com seu apoio, podemos transformar essa dor em esperança, esse desespero em dignidade, e criar um futuro onde todos tenham uma oportunidade real de prosperar.",
            ctaPrimary: "🌟 Tornar-se um Anjo da Guarda",
            ctaSecondary: "📞 Consultoria Internacional Gratuita",
            stats: {
                people: "8.000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Conheça Nossa História",
            mission: "Missão",
            vision: "Visão",
            values: "Valores",
            history: "História"
        },
        projects: {
            title: "Nossos Projetos Transformadores",
            filterByCategory: "Filtrar por categoria",
            filterByStatus: "Filtrar por status",
            status: {
                active: "Ativo",
                planned: "Planejado",
                inProgress: "Em Andamento",
                atRisk: "Em Risco",
                completed: "Concluído"
            },
            categories: {
                justice: "Justiça e Direitos",
                education: "Educação",
                economic: "Desenvolvimento Econômico",
                health: "Saúde",
                housing: "Habitação",
                agriculture: "Agricultura"
            },
            projectDetails: {
                duration: "Duração",
                budget: "Orçamento",
                beneficiaries: "Beneficiários",
                startDate: "Início",
                endDate: "Término",
                impact: "Impacto Esperado",
                details: "Conhecer Projeto",
                support: "Apoiar"
            }
        },
        programs: {
            title: "Nossos Programas de Transformação",
            filterByCategory: "Filtrar por categoria",
            filterByStatus: "Filtrar por status",
            categories: {
                justice: "Justiça e Direitos",
                mentalHealth: "Saúde Mental",
                economic: "Desenvolvimento Econômico",
                education: "Educação",
                social: "Inclusão Social",
                rural: "Desenvolvimento Rural",
                gender: "Gênero e Equidade",
                youth: "Juventude"
            },
            programDetails: {
                duration: "Duração",
                monthlyCost: "Custo Mensal",
                beneficiaries: "População-alvo",
                impact: "Impacto Esperado",
                costPerBeneficiary: "Custo por Beneficiário",
                knowProgram: "Conhecer Programa",
                support: "Apoiar"
            }
        },
        support: {
            hero: {
                title: "Transforme Vidas, Transforme o Mundo",
                subtitle: "Seu Legado Começa Aqui",
                description: "A cada segundo, 3 pessoas perdem seu lar por deslocamento forçado. Mas com seu apoio, podemos transformar essa dor em esperança, esse desespero em dignidade, e criar um futuro onde todos tenham uma oportunidade real de prosperar.",
                onlineSponsors: "Online agora: 237 patrocinadores ativos",
                ctaPrimary: "🌟 Tornar-se um Anjo da Guarda",
                ctaSecondary: "📞 Consultoria Internacional Gratuita"
            },
            impactStories: {
                title: "Histórias que Comovem, Resultados que Transformam",
                description: "Estas não são apenas estatísticas, são vidas reais que mudaram para sempre",
                before: "Antes",
                after: "Depois"
            },
            internationalCertification: {
                title: "Sistema Internacional de Certificação Fiscal",
                description: "Maximize seus benefícios fiscais em qualquer país do mundo. Nosso sistema de certificação internacional garante economias reais e conformidade legal em mais de 50 países.",
                selectCountry: "Selecione seu País",
                taxDeduction: "Dedução Fiscal Estimada",
                certificationType: "Tipo de Certificação",
                legalFramework: "Arcabouço Legal",
                processingTime: "Tempo de Processamento",
                benefits: {
                    global: "Cobertura Global - Sem fronteiras",
                    premium: "Consultoria Premium - Personalizada",
                    legal: "Documentação Legal - Completa e certificada",
                    fast: "Processamento Rápido - 24-72 horas"
                }
            },
            sponsorshipTiers: {
                title: "Escolha seu Nível de Impacto Transformador",
                description: "Cada nível é projetado para maximizar sua satisfação, reconhecimento e benefícios fiscais",
                psychologicalTriggers: "Gatilhos Psicológicos",
                certificationLevel: "Certificação"
            },
            form: {
                title: "Prefere um Plano Personalizado?",
                description: "Preencha o formulário e receba uma consultoria fiscal internacional gratuita. Nossa equipe ajudará a maximizar seus benefícios e criar um plano de impacto sob medida.",
                fullName: "Nome Completo *",
                company: "Empresa/Organização",
                email: "Endereço de Email *",
                phone: "Número de Telefone *",
                taxId: "Número de Identificação Fiscal *",
                address: "Endereço Fiscal Completo *",
                country: "País de Residência Fiscal *",
                amount: "Valor do Patrocínio (COP)",
                message: "Mensagem Específica ou Projeto de Interesse",
                submit: "🚀 Enviar Solicitação de Patrocínio Premium",
                freeConsultation: "📞 Solicitar Consultoria Gratuita",
                summary: {
                    title: "Resumo dos Benefícios Fiscais",
                    amount: "Valor Patrocinado:",
                    savings: "Economia Fiscal Estimada:",
                    effectiveCost: "Custo Efetivo:",
                    rate: "Taxa de Dedução:"
                }
            },
            testimonials: {
                title: "Vozes de Nossos Aliados Internacionais",
                description: "O que dizem aqueles que já transformaram suas vidas patrocinando com CORVICAC"
            },
            finalCta: {
                title: "O Momento é Agora",
                description: "Não espere que outros transformem o mundo. Junte-se à nossa rede exclusiva de filantropos internacionais e torne-se protagonista de histórias de superação, dignidade e esperança que transcendem fronteiras.",
                urgency: "ÚLTIMAS 24 HORAS! - 15% adicionais em benefícios fiscais",
                express: "Processamento Express - 24-48 horas",
                global: "Cobertura Global - 50+ países",
                premium: "Consultoria Premium - Sem custo adicional",
                disclaimer: "*Oferta por tempo limitado. Certificação fiscal sujeita a requisitos legais de cada país. Economias reais dependem da legislação fiscal vigente."
            }
        },
        footer: {
            contact: "Contato",
            address: "Endereço",
            phone: "Telefone",
            email: "Email",
            social: "Redes Sociais",
            newsletter: "Boletim Informativo",
            subscribe: "Inscrever-se",
            copyright: "Direitos Autorais"
        },
        aria: {
            skipToContent: "Pular para o conteúdo",
            mainNavigation: "Navegação principal",
            mobileMenu: "Menu móvel",
            openMenu: "Abrir menu",
            closeMenu: "Fechar menu",
            image: "Imagem",
            video: "Vídeo",
            audio: "Áudio"
        },
        errors: {
            general: "Ocorreu um erro. Por favor, tente novamente.",
            notFound: "Página não encontrada",
            network: "Erro de rede. Por favor, verifique sua conexão.",
            validation: {
                required: "Este campo é obrigatório",
                email: "Por favor, insira um endereço de email válido",
                phone: "Por favor, insira um número de telefone válido",
                amount: "Por favor, insira um valor válido",
                minAmount: "Valor mínimo é R$ 5.000.000 COP"
            }
        },
        success: {
            donation: "Obrigado pela sua doação! Um consultor entrará em contato em breve.",
            contact: "Mensagem enviada com sucesso. Entraremos em contato em breve.",
            subscription: "Inscrição bem-sucedida! Você receberá novidades no seu email."
        }
    },

    it: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    },
    ar: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    },
    zh: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    },
    ja: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    },
    ru: {
        metadata: {
            title: "CORVICAC - Corporation of Colombian Armed Conflict Victims",
            description: "Non-profit organization supporting victims of the Colombian armed conflict. Justice, peace and reconciliation.",
            keywords: "CORVICAC, victims, armed conflict, justice, peace, Colombia, human rights, forced displacement"
        },
        nav: {
            home: "Home",
            about: "About Us",
            projects: "Projects",
            programs: "Programs",
            support: "Support"
        },
        common: {
            donate: "Donate",
            learnMore: "Learn More",
            contact: "Contact",
            back: "Back",
            close: "Close",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            warning: "Warning",
            info: "Information",
            currency: "COP",
            people: "people",
            families: "families",
            projects: "projects",
            programs: "programs",
            countries: "countries",
            years: "years",
            months: "months",
            days: "days",
            hours: "hours",
            minutes: "minutes",
            seconds: "seconds"
        },
        hero: {
            title: "Transform Lives, Transform the World",
            subtitle: "Your Legacy Starts Here",
            description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
            ctaPrimary: "🌟 Become a Guardian Angel",
            ctaSecondary: "📞 Free International Consultation",
            stats: {
                people: "8,000+",
                projects: "150+",
                success: "95%",
                countries: "50+"
            }
        },
        about: {
            title: "Know Our Story",
            mission: "Mission",
            vision: "Vision",
            values: "Values",
            history: "History"
        },
        projects: {
            title: "Our Transformative Projects",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            status: {
                active: "Active",
                planned: "Planned",
                inProgress: "In Progress",
                atRisk: "At Risk",
                completed: "Completed"
            },
            categories: {
                justice: "Justice and Rights",
                education: "Education",
                economic: "Economic Development",
                health: "Health",
                housing: "Housing",
                agriculture: "Agriculture"
            },
            projectDetails: {
                duration: "Duration",
                budget: "Budget",
                beneficiaries: "Beneficiaries",
                startDate: "Start Date",
                endDate: "End Date",
                impact: "Expected Impact",
                details: "Learn About Project",
                support: "Support"
            }
        },
        programs: {
            title: "Our Transformation Programs",
            filterByCategory: "Filter by category",
            filterByStatus: "Filter by status",
            categories: {
                justice: "Justice and Rights",
                mentalHealth: "Mental Health",
                economic: "Economic Development",
                education: "Education",
                social: "Social Inclusion",
                rural: "Rural Development",
                gender: "Gender and Equity",
                youth: "Youth"
            },
            programDetails: {
                duration: "Duration",
                monthlyCost: "Monthly Cost",
                beneficiaries: "Target Population",
                impact: "Expected Impact",
                costPerBeneficiary: "Cost per Beneficiary",
                knowProgram: "Learn About Program",
                support: "Support"
            }
        },
        support: {
            hero: {
                title: "Transform Lives, Transform the World",
                subtitle: "Your Legacy Starts Here",
                description: "Every second, 3 people lose their home due to forced displacement. But with your support, we can turn that pain into hope, that despair into dignity, and create a future where everyone has a real opportunity to prosper.",
                onlineSponsors: "Online now: 237 active sponsors",
                ctaPrimary: "🌟 Become a Guardian Angel",
                ctaSecondary: "📞 Free International Consultation"
            },
            impactStories: {
                title: "Stories That Move, Results That Transform",
                description: "These are not just statistics, they are real lives that changed forever",
                before: "Before",
                after: "After"
            },
            internationalCertification: {
                title: "International Tax Certification System",
                description: "Maximize your tax benefits in any country in the world. Our international certification system guarantees you real savings and legal compliance in more than 50 countries.",
                selectCountry: "Select Your Country",
                taxDeduction: "Estimated Tax Deduction",
                certificationType: "Certification Type",
                legalFramework: "Legal Framework",
                processingTime: "Processing Time",
                benefits: {
                    global: "Global Coverage - Without borders",
                    premium: "Premium Consulting - Personalized",
                    legal: "Legal Documentation - Complete and certified",
                    fast: "Fast Processing - 24-72 hours"
                }
            },
            sponsorshipTiers: {
                title: "Choose Your Transformative Impact Level",
                description: "Each level is designed to maximize your satisfaction, recognition and tax benefits",
                psychologicalTriggers: "Psychological Triggers",
                certificationLevel: "Certification"
            },
            form: {
                title: "Prefer a Custom Plan?",
                description: "Complete the form and receive a free international tax consultation. Our team will help you maximize your benefits and create an impact plan tailored to your needs.",
                fullName: "Full Name *",
                company: "Company/Organization",
                email: "Email Address *",
                phone: "Phone Number *",
                taxId: "Tax Identification Number *",
                address: "Complete Fiscal Address *",
                country: "Country of Fiscal Residence *",
                amount: "Sponsorship Amount (COP)",
                message: "Specific Message or Project of Interest",
                submit: "🚀 Send Premium Sponsorship Request",
                freeConsultation: "📞 Request Free Consultation",
                summary: {
                    title: "Tax Benefits Summary",
                    amount: "Sponsored Amount:",
                    savings: "Estimated Tax Savings:",
                    effectiveCost: "Effective Cost:",
                    rate: "Deduction Rate:"
                }
            },
            testimonials: {
                title: "Voices of Our International Allies",
                description: "What those who have already transformed their lives sponsoring with CORVICAC say"
            },
            finalCta: {
                title: "The Time is Now",
                description: "Don't wait for others to transform the world. Join our exclusive network of international philanthropists and become the protagonist of stories of overcoming, dignity and hope that transcend borders.",
                urgency: "LAST 24 HOURS! - 15% additional tax benefits",
                express: "Express Processing - 24-48 hours",
                global: "Global Coverage - 50+ countries",
                premium: "Premium Consulting - No additional cost",
                disclaimer: "*Limited time offer. Tax certification subject to legal requirements of each country. Real savings depend on local tax legislation."
            }
        },
        footer: {
            contact: "Contact",
            address: "Address",
            phone: "Phone",
            email: "Email",
            social: "Social Media",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            copyright: "Copyright"
        },
        aria: {
            skipToContent: "Skip to content",
            mainNavigation: "Main navigation",
            mobileMenu: "Mobile menu",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            image: "Image",
            video: "Video",
            audio: "Audio"
        },
        errors: {
            general: "An error occurred. Please try again.",
            notFound: "Page not found",
            network: "Network error. Please check your connection.",
            validation: {
                required: "This field is required",
                email: "Please enter a valid email address",
                phone: "Please enter a valid phone number",
                amount: "Please enter a valid amount",
                minAmount: "Minimum amount is $5,000,000 COP"
            }
        },
        success: {
            donation: "Thank you for your donation! An advisor will contact you soon.",
            contact: "Message sent successfully. We will contact you soon.",
            subscription: "Subscription successful! You will receive updates in your email."
        }
    }
};

// Funciones de utilidad para i18n
export function getLanguageFromUrl(url: string): Language {
    const match = url.match(/\/([a-z]{2})(\/|$)/);
    return (match?.[1] as Language) || 'es';
}

export function setLanguageInUrl(url: string, language: Language): string {
    return url.replace(/\/([a-z]{2})(\/|$)/, `/${language}$2`) || `/${language}`;
}

export function getCurrentLanguage(): Language {
    if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        return getLanguageFromUrl(path);
    }
    return 'es';
}

export function t(key: keyof Translations, language?: Language): Translations[typeof key] {
    const lang = language || getCurrentLanguage();
    return translations[lang][key];
}

export function tNested<T>(path: string, language?: Language): T {
    const lang = language || getCurrentLanguage();
    const keys = path.split('.');
    let result: any = translations[lang];

    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return undefined as T;
        }
    }

    return result as T;
}

// Hook para usar traducciones en componentes
export function useTranslations(language?: Language) {
    const lang = language || getCurrentLanguage();

    return {
        t: (key: keyof Translations) => translations[lang][key],
        tNested: (path: string) => tNested(path, lang),
        language: lang,
        isRTL: ['ar'].includes(lang) // Right-to-Left languages
    };
}

// Lista de idiomas soportados
export const SUPPORTED_LANGUAGES: Language[] = ['es', 'en', 'fr', 'de', 'pt'];

// Mapeo de códigos de idioma a nombres completos
export const LANGUAGE_NAMES: Record<Language, string> = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    pt: 'Português',
    it: 'Italiano',
    ar: 'العربية',
    zh: '中文',
    ja: '日本語',
    ru: 'Русский'
};

// Configuración para metaetiquetas Open Graph y Twitter
export function getOgLocale(language: Language): string {
    const localeMap: Record<Language, string> = {
        es: 'es_ES',
        en: 'en_US',
        fr: 'fr_FR',
        de: 'de_DE',
        pt: 'pt_BR',
        it: 'it_IT',
        ar: 'ar_AR',
        zh: 'zh_CN',
        ja: 'ja_JP',
        ru: 'ru_RU'
    };
    return localeMap[language] || 'es_ES';
}

// Función para detectar el idioma del navegador
export function detectBrowserLanguage(): Language {
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase() as Language;

        if (SUPPORTED_LANGUAGES.includes(langCode)) {
            return langCode;
        }
    }
    return 'es';
}

// Función para formatear monedas según el idioma
export function formatCurrencyLocalized(amount: number, language: Language = 'es'): string {
    const currencyMap: Record<Language, string> = {
        es: 'COP',
        en: 'COP',
        fr: 'COP',
        de: 'COP',
        pt: 'COP',
        it: 'COP',
        ar: 'COP',
        zh: 'COP',
        ja: 'COP',
        ru: 'COP'
    };

    const currency = currencyMap[language];

    // Formateo según el idioma
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    try {
        return new Intl.NumberFormat(language, options).format(amount);
    } catch {
        // Fallback si el formato no es soportado
        return `${currency} ${amount.toLocaleString(language)}`;
    }
}

// Función para formatear fechas según el idioma
export function formatDateLocalized(date: Date | string, language: Language = 'es'): string {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(dateObj);
    } catch {
        return typeof date === 'string' ? date : date.toISOString().split('T')[0];
    }
}

// Función para formatear números según el idioma
export function formatNumberLocalized(number: number, language: Language = 'es'): string {
    try {
        return new Intl.NumberFormat(language).format(number);
    } catch {
        return number.toString();
    }
}

// Función para cargar traducciones dinámicamente (para optimización)
export async function loadTranslations(language: Language): Promise<Translations> {
    // En un escenario real, esto cargaría desde archivos JSON separados
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(translations[language]);
        }, 100);
    });
}

// Validación de UTF-8
export function validateUTF8(text: string): boolean {
    try {
        return unescape(encodeURIComponent(text)) === text;
    } catch {
        return false;
    }
}

// Limpieza de texto para asegurar UTF-8
export function sanitizeUTF8(text: string): string {
    if (!validateUTF8(text)) {
        // Intentar corregir caracteres problemáticos
        return text.replace(/[^\u0000-\uFFFF]/g, '?');
    }
    return text;
}

export function generateAlternates(currentLang: Language, currentPath: string): { canonical: string; languages: Record<string, string> } {
    const alternates: Record<string, string> = {};
    for (const lang of SUPPORTED_LANGUAGES) {
        if (lang !== currentLang) {
            alternates[lang] = currentPath.replace(`/${currentLang}`, `/${lang}`);
        }
    }

    return {
        canonical: currentPath,
        languages: alternates,
    };
}

// Exportación por defecto para compatibilidad
export default {
    translations,
    getLanguageFromUrl,
    setLanguageInUrl,
    getCurrentLanguage,
    t,
    tNested,
    useTranslations,
    SUPPORTED_LANGUAGES,
    LANGUAGE_NAMES,
    getOgLocale,
    detectBrowserLanguage,
    formatCurrencyLocalized,
    formatDateLocalized,
    formatNumberLocalized,
    loadTranslations,
    validateUTF8,
    sanitizeUTF8
};