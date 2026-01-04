'use client';

import { useEffect } from 'react';
import { useTranslations, getOgLocale, getCurrentLanguage } from '@/lib/i18n';
import { analytics } from '@/lib/analytics';

export default function DynamicMetadata() {
    const { t } = useTranslations();
    const currentLang = getCurrentLanguage();

    useEffect(() => {
        // Update document language
        document.documentElement.lang = currentLang;
        
        // Update page title
        const pageTitle = t('metadata').title;
        document.title = pageTitle;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('metadata').description);
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', t('metadata').keywords);
        }
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', pageTitle);
        }
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', t('metadata').description);
        }
        
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) {
            ogLocale.setAttribute('content', getOgLocale(currentLang));
        }
        
        // Update Twitter Card tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', pageTitle);
        }
        
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', t('metadata').description);
        }
        
        // Add hreflang tags for all supported languages
        const supportedLanguages = ['es', 'en', 'fr', 'de', 'pt', 'it', 'ar', 'zh', 'ja', 'ru'];
        
        // Remove existing hreflang tags
        const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
        existingHreflang.forEach(tag => tag.remove());
        
        // Add new hreflang tags
        supportedLanguages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = `https://corvicac.org/${lang}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`;
            document.head.appendChild(link);
        });
        
        // Add x-default hreflang
        const defaultLink = document.createElement('link');
        defaultLink.rel = 'alternate';
        defaultLink.hreflang = 'x-default';
        defaultLink.href = 'https://corvicac.org/es' + window.location.pathname.replace(/^\/[a-z]{2}/, '');
        document.head.appendChild(defaultLink);
        
        // Track language change in analytics
        analytics.track('language_changed', {
            language: currentLang,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
        
        // Update body class for RTL support
        if (currentLang === 'ar') {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
        
    }, [currentLang, t]);

    return null; // This component doesn't render anything
}