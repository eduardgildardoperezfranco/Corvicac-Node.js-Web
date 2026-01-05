'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Form';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { useCurrency } from '@/lib/currency';
import { sendFormViaWhatsApp, sendFormViaWhatsAppEnhanced, getWhatsAppContactUrl } from '@/lib/whatsapp';
import { useTranslations } from '@/lib/i18n';
import { CURRENCIES } from '@/lib/currency';
import { ALL_COUNTRIES, PRIORITY_COUNTRIES } from '@/lib/countries';

interface SponsorshipTier {
    id: string;
    title: string;
    amount: number;
    benefits: string[];
    color: string;
    impact: string;
    subtleIncentives: string[];
    certificationLevel: string;
}

interface ImpactStory {
    id: string;
    title: string;
    description: string;
    before: string;
    after: string;
    image: string;
    quote: string;
    beneficiary: string;
}

const sponsorshipTiers: SponsorshipTier[] = [
    {
        id: 'legacy',
        title: 'Patrocinio Legado Eterno',
        amount: 100000000,
        color: '#FFD700',
        impact: 'Impacto: 1000+ familias, creación de centro educativo permanente',
        certificationLevel: 'Certificación Internacional Nivel Oro',
        subtleIncentives: [
            'Su legado se inscribe en la historia de transformación comunitaria',
            'Acceso a círculos de influencia donde su visión inspira decisiones estratégicas',
            'Oportunidad de presenciar el nacimiento de nuevas generaciones con futuro',
            'Reconocimiento que trasciende el tiempo y se multiplica en cada vida transformada'
        ],
        benefits: [
            'Reconocimiento como Fundador Honorario vitalicio',
            'Centro educativo o comunitario con su nombre',
            'Acceso VIP a todos los eventos internacionales',
            'Reporte de impacto anual con documental profesional',
            'Reunión anual con representantes de la comunidad',
            'Certificación fiscal internacional válida en 50+ países',
            'Publicación de libro de agradecimiento con su historia',
            'Acceso a red exclusiva de filántropos globales',
            'Asesoría personalizada en estrategias de impacto',
            'Visita anual con estadía premium y transporte privado'
        ]
    },
    {
        id: 'visionary',
        title: 'Patrocinio Visionario del Futuro',
        amount: 50000000,
        color: '#C0C0C0',
        impact: 'Impacto: 500 familias, 3 eventos completos + sostenibilidad',
        certificationLevel: 'Certificación Internacional Nivel Plata',
        subtleIncentives: [
            'Su inversión se convierte en semilla de transformación sostenible',
            'Participación en decisiones que definen el rumbo de comunidades enteras',
            'Acceso anticipado a resultados que posicionan su liderazgo social',
            'Presencia en momentos históricos de superación colectiva'
        ],
        benefits: [
            'Reconocimiento como Ángel Guardian Principal',
            'Reporte trimestral con documental y fotos profesionales',
            'Visita anual guiada a proyectos con estadía premium',
            'Logotipo en todos los materiales internacionales',
            'Invitación a cenas de gala con autoridades',
            'Certificado de Responsabilidad Social Global',
            'Mención en medios internacionales',
            'Acceso a eventos de networking exclusivo',
            'Sesión de fotos profesional con beneficiarios',
            'Asesoría en comunicación de su impacto'
        ]
    },
    {
        id: 'transformer',
        title: 'Patrocinio Transformador de Vidas',
        amount: 25000000,
        color: '#CD7F32',
        impact: 'Impacto: 250 familias, 1.5 eventos + seguimiento continuo',
        certificationLevel: 'Certificación Internacional Nivel Bronce',
        subtleIncentives: [
            'Testimonio directo de cómo su apoyo genera cambios tangibles',
            'Conexión auténtica con historias que enriquecen su perspectiva',
            'Reconocimiento en entornos donde su compromiso genera admiración',
            'Acceso a relatos de superación que fortalecen su convicción'
        ],
        benefits: [
            'Reconocimiento como Transformador Social',
            'Reporte semestral detallado con testimonios',
            'Fotografías profesionales de impacto',
            'Logotipo en sección exclusiva de patrocinadores',
            'Invitación a eventos institucionales importantes',
            'Certificado de Impacto Social Certificado',
            'Mención en redes sociales destacadas',
            'Acceso a contenido exclusivo',
            'Sesión de networking con autoridades locales',
            'Material de marketing para su empresa'
        ]
    },
    {
        id: 'supporter',
        title: 'Patrocinio Soporte Vital',
        amount: 10000000,
        color: '#8B7355',
        impact: 'Impacto: 100 familias, kits completos + capacitación',
        certificationLevel: 'Certificación Nacional Estándar',
        subtleIncentives: [
            'Pertenencia a una comunidad que valora el compromiso social',
            'Progresión natural hacia un impacto cada vez más significativo',
            'Reconocimiento que fortalece su reputación en círculos de influencia',
            'Cumplimiento de un propósito que trasciende lo material'
        ],
        benefits: [
            'Reconocimiento como Soporte Vital',
            'Reporte anual de impacto',
            'Acceso a historias de transformación',
            'Nombre en lista de agradecimiento oficial',
            'Newsletter informativa trimestral',
            'Acceso prioritario a voluntariado',
            'Descuentos en eventos',
            'Certificado de Apoyo Humanitario',
            'Material informativo',
            'Invitación a eventos comunitarios'
        ]
    },
    {
        id: 'community',
        title: 'Patrocinio Comunitario Activo',
        amount: 5000000,
        color: '#6B8E23',
        impact: 'Impacto: 50 familias, kits básicos + acompañamiento',
        certificationLevel: 'Certificación Comunitaria',
        subtleIncentives: [
            'Integración a un movimiento de cambio donde cada aporte cuenta',
            'Acceso a oportunidades que amplían su horizonte de influencia',
            'Resultados visibles que refuerzan su convicción de hacer el bien',
            'Participación activa en una red que valora el compromiso compartido'
        ],
        benefits: [
            'Reconocimiento en redes sociales',
            'Reporte de impacto anual',
            'Acceso a contenido exclusivo',
            'Invitación a eventos comunitarios',
            'Material informativo institucional',
            'Certificado de Apoyo Comunitario',
            'Acceso a grupos de voluntariado',
            'Descuentos en capacitaciones',
            'Invitación a jornadas de campo',
            'Acceso a biblioteca virtual'
        ]
    }
];

// Usamos el sistema de países mejorado
const countryTaxInfo = PRIORITY_COUNTRIES;

const impactStories: ImpactStory[] = [
    {
        id: 'maria',
        title: 'María superó el desplazamiento forzado',
        description: 'Una historia de superación y dignidad recuperada',
        before: 'Vivía en condiciones de extrema pobreza tras ser desplazada de su tierra',
        after: 'Hoy dirige una pequeña empresa productiva y ayuda a su comunidad',
        image: '/impact-maria.jpg',
        quote: 'Gracias a este apoyo, volví a soñar y a creer en un futuro mejor para mis hijos',
        beneficiary: 'María Torres, madre cabeza de familia'
    },
    {
        id: 'jose',
        title: 'José encontró su camino a través de la educación',
        description: 'Joven de 18 años rompió el ciclo de pobreza',
        before: 'Abandonó sus estudios para trabajar en condiciones precarias',
        after: 'Estudiante universitario en ingeniería agrícola',
        image: '/impact-jose.jpg',
        quote: 'La educación cambió mi vida y ahora quiero cambiar la de otros',
        beneficiary: 'José Martínez, estudiante universitario'
    },
    {
        id: 'comunidad',
        title: 'La comunidad San José renació',
        description: 'Un pueblo entero transformado por el trabajo conjunto',
        before: 'Carecía de agua potable, energía eléctrica y acceso a educación',
        after: 'Hoy tiene infraestructura digna, eventos productivos y esperanza',
        image: '/impact-comunidad.jpg',
        quote: 'Unidos y con apoyo, hasta los sueños más grandes se hacen realidad',
        beneficiary: 'Comunidad San José de Apartadó'
    }
];

export default function ApoyarPage() {
    const { t } = useTranslations();
    const { currency, setCurrency, convertToUserCurrency, loading: currencyLoading } = useCurrency();

    const [selectedTier, setSelectedTier] = useState<SponsorshipTier | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string>('Colombia');
    const [customAmount, setCustomAmount] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        taxId: '',
        address: '',
        preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
        newsletter: false,
        termsAccepted: false
    });
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [hateSpeechDetected, setHateSpeechDetected] = useState<string | null>(null);
    const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
    const [whatsappModalAction, setWhatsappModalAction] = useState<'join' | 'impact' | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStoryIndex((prev) => (prev + 1) % impactStories.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Hate Speech Detection System
    const detectHateSpeech = (text: string): string | null => {
        if (!text || text.trim().length === 0) return null;

        const hateSpeechPatterns = [
            // Discriminatory language
            /\bracista\b|\bdiscriminaci[óo]n\b|\bprejuicio\b|\bodio\b/i,
            /\bnazi\b|\bneo-nazi\b|\bku-klux-klan\b/i,
            /\bsupremac[íi]a.*blanca\b|\braza.*superior\b/i,
            /\bterrorista\b|\bextremista\b|\bfan[áa]tico\b/i,

            // Hate terms by region
            /\bpayaso\b|\bvagos\b|\bdrogadictos\b/i, // Colombia
            /\bcholo\b|\bgringo\b|\bmojado\b/i, // Mexico/US
            /\bnegro\b|\bnigger\b|\bkaffir\b/i, // Racial slurs
            /\bputo\b|\bputa\b|\bmaric[óo]n\b/i, // Homophobic
            /\bjudio\b|\bjud[íi]a\b|\bholocausto\b/i, // Anti-Semitic
            /\bmoro\b|\bsarraceno\b|\bislamof[óo]bico\b/i, // Islamophobic

            // Violent language
            /\basesinar\b|\bmat(?:ar|a)\b|\bexterminar\b|\bdestruir\b/i,
            /\bmatenlos\b|\bexterminenlos\b|\bdestruyanlos\b/i,
            /\bviolencia\b|\bagresi[óo]n\b|\batentado\b/i,

            // Dehumanizing language
            /\bestos\b.*\bno\s+son\b.*\bhumanos\b/i,
            /\bestos\b.*\bno\s+merecen\b/i,
            /\bestos\b.*\bno\s+pertenecen\b/i,
            /\bestos\b.*\bno\s+deber[íi]an\b/i
        ];

        const textLower = text.toLowerCase();

        for (const pattern of hateSpeechPatterns) {
            if (pattern.test(textLower)) {
                return "Lenguaje discriminatorio o de odio detectado. Por favor, mantenga un tono respetuoso y constructivo.";
            }
        }

        // Check for excessive capitalization (aggressive tone)
        const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
        if (upperCaseRatio > 0.3) {
            return "Evite el uso excesivo de mayúsculas. Por favor, mantenga un tono profesional y respetuoso.";
        }

        // Check for excessive punctuation (aggressive tone)
        const exclamationCount = (text.match(/[!¡]/g) || []).length;
        const questionCount = (text.match(/[?¿]/g) || []).length;
        if (exclamationCount > 3 || questionCount > 5) {
            return "Evite el uso excesivo de signos de exclamación o interrogación. Por favor, mantenga un tono profesional.";
        }

        return null;
    };

    // Comprehensive Form Validation
    const validateForm = (): boolean => {
        const errors: string[] = [];

        // Required fields validation
        if (!formData.name.trim()) {
            errors.push("El nombre es obligatorio");
        } else if (formData.name.trim().length < 3) {
            errors.push("El nombre debe tener al menos 3 caracteres");
        }

        if (!formData.email.trim()) {
            errors.push("El correo electrónico es obligatorio");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.push("Por favor, ingrese un correo electrónico válido");
            }
        }

        if (!formData.phone.trim()) {
            errors.push("El teléfono de contacto es obligatorio");
        } else {
            // Validación de número de teléfono (mínimo 7 dígitos, máximo 15)
            const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(formData.phone)) {
                errors.push("Por favor, ingrese un número de teléfono válido (7-15 dígitos)");
            }
        }

        if (!formData.taxId.trim()) {
            errors.push("El número de identificación fiscal es obligatorio");
        } else if (formData.taxId.trim().length < 3) {
            errors.push("El número de identificación fiscal debe tener al menos 3 caracteres");
        }

        if (!formData.address.trim()) {
            errors.push("La dirección fiscal es obligatoria");
        } else if (formData.address.trim().length < 5) {
            errors.push("La dirección debe tener al menos 5 caracteres");
        }

        // Amount validation
        const selectedAmount = getSelectedAmount();
        if (selectedAmount < 5000000) {
            errors.push("El monto mínimo de patrocinio es $5,000,000 COP");
        }

        // Hate speech detection
        const hateSpeechName = detectHateSpeech(formData.name);
        const hateSpeechCompany = detectHateSpeech(formData.company || '');
        const hateSpeechMessage = detectHateSpeech(formData.message || '');

        if (hateSpeechName) {
            setHateSpeechDetected(hateSpeechName);
            return false;
        }
        if (hateSpeechCompany) {
            setHateSpeechDetected(hateSpeechCompany);
            return false;
        }
        if (hateSpeechMessage) {
            setHateSpeechDetected(hateSpeechMessage);
            return false;
        }

        setHateSpeechDetected(null);
        setValidationErrors(errors);
        return errors.length === 0;
    };

    // Real-time validation for individual fields
    const validateField = (fieldName: string, value: string): string | null => {
        switch (fieldName) {
            case 'name':
                if (!value.trim()) return "El nombre es obligatorio";
                if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
                if (detectHateSpeech(value)) return detectHateSpeech(value);
                return null;

            case 'email':
                if (!value.trim()) return "El correo electrónico es obligatorio";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Por favor, ingrese un correo electrónico válido";
                return null;

            case 'phone':
                if (!value.trim()) return "El teléfono de contacto es obligatorio";
                const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
                if (!phoneRegex.test(value)) return "Por favor, ingrese un número de teléfono válido (7-15 dígitos)";
                return null;

            case 'taxId':
                if (!value.trim()) return "El número de identificación fiscal es obligatorio";
                if (value.trim().length < 3) return "El número de identificación fiscal debe tener al menos 3 caracteres";
                return null;

            case 'address':
                if (!value.trim()) return "La dirección fiscal es obligatoria";
                if (value.trim().length < 5) return "La dirección debe tener al menos 5 caracteres";
                return null;

            case 'message':
                if (value.trim().length > 0 && detectHateSpeech(value)) {
                    return detectHateSpeech(value);
                }
                return null;

            default:
                return null;
        }
    };

    const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Real-time validation before submission
        if (!validateForm()) {
            setSubmitError("Por favor, corrija los errores en el formulario antes de enviar");
            return;
        }

        if (!formData.termsAccepted) {
            setSubmitError("Debe aceptar los términos y condiciones para continuar");
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const selectedAmount = customAmount ? parseInt(customAmount) : (selectedTier?.amount || 0);

            const sponsorshipData = {
                ...formData,
                amount: selectedAmount,
                currency: currency.code,
                country: selectedCountry,
                tier: selectedTier?.id
            };

            const response = await fetch('/api/sponsorship', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sponsorshipData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    message: '',
                    taxId: '',
                    address: '',
                    preferredContact: 'email',
                    newsletter: false,
                    termsAccepted: false
                });
                setCustomAmount('');
                setSelectedTier(null);
                setValidationErrors([]);
            } else {
                setSubmitError(result.message || 'Error al procesar la solicitud');
            }
        } catch (error) {
            setSubmitError('Error de conexión. Por favor intente de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    // Enhanced input change handler with real-time validation
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: checked !== undefined ? checked : value
        }));

        // Real-time validation for the changed field
        const error = validateField(name, value);
        if (error) {
            setValidationErrors(prev => [...prev.filter(err => !err.includes(name)), error]);
        } else {
            setValidationErrors(prev => prev.filter(err => !err.includes(name)));
        }
    };

    const getSelectedAmount = () => {
        if (customAmount) return parseInt(customAmount);
        if (selectedTier) return selectedTier.amount;
        return 0;
    };

    const getTaxBenefit = () => {
        const amount = getSelectedAmount();
        const country = ALL_COUNTRIES.find(c => c.name === selectedCountry);
        if (!amount || !country) return null;

        // Cálculo estimado de beneficio fiscal basado en el sistema de países
        // Extraemos el porcentaje de la descripción de taxDeduction
        const deductionText = country.taxDeduction;
        let deductionRate = 0.3; // default

        // Intentamos extraer el porcentaje del texto
        const match = deductionText.match(/(\d+)%/);
        if (match) {
            deductionRate = parseInt(match[1]) / 100;
        } else {
            // Fallback basado en el país
            switch (country.code) {
                case 'US': deductionRate = 0.6; break;
                case 'CA': deductionRate = 0.75; break;
                case 'GB': deductionRate = 0.25; break;
                case 'DE': deductionRate = 0.30; break;
                case 'ES': deductionRate = 0.30; break;
                case 'MX': deductionRate = 1.0; break;
                case 'CO': deductionRate = 1.1; break;
                default: deductionRate = 0.3;
            }
        }

        const benefitCOP = amount * deductionRate;
        const effectiveCostCOP = amount - benefitCOP;

        return {
            saved: benefitCOP,
            effectiveCost: effectiveCostCOP,
            rate: deductionRate,
            savedLocalized: convertToUserCurrency(benefitCOP),
            effectiveCostLocalized: convertToUserCurrency(effectiveCostCOP)
        };
    };

    const currentStory = impactStories[currentStoryIndex];

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        // Actualizar moneda según el país seleccionado usando el nuevo sistema
        const selectedCountryInfo = ALL_COUNTRIES.find(c => c.name === country);
        if (selectedCountryInfo) {
            const currencyCode = selectedCountryInfo.currency;
            const newCurrency = CURRENCIES[currencyCode];
            setCurrency(newCurrency);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[var(--color-secondary-soft-gray)] via-white to-[var(--color-primary-soft-gray)]">
            {/* Hero Section - Subtle Invitation */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary-green)]/20 via-[var(--color-primary-deep)]/10 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/60">
                                <span className="w-2 h-2 bg-[var(--color-primary-green)] rounded-full animate-pulse"></span>
                                <span className="text-sm font-medium text-[var(--color-primary-deep)]">Comunidad activa: 237 patrocinadores comprometidos</span>
                            </div>

                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary-black)] leading-tight">
                                Construya un Futuro Digno
                                <span className="block text-[var(--color-primary-green)]">Su Decisión Importa</span>
                            </h1>

                            <p className="text-lg text-[var(--color-primary-brown)]/80 leading-relaxed">
                                En momentos de incertidumbre, su apoyo se convierte en el cimiento sobre el que
                                miles de personas reconstruyen sus vidas. No se trata solo de ayuda, sino de
                                acompañar procesos de transformación donde la dignidad se recupera paso a paso.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm border border-white/60">
                                    <div className="text-2xl font-bold text-[var(--color-primary-green)]">8,000+</div>
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">Transformaciones Completas</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm border border-white/60">
                                    <div className="text-2xl font-bold text-[var(--color-primary-deep)]">150+</div>
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">Iniciativas Exitosas</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm border border-white/60">
                                    <div className="text-2xl font-bold text-[var(--color-primary-green)]">95%</div>
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">Procesos Exitosos</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm border border-white/60">
                                    <div className="text-2xl font-bold text-[var(--color-primary-deep)]">50+</div>
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">Naciones Colaborando</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-deep)] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    onClick={() => {
                                        // For general WhatsApp buttons, we don't require form completion
                                        // but we can still validate if user has started filling the form
                                        if (formData.name || formData.email || formData.phone) {
                                            // User has started filling the form, suggest completing it first
                                            setSubmitError("Para una mejor experiencia, le recomendamos completar el formulario antes de contactarnos por WhatsApp");
                                        }
                                        setWhatsappModalAction('join');
                                        setWhatsappModalOpen(true);
                                    }}
                                >
                                    🤝 Unirse al Proceso de Transformación
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-[var(--color-primary-deep)] text-[var(--color-primary-deep)] hover:bg-[var(--color-primary-deep)] hover:text-white transition-all duration-300"
                                    onClick={() => {
                                        // For general WhatsApp buttons, we don't require form completion
                                        // but we can still validate if user has started filling the form
                                        if (formData.name || formData.email || formData.phone) {
                                            // User has started filling the form, suggest completing it first
                                            setSubmitError("Para una mejor experiencia, le recomendamos completar el formulario antes de contactarnos por WhatsApp");
                                        }
                                        setWhatsappModalAction('impact');
                                        setWhatsappModalOpen(true);
                                    }}
                                >
                                    📞 Conversemos sobre su Impacto
                                </Button>
                            </div>

                        </div>

                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/60">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">🤝</div>
                                    <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-2">Transformación Compartida</h3>
                                    <p className="text-[var(--color-primary-brown)]/70">Lo que descubrirá al acompañarnos</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border-l-4 border-[var(--color-primary-green)]">
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Valor Multiplicado</div>
                                        <div className="text-sm text-[var(--color-primary-brown)]/70">Su inversión genera resultados que se expanden naturalmente</div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-[var(--color-primary-deep)]">
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Reconocimiento Internacional</div>
                                        <div className="text-sm text-[var(--color-primary-brown)]/70">Certificación válida en múltiples jurisdicciones</div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-[var(--color-primary-brown)]">
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Presencia Permanente</div>
                                        <div className="text-sm text-[var(--color-primary-brown)]/70">Su compromiso trasciende el tiempo y se multiplica en generaciones</div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-[var(--color-primary-green)]/10 rounded-lg">
                                    <div className="text-sm font-semibold text-[var(--color-primary-deep)] mb-2">Reflexión de un Patrocinador</div>
                                    <blockquote className="text-[var(--color-primary-brown)]/80 italic text-sm">
                                        "Al acompañar este proceso, descubrí que el verdadero valor no está
                                        en lo que damos, sino en lo que recibimos al ser parte de historias
                                        de superación que inspiran."
                                    </blockquote>
                                    <div className="text-xs text-[var(--color-primary-brown)]/60 mt-2">- Miembro de nuestra comunidad desde 2020</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stories Carousel */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Trayectorias que Inspiran, Resultados que Transforman
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80 mb-6">
                            Cada historia representa una decisión de superación que merece ser acompañada
                        </p>
                    </div>

                    <div className="relative bg-gradient-to-r from-[var(--color-primary-green)]/10 to-[var(--color-primary-deep)]/10 rounded-2xl p-8">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex gap-2 mb-4">
                                    {impactStories.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-3 h-3 rounded-full transition-all ${index === currentStoryIndex ? 'bg-[var(--color-primary-green)]' : 'bg-gray-300'}`}
                                            onClick={() => setCurrentStoryIndex(index)}
                                        />
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-4">{currentStory.title}</h3>
                                <p className="text-[var(--color-primary-brown)]/80 mb-6">{currentStory.description}</p>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="font-semibold text-[var(--color-primary-deep)] mb-2">Punto de Partida</div>
                                        <p className="text-sm text-[var(--color-primary-brown)]/70">{currentStory.before}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="font-semibold text-[var(--color-primary-deep)] mb-2">Trayectoria Actual</div>
                                        <p className="text-sm text-[var(--color-primary-brown)]/70">{currentStory.after}</p>
                                    </div>
                                </div>

                                <blockquote className="border-l-4 border-[var(--color-primary-green)] pl-4 mb-4">
                                    <p className="text-[var(--color-primary-brown)]/80 italic">"{currentStory.quote}"</p>
                                </blockquote>
                                <p className="text-sm text-[var(--color-primary-brown)]/60">- {currentStory.beneficiary}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                                        <span className="text-4xl">📸</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {impactStories.map((story, index) => (
                                        <button
                                            key={story.id}
                                            className={`aspect-square rounded-lg border-2 transition-all ${index === currentStoryIndex ? 'border-[var(--color-primary-green)] scale-105' : 'border-gray-200 hover:border-[var(--color-primary-deep)]'}`}
                                            onClick={() => setCurrentStoryIndex(index)}
                                        >
                                            <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                                                <span className="text-2xl">{index === 0 ? '👩‍👧' : index === 1 ? '🎓' : '🏘️'}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Framework Internacional de Reconocimiento */}
            <section className="py-20 bg-gradient-to-br from-[var(--color-primary-green)]/5 to-[var(--color-primary-deep)]/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Marco Internacional de Reconocimiento
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80 max-w-4xl mx-auto">
                            Nuestro acompañamiento se integra en marcos internacionales que reconocen y valoran
                            el compromiso con procesos de transformación social sostenible en múltiples jurisdicciones.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/60">
                                <h3 className="text-xl font-bold text-[var(--color-primary-deep)] mb-4">Contexto Jurisdiccional</h3>
                                <Select
                                    value={selectedCountry}
                                    onChange={(e) => handleCountryChange(e.target.value)}
                                    options={countryTaxInfo.map(country => ({
                                        value: country.name,
                                        label: `${country.name} (${country.currency})`
                                    }))}
                                    name="country"
                                    id="country-select"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl p-6">
                                    <div className="text-sm text-[var(--color-primary-brown)]/70 mb-2">Marco de Reconocimiento</div>
                                    <div className="text-2xl font-bold text-[var(--color-primary-green)]">
                                        {getTaxBenefit() ? `${(getTaxBenefit()!.rate * 100).toFixed(0)}%` : 'Seleccione país y monto'}
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6">
                                    <div className="text-sm text-[var(--color-primary-brown)]/70 mb-2">Valorización del Compromiso</div>
                                    <div className="text-2xl font-bold text-[var(--color-primary-deep)]">
                                        {getTaxBenefit() ? (currencyLoading ? 'Calculando...' : getTaxBenefit()!.savedLocalized) : 'Calculando...'}
                                    </div>
                                    <div className="text-xs text-[var(--color-primary-brown)]/60 mt-1">En su contexto fiscal</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6">
                                <h4 className="font-semibold text-[var(--color-primary-deep)] mb-3">Fundamento Legal</h4>
                                <p className="text-sm text-[var(--color-primary-brown)]/70">
                                    {countryTaxInfo.find(c => c.name === selectedCountry)?.legalFramework || 'Información no disponible'}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">Proceso de reconocimiento:</div>
                                    <Badge variant="outline">
                                        {countryTaxInfo.find(c => c.name === selectedCountry)?.processingTime || '24-48 horas'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6">
                                <h4 className="font-semibold text-[var(--color-primary-deep)] mb-4">Nivel de Reconocimiento Internacional</h4>
                                <ul className="space-y-2 text-sm text-[var(--color-primary-brown)]/70">
                                    <li>✓ Reconocimiento en 50+ jurisdicciones</li>
                                    <li>✓ Alineación con estándares internacionales</li>
                                    <li>✓ Asesoría especializada en marcos comparados</li>
                                    <li>✓ Documentación que trasciende fronteras</li>
                                    <li>✓ Presencia en espacios de incidencia global</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-6">
                                <h4 className="font-semibold text-[var(--color-primary-deep)] mb-4">Dimensiones de Valoración</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl mb-2">🌍</div>
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Presencia Global</div>
                                        <div className="text-xs text-[var(--color-primary-brown)]/60">Trascendencia territorial</div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl mb-2">💼</div>
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Acompañamiento Especializado</div>
                                        <div className="text-xs text-[var(--color-primary-brown)]/60">Asesoría contextualizada</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl mb-2">📜</div>
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Fundamentación Sólida</div>
                                        <div className="text-xs text-[var(--color-primary-brown)]/60">Documentación robusta</div>
                                    </div>
                                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                                        <div className="text-2xl mb-2">⚡</div>
                                        <div className="font-semibold text-[var(--color-primary-deep)]">Proceso Ágil</div>
                                        <div className="text-xs text-[var(--color-primary-brown)]/60">Atención oportuna</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sponsorship Tiers with Subtle Incentives */}
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Encuentre su Forma de Contribuir
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80">
                            Cada nivel representa una forma de acompañar procesos de transformación significativa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        {sponsorshipTiers.map((tier) => (
                            <Card
                                key={tier.id}
                                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 ${selectedTier?.id === tier.id
                                    ? 'border-[var(--color-primary-green)] shadow-xl scale-105'
                                    : 'border-transparent hover:border-[var(--color-primary-deep)]/20'
                                    }`}
                                onClick={() => setSelectedTier(tier)}
                            >
                                <CardHeader className="bg-gradient-to-br from-white to-gray-50 rounded-t-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="w-10 h-10 rounded-full"
                                            style={{ backgroundColor: tier.color }}
                                        />
                                        <Badge
                                            variant={selectedTier?.id === tier.id ? "default" : "outline"}
                                            className={selectedTier?.id === tier.id ? "bg-[var(--color-primary-green)]" : ""}
                                        >
                                            Seleccionado
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-[var(--color-primary-deep)] text-xl">
                                        {tier.title}
                                    </CardTitle>
                                    <p className="text-2xl font-bold text-[var(--color-primary-green)]">
                                        {formatCurrency(tier.amount)}
                                    </p>
                                    <p className="text-sm text-[var(--color-primary-brown)]/70 mt-2">
                                        {tier.impact}
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-xs text-[var(--color-primary-brown)]/60">Certificación: {tier.certificationLevel}</div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-[var(--color-primary-deep)] text-sm">Dimensiones de Impacto:</h4>
                                        {tier.subtleIncentives.map((incentive, i) => (
                                            <div key={i} className="text-xs text-[var(--color-primary-brown)]/70 bg-white rounded p-2">
                                                • {incentive}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-[var(--color-primary-deep)] text-sm">Beneficios Clave:</h4>
                                        {tier.benefits.slice(0, 4).map((benefit, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs">
                                                <span className="text-[var(--color-primary-green)] mt-0.5">✓</span>
                                                <span className="text-[var(--color-primary-black)]/70">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Personalized Approach Section */}
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle>Explorar su Forma de Contribuir</CardTitle>
                            <CardDescription>
                                Comparta sus intereses y expectativas. Nuestro equipo se pondrá en contacto
                                para conversar sobre cómo su apoyo puede integrarse en procesos de transformación
                                que alineen con sus valores y posibilidades.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Input
                                            label="Nombre Completo *"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Ej: María Fernanda Gómez Pérez"
                                            className={validationErrors.some(err => err.includes('nombre')) ? 'border-red-500' : ''}
                                        />
                                        {validationErrors.some(err => err.includes('nombre')) && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.find(err => err.includes('nombre'))}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            label="Empresa/Organización"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Soluciones Empresariales S.A."
                                            className={hateSpeechDetected && formData.company ? 'border-red-500' : ''}
                                        />
                                        {hateSpeechDetected && formData.company && (
                                            <p className="text-red-500 text-xs mt-1">{hateSpeechDetected}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <Input
                                            label="Correo Electrónico *"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="su@email.com"
                                            className={validationErrors.some(err => err.includes('correo electrónico')) ? 'border-red-500' : ''}
                                        />
                                        {validationErrors.some(err => err.includes('correo electrónico')) && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.find(err => err.includes('correo electrónico'))}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            label="Teléfono de Contacto *"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+57 300 123 4567"
                                            className={validationErrors.some(err => err.includes('teléfono')) ? 'border-red-500' : ''}
                                        />
                                        {validationErrors.some(err => err.includes('teléfono')) && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.find(err => err.includes('teléfono'))}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            label="Número de Identificación Fiscal *"
                                            name="taxId"
                                            value={formData.taxId}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Ej: NIT, RFC, SSN"
                                            className={validationErrors.some(err => err.includes('identificación fiscal')) ? 'border-red-500' : ''}
                                        />
                                        {validationErrors.some(err => err.includes('identificación fiscal')) && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.find(err => err.includes('identificación fiscal'))}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-[var(--color-primary-black)] block mb-2">
                                            País de Residencia Fiscal *
                                        </label>
                                        <Select
                                            value={selectedCountry}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                            options={countryTaxInfo.map(country => ({
                                                value: country.name,
                                                label: country.name
                                            }))}
                                            name="countryFiscal"
                                            id="country-fiscal-select"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Dirección Fiscal Completa *"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Calle, Ciudad, Estado, País"
                                            className={validationErrors.some(err => err.includes('dirección')) ? 'border-red-500' : ''}
                                        />
                                        {validationErrors.some(err => err.includes('dirección')) && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.find(err => err.includes('dirección'))}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-[var(--color-primary-black)] block mb-2">
                                            Contribución Aspirada (COP)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-500">$</span>
                                            <Input
                                                type="text"
                                                value={customAmount ? formatCurrency(parseInt(customAmount)) : ''}
                                                onChange={handleCustomAmount}
                                                placeholder="Indique su intención de apoyo"
                                                className="pl-8"
                                            />
                                        </div>
                                        <p className="text-xs text-[var(--color-primary-brown)]/60 mt-1">
                                            O explore las opciones de acompañamiento arriba
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mt-6">
                                        <div className="text-sm text-[var(--color-primary-brown)]/70 mb-2">Beneficios Fiscales Potenciales</div>
                                        {getTaxBenefit() ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Contribución:</span>
                                                    <span className="font-semibold">{formatCurrency(getSelectedAmount())}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Beneficio Fiscal Estimado:</span>
                                                    <span className="font-semibold text-green-600">{currencyLoading ? 'Calculando...' : getTaxBenefit()!.savedLocalized}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Valorización del Apoyo:</span>
                                                    <span className="font-semibold text-blue-600">{currencyLoading ? 'Calculando...' : getTaxBenefit()!.effectiveCostLocalized}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Marco Legal Aplicable:</span>
                                                    <span className="font-semibold">{(getTaxBenefit()!.rate * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-[var(--color-primary-brown)]/60">Seleccione país y monto para visualizar beneficios</p>
                                        )}
                                        <div className="text-xs text-[var(--color-primary-brown)]/60 mt-2">Información actualizada en tiempo real</div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-[var(--color-primary-black)] block mb-2">
                                            Preferencia de Comunicación
                                        </label>
                                        <Select
                                            value={formData.preferredContact}
                                            onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                                            options={[
                                                { value: 'email', label: 'Correo Electrónico' },
                                                { value: 'phone', label: 'Teléfono' },
                                                { value: 'whatsapp', label: 'WhatsApp' },
                                                { value: 'whatsapp-form', label: 'Enviar Formulario por WhatsApp' }
                                            ]}
                                            name="preferredContact"
                                            id="preferred-contact"
                                        />
                                    </div>
                                    <div className="flex items-end space-x-2">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            checked={formData.newsletter}
                                            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                                            className="w-4 h-4 text-[var(--color-primary-green)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary-green)]"
                                        />
                                        <label htmlFor="newsletter" className="text-sm text-[var(--color-primary-brown)]/80">
                                            Recibir información sobre procesos de transformación
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <Textarea
                                        label="Intereses o Áreas de Enfoque de su Interés"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="¿Qué aspectos de transformación le interesan acompañar? ¿Algún enfoque particular que valore?"
                                        className={hateSpeechDetected && formData.message ? 'border-red-500' : ''}
                                    />
                                    {hateSpeechDetected && formData.message && (
                                        <p className="text-red-500 text-xs mt-1">{hateSpeechDetected}</p>
                                    )}
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-[var(--color-primary-deep)] mb-3">✨ Oportunidades de Profundización</h4>
                                    <ul className="space-y-2 text-sm text-[var(--color-primary-brown)]/70">
                                        <li>✓ Asesoría especializada en marcos fiscales internacionales</li>
                                        <li>✓ Procesos ágiles de reconocimiento y certificación</li>
                                        <li>✓ Espacios de intercambio con otros acompañantes del proceso</li>
                                        <li>✓ Acceso a documentación sobre impactos generados</li>
                                        <li>✓ Invitación a momentos de reconocimiento y reflexión</li>
                                    </ul>
                                    <p className="text-xs text-[var(--color-primary-brown)]/60 mt-3">
                                        * Espacios limitados para garantizar la calidad del acompañamiento
                                    </p>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.termsAccepted}
                                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                        className="w-4 h-4 text-[var(--color-primary-green)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary-green)] mt-1"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-[var(--color-primary-brown)]/80">
                                        Autorizo el tratamiento de mis datos para fines de contacto y acompañamiento
                                        en procesos de transformación social, de acuerdo con la normativa de protección de datos.
                                    </label>
                                </div>

                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                        {submitError}
                                    </div>
                                )}

                                {submitSuccess && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                                        Agradecemos su interés en acompañar estos procesos. Pronto nos contactaremos
                                        para conversar sobre cómo su apoyo puede integrarse en transformaciones
                                        significativas y sostenibles.
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[var(--color-primary-brown)]/80">Monto Seleccionado:</p>
                                        <p className="text-2xl font-bold text-[var(--color-primary-green)]">
                                            {getSelectedAmount() > 0 ? formatCurrency(getSelectedAmount()) : 'No especificado'}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={() => {
                                                // Validate required fields before sending to WhatsApp
                                                const errors = validateForm();
                                                if (!errors) {
                                                    const formDataWithAmount = {
                                                        ...formData,
                                                        amount: getSelectedAmount(),
                                                        tier: selectedTier?.title || 'No seleccionado'
                                                    };
                                                    sendFormViaWhatsAppEnhanced(formDataWithAmount);
                                                } else {
                                                    setSubmitError("Por favor, complete todos los campos obligatorios antes de enviar por WhatsApp");
                                                }
                                            }}
                                            className="border-green-500 text-green-600 hover:bg-green-50"
                                            disabled={submitting}
                                        >
                                            📝 Enviar formulario por WhatsApp
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Testimonials with International Perspective */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Reflexiones de Nuestros Compañeros de Camino
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80">
                            Comparten su experiencia al acompañar procesos de transformación significativa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Descubrimos que el verdadero valor de esta colaboración trasciende lo financiero. Nuestro equipo encontró un propósito que enriquece nuestro quehacer diario.",
                                author: "Hans Müller",
                                position: "Director Financiero",
                                company: "TechGlobal GmbH - Alemania",
                                country: "🇩🇪"
                            },
                            {
                                quote: "La claridad en los procesos y la profundidad del seguimiento nos permiten integrar este compromiso en nuestra estrategia de responsabilidad social con total confianza.",
                                author: "Sarah Johnson",
                                position: "CEO & Fundadora",
                                company: "Impact Capital - Estados Unidos",
                                country: "🇺🇸"
                            },
                            {
                                quote: "Lo que comenzó como una decisión estratégica se convirtió en una experiencia humana que enriquece nuestra visión empresarial y personal.",
                                author: "Carlos Fernández",
                                position: "Empresario",
                                company: "Constructora del Norte - México",
                                country: "🇲🇽"
                            }
                        ].map((testimonial, i) => (
                            <Card key={i} className="hover:shadow-xl transition-all duration-300 border-l-4 border-[var(--color-primary-green)]">
                                <CardContent className="space-y-6 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-3xl">{testimonial.country}</div>
                                        <div className="flex text-green-600">
                                            <span>✓</span>
                                        </div>
                                    </div>
                                    <p className="text-[var(--color-primary-black)]/80 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="font-semibold text-[var(--color-primary-deep)]">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-sm text-[var(--color-primary-brown)]/70">
                                            {testimonial.position} • {testimonial.company}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Invitation with Consideration */}
            <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] via-[var(--color-primary-deep)] to-[var(--color-primary-black)] text-white">
                <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-8">
                        <span className="text-green-400">🌿</span>
                        <span className="text-sm font-medium">Oportunidad de acompañar procesos de transformación sostenible</span>
                        <span className="text-green-400">🌿</span>
                    </div>

                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                        Construyamos el Futuro Juntos
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        Su decisión de acompañar estos procesos se integra en un movimiento colectivo
                        donde el compromiso genuino genera transformaciones que trascienden generaciones.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <div className="text-2xl mb-2">⚡</div>
                            <div className="font-semibold">Atención Personalizada</div>
                            <div className="text-sm text-white/80">24-48 horas</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <div className="text-2xl mb-2">🌍</div>
                            <div className="font-semibold">Presencia Internacional</div>
                            <div className="text-sm text-white/80">50+ naciones</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <div className="text-2xl mb-2">💼</div>
                            <div className="font-semibold">Asesoría Especializada</div>
                            <div className="text-sm text-white/80">Acompañamiento continuo</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="bg-white text-[var(--color-primary-green)] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => {
                                // For general WhatsApp buttons, we don't require form completion
                                // but we can still validate if user has started filling the form
                                if (formData.name || formData.email || formData.phone) {
                                    // User has started filling the form, suggest completing it first
                                    setSubmitError("Para una mejor experiencia, le recomendamos completar el formulario antes de contactarnos por WhatsApp");
                                }
                                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, quisiera programar una conversación sobre transformación con CORVICAC')}`, '_blank');
                            }}
                        >
                            🤝 Programemos una Conversación
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-[var(--color-primary-green)] transition-all duration-300"
                            onClick={() => {
                                // For general WhatsApp buttons, we don't require form completion
                                // but we can still validate if user has started filling the form
                                if (formData.name || formData.email || formData.phone) {
                                    // User has started filling the form, suggest completing it first
                                    setSubmitError("Para una mejor experiencia, le recomendamos completar el formulario antes de contactarnos por WhatsApp");
                                }
                                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, quisiera profundizar sobre el impacto con CORVICAC')}`, '_blank');
                            }}
                        >
                            📧 Escríbanos para Profundizar
                        </Button>
                    </div>

                    <p className="text-sm text-white/80 mt-6">
                        *Cada proceso se adapta a su realidad y expectativas. La certificación fiscal
                        se ajusta a los marcos legales de cada jurisdicción. El verdadero valor se mide
                        en transformaciones humanas sostenibles.
                    </p>
                </div>
            </section>
            {/* WhatsApp Modal */}
            {whatsappModalOpen && whatsappModalAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-2">💬</div>
                                <h3 className="text-xl font-bold text-[var(--color-primary-deep)]">
                                    {whatsappModalAction === 'join' ? 'Unirse al Proceso de Transformación' : 'Conversar sobre su Impacto'}
                                </h3>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-l-4 border-[var(--color-primary-green)]">
                                    <h4 className="font-semibold text-[var(--color-primary-deep)] mb-2">¿Qué obtendrá al contactarnos?</h4>
                                    <ul className="text-sm text-[var(--color-primary-brown)]/70 space-y-1">
                                        <li>✓ Asesoría personalizada sobre oportunidades de transformación</li>
                                        <li>✓ Información detallada sobre procesos de acompañamiento</li>
                                        <li>✓ Orientación sobre marcos fiscales internacionales</li>
                                        <li>✓ Espacios para profundizar en su impacto deseado</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-[var(--color-primary-deep)]">
                                    <h4 className="font-semibold text-[var(--color-primary-deep)] mb-2">Proceso Ágil</h4>
                                    <p className="text-sm text-[var(--color-primary-brown)]/70">
                                        Atención personalizada en 24-48 horas. Nuestro equipo está preparado para acompañarle en su decisión de transformación.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex-1 bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-deep)] text-white"
                                    onClick={() => {
                                        const message = whatsappModalAction === 'join'
                                            ? 'Hola, estoy interesado en unirme al proceso de transformación de CORVICAC'
                                            : 'Hola, quisiera conversar sobre mi impacto con CORVICAC';
                                        window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
                                        setWhatsappModalOpen(false);
                                        setWhatsappModalAction(null);
                                    }}
                                >
                                    🤝 Sí, quiero contactarlos
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                                    onClick={() => {
                                        setWhatsappModalOpen(false);
                                        setWhatsappModalAction(null);
                                    }}
                                >
                                    🤔 Cancelar
                                </Button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-[var(--color-primary-brown)]/60">
                                    * Este contacto es para información general. Para compromisos específicos, le recomendamos completar el formulario de acompañamiento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Links */}
            <div className="mt-16 flex flex-wrap justify-center gap-4 bg-gradient-to-r from-[var(--color-primary-green)]/5 to-[var(--color-primary-deep)]/5 py-8 rounded-2xl">
                <a
                    href="/"
                    className="bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] transition-colors shadow-md hover:shadow-lg"
                >
                    Inicio
                </a>
                <a
                    href="/nosotros"
                    className="bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] transition-colors shadow-md hover:shadow-lg"
                >
                    Quiénes Somos
                </a>
                <a
                    href="/eventos"
                    className="bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] transition-colors shadow-md hover:shadow-lg"
                >
                    Nuestros Eventos
                </a>
                <a
                    href="/programas"
                    className="bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] transition-colors shadow-md hover:shadow-lg"
                >
                    Nuestros Programas
                </a>
            </div>

        </main>
    );
}