'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary-soft-gray)]">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-primary-black)] mb-2">
                        ¡Ups! Algo salió mal
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Lo sentimos, pero parece que ha ocurrido un error inesperado. Por favor, intenta de nuevo.
                    </p>

                    <div className="space-y-3">
                        <Button
                            variant="primary"
                            href="/"
                            className="w-full"
                        >
                            Intentar de nuevo
                        </Button>

                        <Link href="/" passHref>
                            <Button
                                variant="outline"
                                className="w-full"
                            >
                                Volver al inicio
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            Si el problema persiste, por favor contacta a nuestro equipo de soporte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}