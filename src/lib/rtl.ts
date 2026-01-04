// RTL (Right-to-Left) Support System for CORVICAC Multilingual Website
import { useEffect } from 'react';

export type LanguageDirection = 'ltr' | 'rtl';

export const RTL_LANGUAGES: string[] = ['ar', 'he', 'fa', 'ur'];

export function isRTL(language: string): boolean {
    return RTL_LANGUAGES.includes(language.toLowerCase());
}

export function getDirection(language: string): LanguageDirection {
    return isRTL(language) ? 'rtl' : 'ltr';
}

export function applyRTLStyles(language: string): void {
    const direction = getDirection(language);
    const body = document.body;
    
    // Set direction on body and html
    document.documentElement.dir = direction;
    body.dir = direction;
    
    // Add CSS classes for styling
    if (direction === 'rtl') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
    } else {
        body.classList.add('ltr');
        body.classList.remove('rtl');
    }
    
    // Apply RTL-specific styles
    if (direction === 'rtl') {
        applyRTLLayoutStyles();
    } else {
        removeRTLLayoutStyles();
    }
}

function applyRTLLayoutStyles(): void {
    const style = document.createElement('style');
    style.id = 'rtl-styles';
    style.textContent = `
        /* RTL Layout Adjustments */
        .rtl .text-left { text-align: right !important; }
        .rtl .text-right { text-align: left !important; }
        .rtl .float-left { float: right !important; }
        .rtl .float-right { float: left !important; }
        .rtl .ml-1, .rtl .ml-2, .rtl .ml-3, .rtl .ml-4, .rtl .ml-5, .rtl .ml-6, .rtl .ml-8, .rtl .ml-10, .rtl .ml-12, .rtl .ml-16, .rtl .ml-20, .rtl .ml-24, .rtl .ml-32, .rtl .ml-40, .rtl .ml-48, .rtl .ml-56, .rtl .ml-64, .rtl .ml-auto, .rtl .ml-px, .rtl .ml-0.5, .rtl .ml-1.5, .rtl .ml-2.5, .rtl .ml-3.5 {
            margin-left: 0 !important;
            margin-right: var(--tw-space-x-reverse, 0) !important;
        }
        .rtl .mr-1, .rtl .mr-2, .rtl .mr-3, .rtl .mr-4, .rtl .mr-5, .rtl .mr-6, .rtl .mr-8, .rtl .mr-10, .rtl .mr-12, .rtl .mr-16, .rtl .mr-20, .rtl .mr-24, .rtl .mr-32, .rtl .mr-40, .rtl .mr-48, .rtl .mr-56, .rtl .mr-64, .rtl .mr-auto, .rtl .mr-px, .rtl .mr-0.5, .rtl .mr-1.5, .rtl .mr-2.5, .rtl .mr-3.5 {
            margin-right: 0 !important;
            margin-left: var(--tw-space-x-reverse, 0) !important;
        }
        .rtl .pl-1, .rtl .pl-2, .rtl .pl-3, .rtl .pl-4, .rtl .pl-5, .rtl .pl-6, .rtl .pl-8, .rtl .pl-10, .rtl .pl-12, .rtl .pl-16, .rtl .pl-20, .rtl .pl-24, .rtl .pl-32, .rtl .pl-40, .rtl .pl-48, .rtl .pl-56, .rtl .pl-64, .rtl .pl-px, .rtl .pl-0.5, .rtl .pl-1.5, .rtl .pl-2.5, .rtl .pl-3.5 {
            padding-left: 0 !important;
            padding-right: var(--tw-space-x-reverse, 0) !important;
        }
        .rtl .pr-1, .rtl .pr-2, .rtl .pr-3, .rtl .pr-4, .rtl .pr-5, .rtl .pr-6, .rtl .pr-8, .rtl .pr-10, .rtl .pr-12, .rtl .pr-16, .rtl .pr-20, .rtl .pr-24, .rtl .pr-32, .rtl .pr-40, .rtl .pr-48, .rtl .pr-56, .rtl .pr-64, .rtl .pr-px, .rtl .pr-0.5, .rtl .pr-1.5, .rtl .pr-2.5, .rtl .pr-3.5 {
            padding-right: 0 !important;
            padding-left: var(--tw-space-x-reverse, 0) !important;
        }
        
        /* RTL Icons and Arrows */
        .rtl .rotate-0 { transform: rotate(180deg) !important; }
        .rtl .rotate-90 { transform: rotate(-90deg) !important; }
        .rtl .rotate-180 { transform: rotate(0deg) !important; }
        .rtl .rotate-270 { transform: rotate(90deg) !important; }
        
        /* RTL Form Elements */
        .rtl input[type="text"], .rtl input[type="email"], .rtl input[type="tel"], .rtl textarea {
            text-align: right;
        }
        
        /* RTL Navigation */
        .rtl .space-x-1 > * + * { --tw-space-x-reverse: 1; margin-right: 0.25rem; margin-left: 0px; }
        .rtl .space-x-2 > * + * { --tw-space-x-reverse: 1; margin-right: 0.5rem; margin-left: 0px; }
        .rtl .space-x-4 > * + * { --tw-space-x-reverse: 1; margin-right: 1rem; margin-left: 0px; }
        .rtl .space-x-6 > * + * { --tw-space-x-reverse: 1; margin-right: 1.5rem; margin-left: 0px; }
        .rtl .space-x-8 > * + * { --tw-space-x-reverse: 1; margin-right: 2rem; margin-left: 0px; }
        
        /* RTL Buttons */
        .rtl .btn-group > * + * { margin-right: 0; margin-left: 0.5rem; }
        
        /* RTL Cards */
        .rtl .card { direction: rtl; }
        .rtl .card-header { text-align: right; }
        .rtl .card-body { text-align: right; }
        
        /* RTL Lists */
        .rtl ul, .rtl ol { text-align: right; padding-right: 1.5rem; padding-left: 0; }
        .rtl li { text-align: right; }
        
        /* RTL Tables */
        .rtl table { text-align: right; }
        .rtl th, .rtl td { text-align: right; }
        
        /* RTL Media Queries */
        @media (max-width: 640px) {
            .rtl .sm\\:text-left { text-align: right !important; }
            .rtl .sm\\:text-right { text-align: left !important; }
        }
        
        @media (min-width: 641px) {
            .rtl .md\\:text-left { text-align: right !important; }
            .rtl .md\\:text-right { text-align: left !important; }
        }
        
        @media (min-width: 768px) {
            .rtl .lg\\:text-left { text-align: right !important; }
            .rtl .lg\\:text-right { text-align: left !important; }
        }
        
        @media (min-width: 1024px) {
            .rtl .xl\\:text-left { text-align: right !important; }
            .rtl .xl\\:text-right { text-align: left !important; }
        }
    `;
    
    // Remove existing RTL styles
    const existingStyle = document.getElementById('rtl-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    document.head.appendChild(style);
}

function removeRTLLayoutStyles(): void {
    const style = document.getElementById('rtl-styles');
    if (style) {
        style.remove();
    }
}

// RTL-aware text alignment utilities
export function getRTLTextAlign(language: string): 'left' | 'right' | 'center' {
    if (isRTL(language)) {
        return 'right';
    }
    return 'left';
}

// RTL-aware margin/padding utilities
export function getRTLMarginClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert left margins to right margins for RTL
    return baseClass
        .replace(/ml-(\d+)/g, 'mr-$1')
        .replace(/mr-(\d+)/g, 'ml-$1')
        .replace(/ml-auto/g, 'mr-auto')
        .replace(/mr-auto/g, 'ml-auto')
        .replace(/ml-px/g, 'mr-px')
        .replace(/mr-px/g, 'ml-px');
}

export function getRTLPaddingClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert left padding to right padding for RTL
    return baseClass
        .replace(/pl-(\d+)/g, 'pr-$1')
        .replace(/pr-(\d+)/g, 'pl-$1')
        .replace(/pl-px/g, 'pr-px')
        .replace(/pr-px/g, 'pl-px');
}

// RTL-aware flexbox utilities
export function getRTLFlexClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert flex directions for RTL
    return baseClass
        .replace(/justify-start/g, 'justify-end')
        .replace(/justify-end/g, 'justify-start')
        .replace(/justify-self-start/g, 'justify-self-end')
        .replace(/justify-self-end/g, 'justify-self-start');
}

// RTL-aware grid utilities
export function getRTLGridColumnClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert grid column start/end for RTL
    return baseClass
        .replace(/col-start-(\d+)/g, 'col-end-$1')
        .replace(/col-end-(\d+)/g, 'col-start-$1');
}

// RTL-aware transform utilities
export function getRTLTransformClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert transforms for RTL
    return baseClass
        .replace(/rotate-90/g, '-rotate-90')
        .replace(/-rotate-90/g, 'rotate-90')
        .replace(/rotate-180/g, 'rotate-180')
        .replace(/rotate-270/g, '-rotate-270')
        .replace(/-rotate-270/g, 'rotate-270');
}

// RTL-aware animation utilities
export function getRTLAnimationClass(baseClass: string, language: string): string {
    if (!isRTL(language)) {
        return baseClass;
    }
    
    // Convert slide animations for RTL
    return baseClass
        .replace(/slide-left/g, 'slide-right')
        .replace(/slide-right/g, 'slide-left');
}

// RTL-aware component props
export interface RTLProps {
    language: string;
    children: React.ReactNode;
}

// RTL Provider Component
export function RTLProvider({ language, children }: RTLProps): JSX.Element {
    useEffect(() => {
        applyRTLStyles(language);
        
        // Listen for language changes
        const handleLanguageChange = () => {
            applyRTLStyles(language);
        };
        
        window.addEventListener('languagechange', handleLanguageChange);
        
        return () => {
            window.removeEventListener('languagechange', handleLanguageChange);
        };
    }, [language]);
// FIX-SYNTAX-ERROR:     
    return <div dir={getDirection(language)}>{children}</div>;
}

// RTL-aware hook
export function useRTL(language: string) {
    const direction = getDirection(language);
    const textAlign = getRTLTextAlign(language);
    
    return {
        direction,
        textAlign,
        isRTL: isRTL(language),
        getMarginClass: (baseClass: string) => getRTLMarginClass(baseClass, language),
        getPaddingClass: (baseClass: string) => getRTLPaddingClass(baseClass, language),
        getFlexClass: (baseClass: string) => getRTLFlexClass(baseClass, language),
        getGridColumnClass: (baseClass: string) => getRTLGridColumnClass(baseClass, language),
        getTransformClass: (baseClass: string) => getRTLTransformClass(baseClass, language),
        getAnimationClass: (baseClass: string) => getRTLAnimationClass(baseClass, language),
    };
}