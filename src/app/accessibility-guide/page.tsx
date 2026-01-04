'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { analytics } from '@/lib/analytics';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import AccessibilityPanel from '@/components/AccessibilityPanel';

export default function AccessibilityGuide() {
    const router = useRouter();
    const [isToolsOpen, setIsToolsOpen] = useState(false);

    useEffect(() => {
        // Track page view
        analytics.trackPageView('/accessibility-guide', 'Guía de Accesibilidad');
        
        // Track accessibility guide visit
        analytics.trackEvent('accessibility_guide', {
            action: 'view_guide',
            timestamp: new Date().toISOString()
        });
    }, []);

    const handleBackToHome = () => {
        analytics.trackEvent('accessibility_guide', {
            action: 'navigate_home',
            timestamp: new Date().toISOString()
        });
        router.push('/');
    };

    const handleOpenTools = () => {
        setIsToolsOpen(true);
        analytics.trackEvent('accessibility_guide', {
            action: 'open_tools_from_guide',
            timestamp: new Date().toISOString()
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Floating Accessibility Tools */}
            {isToolsOpen && <AccessibilityPanel />}
            
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <Container className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBackToHome}
                                className="flex items-center gap-2 text-[var(--color-primary-green)] hover:text-[var(--color-primary-deep)] transition-colors"
                                aria-label="Volver al inicio"
                            >
                                ← Volver al inicio
                            </button>
                            <div className="w-px h-6 bg-gray-300"></div>
                            <h1 className="text-2xl font-bold text-gray-900">Guía de Accesibilidad</h1>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Main Content */}
            <main className="py-8">
                <Container>
                    {/* Hero Section */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Bienvenido a nuestra Guía de Accesibilidad
                                </h2>
                                <p className="text-gray-600 mb-6 text-lg">
                                    En CORVICAC nos comprometemos a que nuestro sitio web sea accesible 
                                    para todas las personas, independientemente de sus capacidades.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                        ✓ WCAG 2.1 AA
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                        ✓ Lector de pantalla
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                                        ✓ Navegación por teclado
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                                    <div className="text-6xl mb-4">♿</div>
                                    <p className="text-gray-600 font-medium">
                                        Accesibilidad para todos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-3 text-gray-900">Configuración Rápida</h3>
                            <p className="text-gray-600 mb-4">
                                Ajusta el sitio web según tus necesidades en un solo clic.
                            </p>
                            <Button
                                variant="outline"
                                onClick={handleOpenTools}
                                className="w-full"
                            >
                                Abrir Herramientas de Accesibilidad
                            </Button>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-3 text-gray-900">Atajo de Teclado</h3>
                            <p className="text-gray-600 mb-4">
                                Presiona <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Alt</kbd> + <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">A</kbd> para abrir las herramientas de accesibilidad.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    analytics.trackEvent('accessibility_guide', {
                                        action: 'keyboard_shortcut_info',
                                        timestamp: new Date().toISOString()
                                    });
                                }}
                                className="w-full"
                            >
                                Más atajos de teclado
                            </Button>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-3 text-gray-900">Soporte Técnico</h3>
                            <p className="text-gray-600 mb-4">
                                ¿Necesitas ayuda con la accesibilidad? Contáctanos para asistencia personalizada.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    analytics.trackEvent('accessibility_guide', {
                                        action: 'contact_support',
                                        timestamp: new Date().toISOString()
                                    });
                                    window.open('mailto:contacto@corvicac.org', '_blank');
                                }}
                                className="w-full"
                            >
                                Contactar Soporte
                            </Button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[
                            {
                                title: 'Tamaño de Fuente',
                                description: 'Ajusta el tamaño del texto para una mejor lectura',
                                icon: '🔤',
                                features: ['Pequeño', 'Mediano', 'Grande']
                            },
                            {
                                title: 'Contraste',
                                description: 'Mejora la visibilidad con diferentes niveles de contraste',
                                icon: '🎨',
                                features: ['Normal', 'Alto contraste', 'Modo oscuro']
                            },
                            {
                                title: 'Modo de Lectura',
                                description: 'Optimiza el contenido para una mejor experiencia de lectura',
                                icon: '📖',
                                features: ['Espaciado mejorado', 'Ancho de línea óptimo', 'Sin distracciones']
                            },
                            {
                                title: 'Animaciones',
                                description: 'Controla las animaciones para mayor comodidad',
                                icon: '🎬',
                                features: ['Reducir movimientos', 'Desactivar animaciones', 'Transiciones suaves']
                            },
                            {
                                title: 'Lector de Pantalla',
                                description: 'Optimiza el sitio para tecnologías de asistencia',
                                icon: '🔊',
                                features: ['Navegación mejorada', 'Descripciones de imágenes', 'Estructura semántica']
                            },
                            {
                                title: 'Navegación por Teclado',
                                description: 'Accede a todo el contenido usando solo el teclado',
                                icon: '⌨️',
                                features: ['Tabulación lógica', 'Atajos de teclado', 'Foco visible']
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h4 className="font-semibold text-lg mb-2 text-gray-900">{feature.title}</h4>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <ul className="space-y-1">
                                    {feature.features.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-2 h-2 bg-[var(--color-primary-green)] rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Instructions */}
                    <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Cómo Usar las Herramientas de Accesibilidad</h3>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-900">Desde el Botón Flotante</h4>
                                <ol className="space-y-3 text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="bg-[var(--color-primary-green)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                                        Busca el botón ♿ en la esquina inferior derecha de tu pantalla
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="bg-[var(--color-primary-green)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                                        Haz clic para abrir el panel de accesibilidad
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="bg-[var(--color-primary-green)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                                        Ajusta las configuraciones según tus necesidades
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="bg-[var(--color-primary-green)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                                        Los cambios se aplican automáticamente y se guardan
                                    </li>
                                </ol>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-900">Atajos de Teclado</h4>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <span>Alt + A</span>
                                        <span className="text-sm text-gray-500">Abrir herramientas de accesibilidad</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <span>Tab</span>
                                        <span className="text-sm text-gray-500">Navegar entre elementos</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <span>Shift + Tab</span>
                                        <span className="text-sm text-gray-500">Navegar hacia atrás</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <span>Enter / Espacio</span>
                                        <span className="text-sm text-gray-500">Activar elementos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Information */}
                    <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Información Técnica</h3>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-900">Estándares Cumplidos</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        WCAG 2.1 Nivel AA
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Sección 508 (EE.UU.)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        EN 301 549 (UE)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        HTML5 semántico
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-900">Compatibilidad</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        NVDA (Windows)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        JAWS (Windows)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        VoiceOver (macOS/iOS)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        TalkBack (Android)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Tienes Comentarios o Sugerencias?</h3>
                        <p className="text-gray-600 mb-6">
                            Nos encantaría saber cómo podemos mejorar la accesibilidad de nuestro sitio web. 
                            Tu experiencia es fundamental para nosotros.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-lg mb-3 text-gray-900">Reportar un Problema</h4>
                                <p className="text-gray-600 mb-4">
                                    Si encuentras algún problema de accesibilidad, por favor contáctanos.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        analytics.trackEvent('accessibility_guide', {
                                            action: 'report_issue',
                                            timestamp: new Date().toISOString()
                                        });
                                        window.open('mailto:accesibilidad@corvicac.org', '_blank');
                                    }}
                                >
                                    Reportar Problema de Accesibilidad
                                </Button>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg mb-3 text-gray-900">Sugerir Mejoras</h4>
                                <p className="text-gray-600 mb-4">
                                    ¿Tienes ideas para mejorar nuestra accesibilidad? ¡Estamos escuchando!
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        analytics.trackEvent('accessibility_guide', {
                                            action: 'suggest_improvement',
                                            timestamp: new Date().toISOString()
                                        });
                                        window.open('mailto:feedback@corvicac.org', '_blank');
                                    }}
                                >
                                    Sugerir Mejora
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-12">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} CORVICAC. Comprometidos con la accesibilidad para todos.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleBackToHome}
                                className="text-sm hover:text-[var(--color-primary-green)] transition-colors"
                            >
                                Volver al inicio
                            </button>
                            <button
                                onClick={handleOpenTools}
                                className="text-sm hover:text-[var(--color-primary-green)] transition-colors"
                            >
                                Herramientas de Accesibilidad
                            </button>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
}