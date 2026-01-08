'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function NotFound() {
    const router = useRouter();
    const { t } = useTranslations();

    useEffect(() => {
        // Log 404 error for analytics
        console.warn('404 - Página no encontrada:', window.location.pathname);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-green)] via-[var(--color-primary-gold)] to-[var(--color-primary-deep)]">
            <Container maxWidth="md" className="py-16">
                <div className="text-center">
                    <div className="bg-white rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-lg">
                        <span className="text-4xl">404</span>
                    </div>
                    
                    <h1 className="text-6xl font-bold text-white mb-4">
                        404
                    </h1>
                    
                    <h2 className="text-2xl font-bold text-white mb-8">
                        404
                    </h2>
                    
                    <p className="text-white/90 text-lg mb-12 max-w-2xl mx-auto">
                        404
                    </p>
                    
                    <div className="space-y-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => router.push('/')}
                            className="bg-white text-[var(--color-primary-green)] hover:bg-gray-100"
                        >
                            ← {(t('common') as Record<string, string>).back} {(t('nav') as Record<string, string>).home}
                        </Button>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/nosotros')}
                                className="text-white border-white hover:bg-white hover:text-[var(--color-primary-green)]"
                            >
                                {(t('nav') as Record<string, string>).about}
                            </Button>
                            
                            <Button
                                variant="outline"
                                onClick={() => router.push('/programas')}
                                className="text-white border-white hover:bg-white hover:text-[var(--color-primary-green)]"
                            >
                                {(t('nav') as Record<string, string>).programs}
                            </Button>
                            
                            <Button
                                variant="outline"
                                onClick={() => router.push('/apoyar')}
                                className="text-white border-white hover:bg-white hover:text-[var(--color-primary-green)]"
                            >
                                {(t('nav') as Record<string, string>).support}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-white/70">
                        <p className="text-sm">
                            ¿Necesitas ayuda? {(t('common') as Record<string, string>).contact} {(t('common') as Record<string, string>).contact}
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}