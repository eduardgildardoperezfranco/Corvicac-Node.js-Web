'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, detectBrowserLanguage, getCurrentLanguage } from '@/lib/i18n';
import Button from './ui/Button';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<string>('');
    const { t } = useTranslations();

    const languages = [
        { code: 'es', name: 'Español', flag: '🇨🇴', native: 'Español' },
        { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
        { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪', native: 'Deutsch' },
        { code: 'pt', name: 'Português', flag: '🇧🇷', native: 'Português' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹', native: 'Italiano' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦', native: 'العربية' },
        { code: 'zh', name: '中文', flag: '🇨🇳', native: '中文' },
        { code: 'ja', name: '日本語', flag: '🇯🇵', native: '日本語' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский' },
    ];

    const changeLanguage = (newLang: string) => {
        // Save preference
        localStorage.setItem('preferred-language', newLang);
        setCurrentLang(newLang);

        // Update URL
        const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
        router.push(newPath);
        
        setIsOpen(false);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('preferred-language');
        const detectedLang = detectBrowserLanguage();
        const current = getCurrentLanguage();
        
        setCurrentLang(savedLang || detectedLang || current);
        
        // Auto-detect and redirect if no language preference is set
        if (!savedLang && detectedLang !== 'es') {
            const detectedLanguage = languages.find(l => l.code === detectedLang);
            const confirmed = window.confirm(
                `¿Desea cambiar a ${detectedLanguage?.name || detectedLang.toUpperCase()} (${detectedLang.toUpperCase()})?`
            );
            if (confirmed) {
                changeLanguage(detectedLang);
            }
        }
    }, []);

    const getCurrentLanguageInfo = () => {
        return languages.find(l => l.code === currentLang) || languages[0];
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
                aria-label="Seleccionar idioma"
            >
                <span className="text-lg">{getCurrentLanguageInfo().flag}</span>
                <span className="hidden md:inline">{getCurrentLanguageInfo().name}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        {getCurrentLanguageInfo().native}
                    </div>
                    
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                            aria-label={`Cambiar a ${lang.name}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{lang.flag}</span>
                                <div>
                                    <div className="font-medium">{lang.name}</div>
                                    <div className="text-xs text-gray-500">{lang.native}</div>
                                </div>
                            </div>
                            {currentLang === lang.code && (
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                    
                    <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                        🌍 Idioma detectado automáticamente
                    </div>
                </div>
            )}
        </div>
    );
}