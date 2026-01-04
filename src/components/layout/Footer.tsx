import Container from '../ui/Container';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-gradient-to-br from-[var(--color-primary-black)] via-[var(--color-primary-deep)] to-[var(--color-primary-deep)] text-white py-10 border-t-2 border-[var(--color-primary-gold)]/20 shadow-2xl"
            role="contentinfo"
            aria-label="Pie de página"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] opacity-20 pointer-events-none"></div>

            {/* Full-width background with Container content */}
            <div className="relative">
                <Container maxWidth="full" padding="sm">
                    {/* Main Footer Content */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 mb-8 relative z-10">
                        {/* Brand Column */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <div>
                                    <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-1 text-[var(--color-primary-gold)] tracking-tight">
                                        CORVICAC
                                    </h3>
                                </div>
                            </div>

                            <div className="text-gray-300 leading-relaxed mb-6 text-sm text-justify">
                                <p className="mb-3">
                                    <strong>Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano</strong> - una organización sin ánimo de lucro dedicada a la reconstrucción del tejido social y la defensa de los derechos humanos.
                                </p>
                                <p>
                                    Trabajamos incansablemente por la paz, la justicia y la dignidad de las víctimas del conflicto armado interno colombiano. Nuestro compromiso trasciende la asistencia humanitaria, impulsando procesos de reparación integral, restitución de tierras y desarrollo sostenible para comunidades afectadas.
                                </p>
                                <p className="mt-3 text-[var(--color-primary-green)] font-semibold">
                                    Transformando el dolor en esperanza, construyendo un futuro de reconciliación y desarrollo inclusivo para Colombia.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/nosotros"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] text-white rounded-xl hover:from-[var(--color-primary-deep)] hover:to-[var(--color-primary-gold)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    aria-label="Conoce más sobre CORVICAC"
                                >
                                    <span className="text-sm font-semibold">Conocer Más</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/apoyar"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm"
                                    aria-label="Apoya nuestra causa"
                                >
                                    <span className="text-sm font-semibold">Apoyar</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-[var(--color-primary-gold)] flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                Explorar
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { href: "/", label: "Inicio", icon: "🏠" },
                                    { href: "/nosotros", label: "Sobre Nosotros", icon: "👤" },
                                    { href: "/programas", label: "Nuestros Programas", icon: "💼" },
                                    { href: "/eventos", label: "Eventos", icon: "📄" },
                                    { href: "/apoyar", label: "Apoyar", icon: "❤️" }
                                ].map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                                        >
                                            <span className="text-sm">{item.icon}</span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-[var(--color-primary-gold)] flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contacto
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <svg className="w-5 h-5 text-[var(--color-primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">Correo</p>
                                        <p className="text-white font-medium">info@corvicac.org</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <svg className="w-5 h-5 text-[var(--color-primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">Teléfono</p>
                                        <p className="text-white font-medium">+57 320 961 0147</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <svg className="w-5 h-5 text-[var(--color-primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">Ubicación</p>
                                        <p className="text-white font-medium">Bogotá, Colombia</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6 text-[var(--color-primary-gold)] flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 20h7a2 2 0 002-2V6a2 2 0 00-2-2h-5M10 18L5 12l5-6" />
                                </svg>
                                Síguenos
                            </h4>
                            <div className="flex gap-4 mb-6">
                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/CORVICAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Síguenos en Facebook"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                {/* X (Twitter) */}
                                <a
                                    href="https://twitter.com/CORVICAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Síguenos en X"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-sky-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-sky-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/CORVICAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Síguenos en Instagram"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                                        <path d="M18.5 2.5h-13A4.5 4.5 0 001 7v10a4.5 4.5 0 004.5 4.5h13A4.5 4.5 0 0023 17V7a4.5 4.5 0 00-4.5-4.5zM12 18a6 6 0 116-6 6 6 0 01-6 6z" />
                                        <path d="M17.5 6a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                    </svg>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/573209610147"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Contáctanos por WhatsApp"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-[#25D366] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.487 1.694.621.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/company/CORVICAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Síguenos en LinkedIn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                {/* YouTube */}
                                <a
                                    href="https://www.youtube.com/c/CORVICAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                    aria-label="Síguenos en YouTube"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                                    <svg className="relative w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C.278 7.613.024 9.76.024 12s.254 4.387.477 6.314a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24.722 16.387 24.977 14.224 24.977 12s-.254-4.387-.479-6.314zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Mantente informado de nuestros eventos y actividades.
                                Únete a nuestra comunidad y sé parte del cambio.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-primary-gold)]/40 to-transparent h-px"></div>
                        <div className="relative bg-gradient-to-r from-[var(--color-primary-gold)]/20 to-transparent h-px"></div>
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 items-center lg:items-start">
                            <p className="text-white font-semibold text-sm">
                                © {currentYear} CORVICAC. Todos los derechos reservados.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/terminos-y-condiciones"
                                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Política de Privacidad y Términos de Uso
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs text-gray-400">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[var(--color-primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Seguro y Confiable
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[var(--color-primary-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Sin Fines de Lucro
                            </span>
                            <span className="text-[10px] opacity-70">Version 0.1.0</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary-gold)] via-[var(--color-primary-green)] to-[var(--color-primary-deep)] opacity-30"></div>
        </footer>
    )
}
