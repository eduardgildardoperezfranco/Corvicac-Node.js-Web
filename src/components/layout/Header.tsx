'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`border-b border-gray-100 bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : ''
                }`}
            role="banner"
        >
            <Container className="flex h-16 items-center justify-between" maxWidth="full" padding="sm">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                    aria-label="CORVICAC - Ir a la página de inicio"
                >
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100">
                        <Image
                            src="/LogoCorvicac3D.png"
                            alt="CORVICAC Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="font-heading font-bold text-xl text-[var(--color-primary-green)] hidden sm:block">CORVICAC</span>
                </Link>

                <nav className="hidden md:flex items-center justify-center flex-1" role="navigation" aria-label="Menú de navegación">
                    <div className="flex flex-wrap gap-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                            aria-current="page"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/nosotros"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/eventos"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Eventos
                        </Link>
                        <Link
                            href="/programas"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Programas
                        </Link>
                        <Link
                            href="/apoyar"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Apoyar
                        </Link>
                        <Link
                            href="/accessibility-guide"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Accesibilidad
                        </Link>
                        <Link
                            href="/terminos-y-condiciones"
                            className="text-sm font-medium text-[var(--color-primary-black)] hover:text-[var(--color-flag-yellow)] transition-colors"
                        >
                            Legal
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    <Button
                        variant="primary"
                        className="!py-2 !px-4 text-sm"
                        aria-label="Apoyar a CORVICAC"
                        href="/apoyar"
                    >
                        Apoyar
                    </Button>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen ? 'true' : 'false'}
                        aria-controls="mobile-menu"
                        aria-label="Menú de navegación"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </Container>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden border-t border-gray-100 bg-white"
                    role="navigation"
                    aria-label="Menú de navegación móvil"
                >
                    <Container>
                        <div className="py-3 space-y-1">
                            <Link
                                href="/"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                                aria-current="page"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/nosotros"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Nosotros
                            </Link>
                            <Link
                                href="/eventos"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Eventos
                            </Link>
                            <Link
                                href="/programas"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Programas
                            </Link>
                            <Link
                                href="/apoyar"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Apoyar
                            </Link>
                            <Link
                                href="/accessibility-guide"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Accesibilidad
                            </Link>
                            <Link
                                href="/terminos-y-condiciones"
                                className="block py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Legal
                            </Link>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    )
}