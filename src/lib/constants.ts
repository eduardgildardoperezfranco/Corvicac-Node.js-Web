// API Endpoints
import { validateURL, validateEmail, validatePhone } from './validation';

export const API_BASE_URL = validateURL(process.env.NEXT_PUBLIC_API_URL || 'https://api.corvicac.org');
export const API_ENDPOINTS = {
    DONATIONS: '/api/donations',
    VOLUNTEERS: '/api/volunteers',
    CONTACT: '/api/contact',
    PROJECTS: '/api/projects',
    PROGRAMS: '/api/programs',
    NEWS: '/api/news',
    GALLERY: '/api/gallery',
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'CORVICAC',
    SHORT_NAME: 'CORVICAC',
    DESCRIPTION: 'Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano',
    URL: validateURL('https://corvicac.org'),
    EMAIL: validateEmail('info@corvicac.org'),
    PHONE: validatePhone('+57 320 961 0147'),
    ADDRESS: 'Bogotá, Colombia',
    COPYRIGHT_YEAR: 2024,
};

// Colors
export const COLORS = {
    PRIMARY_GREEN: '#1E7F43',
    PRIMARY_DEEP: '#145A32',
    PRIMARY_GOLD: '#D4AF37',
    PRIMARY_BROWN: '#6E4B3A',
    PRIMARY_BLACK: '#1C1C1C',
    PRIMARY_WHITE: '#FFFFFF',
    SECONDARY_SOFT_GRAY: '#F4F6F5',
    SECONDARY_WARM_GRAY: '#DADDD8',
    SECONDARY_YELLOW: '#F2C94C',
    SECONDARY_BLUE: '#2F80ED',
    FLAG_YELLOW: '#FFFF00',
};

// Breakpoints
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
};

// Animations
export const ANIMATIONS = {
    FAST: '150ms ease',
    NORMAL: '250ms ease',
    SLOW: '350ms ease',
};

// Forms
export const FORM_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    REQUIRED_FIELDS: ['name', 'email', 'message'],
};

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    USER_PREFERENCES: 'user_preferences',
    CART: 'cart',
    TOKEN: 'auth_token',
};

// Validation Patterns
export const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^3\d{9}$/,
    CURRENCY: /^\d+(\.\d{1,2})?$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

// Social Media
export const SOCIAL_MEDIA = {
    FACEBOOK: validateURL('https://facebook.com/corvicac'),
    TWITTER: validateURL('https://twitter.com/corvicac'),
    INSTAGRAM: validateURL('https://instagram.com/corvicac'),
    YOUTUBE: validateURL('https://youtube.com/corvicac'),
    LINKEDIN: validateURL('https://linkedin.com/company/corvicac'),
    WHATSAPP: validateURL('https://wa.me/573209610147'),
};

// WhatsApp Integration
export const WHATSAPP_CONFIG = {
    PHONE: validatePhone('+573209610147'),
    MESSAGE: 'Hola, me gustaría obtener más información sobre CORVICAC',
    URL: validateURL('https://wa.me/+573209610147'),
};

// Donation Options
export const DONATION_OPTIONS = [
    { amount: 10000, label: '$10.000 COP' },
    { amount: 25000, label: '$25.000 COP' },
    { amount: 50000, label: '$50.000 COP' },
    { amount: 100000, label: '$100.000 COP' },
    { amount: 250000, label: '$250.000 COP' },
    { amount: 500000, label: '$500.000 COP' },
];

// Volunteer Areas
export const VOLUNTEER_AREAS = [
    { value: 'legal', label: 'Asesoría Legal' },
    { value: 'psychological', label: 'Atención Psicológica' },
    { value: 'education', label: 'Educación' },
    { value: 'social', label: 'Trabajo Social' },
    { value: 'administrative', label: 'Gestión Administrativa' },
    { value: 'communication', label: 'Comunicación' },
    { value: 'fundraising', label: 'Recaudación de Fondos' },
];

// WhatsApp Integration
export const WHATSAPP_FORM_CONFIG = {
    PHONE: validatePhone('+573209610147'),
    MESSAGE_TEMPLATE: (formData: any) => {
        const { name, company, email, phone, amount, message } = formData;
        return `*NUEVA SOLICITUD DE PATROCINIO*\n\n*Nombre:* ${name}\n*Empresa:* ${company || 'No especificada'}\n*Correo:* ${email}\n*Teléfono:* ${phone}\n*Monto:* ${amount ? '$' + amount.toLocaleString() : 'No especificado'}\n*Mensaje:* ${message || 'Sin mensaje'}\n\n*Fecha:* ${new Date().toLocaleDateString()}`;
    },
    CONTACT_MESSAGE: 'Hola, me gustaría obtener más información sobre cómo puedo apoyar a CORVICAC',
};

// Project Categories
export const PROJECT_CATEGORIES = [
    { value: 'legal', label: 'Justicia y Derechos' },
    { value: 'social', label: 'Inclusión Social' },
    { value: 'economic', label: 'Desarrollo Económico' },
    { value: 'educational', label: 'Formación y Capacitación' },
    { value: 'health', label: 'Salud Mental' },
    { value: 'housing', label: 'Vivienda Digna' },
];

// Program Types
export const PROGRAM_TYPES = [
    { value: 'restitution', label: 'Restitución de Tierras' },
    { value: 'reintegration', label: 'Reintegración Social' },
    { value: 'education', label: 'Educación para la Paz' },
    { value: 'economic', label: 'Fortalecimiento Económico' },
    { value: 'legal', label: 'Asesoría Jurídica Integral' },
];

// News Categories
export const NEWS_CATEGORIES = [
    { value: 'institutional', label: 'Noticias Institucionales' },
    { value: 'community', label: 'Impacto Comunitario' },
    { value: 'partnerships', label: 'Alianzas Estratégicas' },
    { value: 'events', label: 'Eventos y Actividades' },
    { value: 'achievements', label: 'Logros y Reconocimientos' },
];

// Gallery Categories
export const GALLERY_CATEGORIES = [
    { value: 'events', label: 'Eventos' },
    { value: 'projects', label: 'Proyectos' },
    { value: 'community', label: 'Comunidad' },
    { value: 'workshops', label: 'Talleres' },
    { value: 'achievements', label: 'Logros' },
];

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de conexión. Por favor intenta de nuevo.',
    VALIDATION_ERROR: 'Por favor verifica los datos ingresados.',
    SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
    FORBIDDEN: 'Acceso denegado.',
    NOT_FOUND: 'El recurso solicitado no fue encontrado.',
    TIMEOUT: 'La solicitud tardó demasiado. Por favor intenta de nuevo.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    DONATION_SUCCESS: '¡Gracias por tu donación! Hemos recibido tu apoyo.',
    VOLUNTEER_SUCCESS: '¡Gracias por unirte como voluntario! Pronto nos contactaremos contigo.',
    CONTACT_SUCCESS: 'Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.',
    SUBSCRIPTION_SUCCESS: '¡Te has suscrito correctamente! Recibirás novedades de CORVICAC.',
};

// Loading Messages
export const LOADING_MESSAGES = [
    'Cargando información...',
    'Procesando tu solicitud...',
    'Estamos trabajando para ti...',
    'Un momento por favor...',
];

// SEO Keywords - Enhanced for Fiscal Needs and Humanitarian Help in Colombia
export const SEO_KEYWORDS = [
    // Core organization keywords
    'CORVICAC',
    'Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano',
    'ONG Colombia',
    'Fundación Colombia',
    
    // Armed conflict and victims
    'Víctimas del conflicto armado',
    'Desplazados por violencia Colombia',
    'Paz total Colombia',
    'Proceso de paz Colombia',
    'Acuerdo de paz',
    'Reparación a víctimas',
    
    // Fiscal and economic needs
    'Ayuda fiscal Colombia',
    'Apoyo económico víctimas conflicto',
    'Subsidios víctimas Colombia',
    'Reparación económica víctimas',
    'Financiación proyectos sociales Colombia',
    
    // Humanitarian assistance
    'Ayuda humanitaria Colombia',
    'Crisis humanitaria Colombia',
    'Asistencia humanitaria',
    'Emergencia social Colombia',
    'Refugiados Colombia',
    
    // Political and social context
    'Crisis política Colombia',
    'Desorden social Colombia',
    'Derechos humanos Colombia',
    'Justicia transicional Colombia',
    'Desmovilizados Colombia',
    
    // Specific regional issues
    'Conflicto armado regional Colombia',
    'Violencia rural Colombia',
    'Seguridad alimentaria Colombia',
    'Crisis económica Colombia',
    
    // Solutions and support
    'Reintegración social',
    'Restitución de tierras',
    'Desarrollo comunitario',
    'Proyectos de paz Colombia',
    'Organización sin fines de lucro',
    
    // Call to action keywords
    'Donar a víctimas Colombia',
    'Apoyar ONG Colombia',
    'Voluntariado Colombia',
    'Colaborar con víctimas',
];

// Meta Tags - Enhanced for Fiscal Needs and Humanitarian Help in Colombia
export const META_TAGS = {
    TITLE_TEMPLATE: '%s | CORVICAC - Apoyo a Víctimas del Conflicto Armado en Colombia',
    DEFAULT_TITLE: 'CORVICAC - Ayuda Humanitaria y Apoyo Fiscal a Víctimas del Conflicto en Colombia',
    DEFAULT_DESCRIPTION: 'CORVICAC proporciona asistencia humanitaria, apoyo fiscal y reparación a víctimas del conflicto armado en Colombia. Trabajamos por la justicia, paz y reintegración social de comunidades afectadas por la violencia.',
    DEFAULT_KEYWORDS: SEO_KEYWORDS.join(', '),
    // Additional meta tags for enhanced SEO
    OPEN_GRAPH: {
        TYPE: 'website',
        LOCALE: 'es_CO',
        SITE_NAME: 'CORVICAC',
        IMAGE: '/images/corvicac-og-image.jpg',
        IMAGE_WIDTH: 1200,
        IMAGE_HEIGHT: 630,
    },
    TWITTER: {
        CARD: 'summary_large_image',
        SITE: '@corvicac',
        CREATOR: '@corvicac',
        IMAGE: '/images/corvicac-twitter-image.jpg',
    },
    // Structured data for search engines
    ORGANIZATION: {
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: 'Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano',
        alternateName: 'CORVICAC',
        url: 'https://corvicac.org',
        logo: 'https://corvicac.org/images/logo.png',
        description: 'Organización sin fines de lucro dedicada a la asistencia humanitaria, apoyo fiscal y reparación a víctimas del conflicto armado en Colombia',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'CO',
            addressLocality: 'Bogotá',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+57 320 961 0147',
            contactType: 'customer service',
            availableLanguage: ['Spanish', 'English'],
        },
        sameAs: [
            'https://facebook.com/corvicac',
            'https://twitter.com/corvicac',
            'https://instagram.com/corvicac',
            'https://youtube.com/c/corvicac',
            'https://linkedin.com/company/corvicac',
        ],
    },
    // Additional SEO meta tags
    VERIFICATION: {
        GOOGLE: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        BING: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
        YANDEX: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
    },
    ROBOTS: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    AUTHOR: 'CORVICAC - Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano',
    VIEWPORT: 'width=device-width, initial-scale=1.0',
    CHARSET: 'utf-8',
};

// Analytics
export const ANALYTICS = {
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,
    FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
};

// Features Flags
export const FEATURE_FLAGS = {
    DONATIONS_ENABLED: process.env.NEXT_PUBLIC_DONATIONS_ENABLED === 'true',
    VOLUNTEERS_ENABLED: process.env.NEXT_PUBLIC_VOLUNTEERS_ENABLED === 'true',
    NEWS_ENABLED: process.env.NEXT_PUBLIC_NEWS_ENABLED === 'true',
    GALLERY_ENABLED: process.env.NEXT_PUBLIC_GALLERY_ENABLED === 'true',
    EVENTS_ENABLED: process.env.NEXT_PUBLIC_EVENTS_ENABLED === 'true',
    BLOG_ENABLED: process.env.NEXT_PUBLIC_BLOG_ENABLED === 'true',
};

// Internationalization - Enhanced UTF-8 Support
export const I18N = {
    DEFAULT_LOCALE: 'es',
    // Support for major languages using UTF-8 encoding
    SUPPORTED_LOCALES: [
        'es', // Spanish - Primary language for Colombia
        'en', // English - International audience
        'fr', // French - UNESCO and international organizations
        'pt', // Portuguese - Brazil and neighboring countries
        'de', // German - European humanitarian organizations
        'it', // Italian - Vatican and European NGOs
        'zh', // Chinese - Growing international donors
        'ja', // Japanese - International aid organizations
        'ar', // Arabic - Middle Eastern humanitarian partners
        'ru', // Russian - Eastern European partners
    ],
    LOCALE_NAMES: {
        es: 'Español',
        en: 'English',
        fr: 'Français',
        pt: 'Português',
        de: 'Deutsch',
        it: 'Italiano',
        zh: '中文',
        ja: '日本語',
        ar: 'العربية',
        ru: 'Русский',
    },
    // UTF-8 character encoding declaration
    CHARSET: 'utf-8',
};