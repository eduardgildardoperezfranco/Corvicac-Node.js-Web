'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary-soft-gray)]">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">404</span>
                </div>

                <h1 className="text-3xl font-bold text-[var(--color-primary-black)] mb-2">
                    Página no encontrada
                </h1>

                <p className="text-gray-600 mb-6">
                    Lo sentimos, pero la página que estás buscando no existe o ha sido movida.
                </p>

                <div className="space-y-3">
                    <Link href="/" passHref>
                        <Button
                            variant="primary"
                            className="w-full"
                        >
                            Volver al inicio
                        </Button>
                    </Link>

                    <Link href="/nosotros" passHref>
                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            Conócenos
                        </Button>
                    </Link>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        ¿Necesitas ayuda? Contáctanos y te asistiremos con gusto.
                    </p>
                </div>
            </div>
        </div>
    );
}