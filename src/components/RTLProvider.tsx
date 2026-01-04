'use client';

import { useEffect } from 'react';
import { RTL_LANGUAGES, getDirection, applyRTLStyles } from '@/lib/rtl';

interface RTLProviderProps {
    language: string;
    children: React.ReactNode;
}

export default function RTLProvider({ language, children }: RTLProviderProps) {
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
    
    return (
        <div dir={getDirection(language)} className={RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr'}>
            {children}
        </div>
    );
}