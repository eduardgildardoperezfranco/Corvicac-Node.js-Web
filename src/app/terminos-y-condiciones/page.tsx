'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';

export default function TerminosCondicionesPage() {
    const [activeSection, setActiveSection] = useState<string>('privacidad');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="bg-[var(--color-primary-deep)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/underground_theme.jpeg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <Container className="relative z-10">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--color-primary-gold)]">
                        Políticas de Privacidad y Términos de Uso
                    </h1>
                    <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
                        Conoce cómo protegemos tu información y cuáles son las condiciones para utilizar nuestros servicios.
                        Cumplimos con las normativas internacionales más exigentes.
                    </p>
                </Container>
            </section>

            {/* Navigation */}
            <section className="bg-gray-50 border-b sticky top-0 z-50">
                <Container>
                    <nav className="flex flex-wrap gap-4 py-4">
                        {[
                            { id: 'privacidad', label: 'Política de Privacidad' },
                            { id: 'terminos', label: 'Términos de Uso' },
                            { id: 'gdpr', label: 'GDPR (UE)' },
                            { id: 'lgpd', label: 'LGPD (Brasil)' },
                            { id: 'ccpa', label: 'CCPA (California)' },
                            { id: 'copa', label: 'COPPA (EE.UU.)' },
                            { id: 'cookies', label: 'Política de Cookies' },
                            { id: 'seguridad', label: 'Seguridad de Datos' },
                            { id: 'contacto', label: 'Contacto y Derechos' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id
                                    ? 'bg-[var(--color-primary-gold)] text-[var(--color-primary-deep)] shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-[var(--color-primary-gold)] hover:text-[var(--color-primary-deep)]'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </Container>
            </section>

            {/* Content */}
            <section className="py-16">
                <Container>
                    {/* Privacy Policy */}
                    <article id="privacidad" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🛡️ Política de Privacidad
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-[var(--color-secondary-soft-gray)] p-6 rounded-2xl">
                                    <h3 className="font-bold text-xl mb-4 text-[var(--color-primary-deep)]">📅 Última actualización: Diciembre 2025</h3>
                                    <p className="text-gray-600">
                                        Esta Política de Privacidad describe cómo CORVICAC recopila, utiliza y protege tu información personal
                                        de acuerdo con el Reglamento General de Protección de Datos (GDPR), la Ley General de Protección de
                                        Datos (LGPD) y otras normativas internacionales.
                                    </p>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">1. Información que Recopilamos</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📋 Datos Personales</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Nombre completo y datos de contacto</li>
                                                <li>• Dirección de correo electrónico</li>
                                                <li>• Número de teléfono</li>
                                                <li>• Dirección postal</li>
                                                <li>• Información de donaciones y transacciones</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🌐 Datos Técnicos</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Dirección IP y tipo de navegador</li>
                                                <li>• Páginas visitadas y tiempo de permanencia</li>
                                                <li>• Cookies y tecnologías de rastreo</li>
                                                <li>• Dispositivo utilizado</li>
                                                <li>• Preferencias de idioma</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">2. Finalidades del Tratamiento</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--color-primary-gold)]">
                                            <h4 className="font-bold mb-2">🤝 Gestión de Donaciones</h4>
                                            <p className="text-sm text-gray-600">Procesamiento de pagos, emisión de recibos fiscales y seguimiento de donaciones.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--color-primary-gold)]">
                                            <h4 className="font-bold mb-2">📧 Comunicación</h4>
                                            <p className="text-sm text-gray-600">Envío de boletines informativos, actualizaciones de eventos y respuestas a consultas.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--color-primary-gold)]">
                                            <h4 className="font-bold mb-2">📊 Análisis y Mejora</h4>
                                            <p className="text-sm text-gray-600">Estadísticas de uso, mejora de servicios y personalización de contenidos.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">3. Fundamentos Legales (GDPR)</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">✅ Consentimiento</h4>
                                            <p className="text-sm text-gray-600">Cuando nos autorizas para fines específicos como recibir comunicaciones comerciales.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🤝 Relación Contractual</h4>
                                            <p className="text-sm text-gray-600">Para cumplir con obligaciones contractuales como donaciones o servicios solicitados.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">⚖️ Obligación Legal</h4>
                                            <p className="text-sm text-gray-600">Cumplimiento de requerimientos fiscales, contables y regulatorios.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🎯 Interés Legítimo</h4>
                                            <p className="text-sm text-gray-600">Para fines como seguridad informática, prevención de fraudes y mejora de servicios.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* Terms of Use */}
                    <article id="terminos" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                📄 Términos de Uso
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">1. Aceptación de los Términos</h3>
                                    <p className="bg-white p-4 rounded-lg border border-gray-200">
                                        Al acceder y utilizar este sitio web, aceptas quedar sujeto a estos Términos de Uso, todas las leyes
                                        y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de las leyes locales aplicables.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">2. Licencia de Uso</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border-l-4 border-[var(--color-primary-gold)]">
                                            <h4 className="font-bold mb-2">✅ Uso Permitido</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Visualizar y compartir contenido para fines informativos</li>
                                                <li>• Realizar donaciones a través de canales oficiales</li>
                                                <li>• Contactar a la organización para consultas legítimas</li>
                                                <li>• Utilizar materiales educativos con fines no comerciales</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                                            <h4 className="font-bold mb-2 text-red-600">❌ Uso Prohibido</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Cualquier actividad fraudulenta o maliciosa</li>
                                                <li>• Suplantación de identidad o información falsa</li>
                                                <li>• Uso de bots o herramientas automatizadas no autorizadas</li>
                                                <li>• Intento de acceso no autorizado a sistemas</li>
                                                <li>• Publicación de contenido ofensivo o ilegal</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">3. Propiedad Intelectual</h3>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">© Derechos Reservados</h4>
                                        <p className="text-sm text-gray-600">
                                            Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes,
                                            clips de audio y software, es propiedad de CORVICAC o de sus proveedores de contenido y está
                                            protegido por las leyes internacionales de derechos de autor, marcas registradas y otras
                                            propiedades intelectuales.
                                        </p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">4. Limitación de Responsabilidad</h3>
                                    <p className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
                                        CORVICAC no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente
                                        que resulte del uso o la imposibilidad de usar sus materiales o servicios, incluso si se ha advertido
                                        de la posibilidad de tales daños.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* GDPR Compliance */}
                    <article id="gdpr" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🇪🇺 GDPR - Reglamento General de Protección de Datos (Unión Europea)
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400">
                                    <h3 className="font-bold text-2xl mb-4 text-blue-800">📋 Derechos de los Interesados (Artículo 15-22)</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-blue-600">👁️ Derecho de Acceso</h4>
                                            <p className="text-sm text-gray-600">Puedes solicitar confirmación de si tratamos tus datos y acceder a ellos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-blue-600">✏️ Derecho de Rectificación</h4>
                                            <p className="text-sm text-gray-600">Puedes solicitar la corrección de datos inexactos o incompletos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-blue-600">🗑️ Derecho al Olvido</h4>
                                            <p className="text-sm text-gray-600">Puedes solicitar el borrado de tus datos cuando ya no son necesarios.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-blue-600">📊 Derecho a la Limitación</h4>
                                            <p className="text-sm text-gray-600">Puedes solicitar la limitación del tratamiento de tus datos personales.</p>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Deberes del Responsable del Tratamiento</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🔐 Principio de Licitud, Lealtad y Transparencia</h4>
                                            <p className="text-sm text-gray-600">Los datos se tratan de manera lícita, leal y transparente respecto al interesado.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🎯 Principio de Limitación de Finalidad</h4>
                                            <p className="text-sm text-gray-600">Los datos se recogen con fines determinados, explícitos y legítimos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📏 Principio de Minimización de Datos</h4>
                                            <p className="text-sm text-gray-600">Se recogen datos adecuados, pertinentes y limitados a lo necesario.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">✅ Principio de Exactitud</h4>
                                            <p className="text-sm text-gray-600">Los datos son exactos y se mantienen actualizados.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* LGPD Compliance */}
                    <article id="lgpd" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🇧🇷 LGPD - Lei Geral de Proteção de Dados (Brasil)
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-400">
                                    <h3 className="font-bold text-2xl mb-4 text-green-800">📋 Princípios da LGPD (Art. 6º)</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-green-600">⚖️ Finalidade</h4>
                                            <p className="text-sm text-gray-600">Finalidade legítima, específica e explícita.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-green-600">🔒 Necessidade</h4>
                                            <p className="text-sm text-gray-600">Uso restrito aos mínimos necessários para a finalidade.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-green-600">📊 Qualidade dos Dados</h4>
                                            <p className="text-sm text-gray-600">Exatidão, clareza, relevância e atualização dos dados.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-green-600">🛡️ Segurança</h4>
                                            <p className="text-sm text-gray-600">Proteção dos dados por medidas técnicas e administrativas.</p>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Hipóteses de Tratamento Lícito (Art. 7º)</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">✅ Consentimento</h4>
                                            <p className="text-sm text-gray-600">Consentimento livre, informado e inequívoco do titular.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🤝 Legítimo Interesse</h4>
                                            <p className="text-sm text-gray-600">Legítimo interesse do controlador ou de terceiros.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">⚖️ Cumplimento Legal</h4>
                                            <p className="text-sm text-gray-600">Cumplimiento de obligación legal o regulatoria.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🤝 Contrato</h4>
                                            <p className="text-sm text-gray-600">Ejercicio de derechos en un proceso judicial, administrativo o arbitral.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* CCPA Compliance */}
                    <article id="ccpa" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🇺🇸 CCPA - California Consumer Privacy Act (California, EE.UU.)
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-400">
                                    <h3 className="font-bold text-2xl mb-4 text-orange-800">📋 Derechos de los Consumidores (Sección 1798.100)</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-orange-600">👁️ Derecho a Saber</h4>
                                            <p className="text-sm text-gray-600">Tienes derecho a saber qué información personal se recopila sobre ti.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-orange-600">🗑️ Derecho a Eliminar</h4>
                                            <p className="text-sm text-gray-600">Tienes derecho a solicitar la eliminación de tu información personal.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-orange-600">🚫 Derecho a Optar por no vender</h4>
                                            <p className="text-sm text-gray-600">Tienes derecho a optar por no vender tu información personal.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-orange-600">⚖️ Derecho a la No Discriminación</h4>
                                            <p className="text-sm text-gray-600">No serás discriminado por ejercer estos derechos.</p>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Categorías de Información Personal (Sección 1798.140)</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">👤 Identificadores</h4>
                                            <p className="text-sm text-gray-600">Nombre, alias, dirección postal, identificador único, número de licencia de conducir, número de pasaporte, etc.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📧 Información Electrónica</h4>
                                            <p className="text-sm text-gray-600">Dirección de correo electrónico, número de identificación de la cuenta, nombre de usuario y contraseña.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">💳 Información Financiera</h4>
                                            <p className="text-sm text-gray-600">Número de tarjeta de crédito o débito, datos de facturación y pagos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🌐 Información de Actividad</h4>
                                            <p className="text-sm text-gray-600">Historial de búsquedas, interacciones con sitios web y aplicaciones.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* COPPA Compliance */}
                    <article id="copa" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🇺🇸 COPPA - Children's Online Privacy Protection Act (EE.UU.)
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-400">
                                    <h3 className="font-bold text-2xl mb-4 text-purple-800">📋 Protección de Niños Menores de 13 Años</h3>
                                    <p className="text-sm text-purple-700">
                                        Esta sección aplica a la recopilación de información personal de niños menores de 13 años
                                        de acuerdo con la COPPA. CORVICAC no recopila intencionalmente información personal de
                                        niños menores de 13 años sin el consentimiento verificable de los padres.
                                    </p>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Requisitos de la COPPA</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📝 Aviso Público</h4>
                                            <p className="text-sm text-gray-600">Política de privacidad clara sobre la recopilación y uso de información de niños.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">✅ Consentimiento Paterno</h4>
                                            <p className="text-sm text-gray-600">Obtención de consentimiento verificable de los padres antes de recopilar información.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🗑️ Derecho a Eliminar</h4>
                                            <p className="text-sm text-gray-600">Los padres pueden revisar y solicitar la eliminación de la información de sus hijos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🔒 Confidencialidad</h4>
                                            <p className="text-sm text-gray-600">Mantener la información personal de los niños confidencial y segura.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* Cookies Policy */}
                    <article id="cookies" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🍪 Política de Cookies
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-400">
                                    <h3 className="font-bold text-2xl mb-4 text-yellow-800">📋 ¿Qué son las Cookies?</h3>
                                    <p className="text-sm text-yellow-700">
                                        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
                                        nuestro sitio web. Nos ayudan a mejorar tu experiencia de usuario y a entender cómo se utiliza
                                        nuestro sitio.
                                    </p>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Tipos de Cookies que Utilizamos</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🍪 Cookies Esenciales</h4>
                                            <p className="text-sm text-gray-600">Necesarias para el funcionamiento del sitio web (carrito de compras, seguridad, etc.).</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📊 Cookies Analíticas</h4>
                                            <p className="text-sm text-gray-600">Nos ayudan a entender cómo se utiliza nuestro sitio para mejorarlo (Google Analytics).</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🎯 Cookies Publicitarias</h4>
                                            <p className="text-sm text-gray-600">Nos permiten mostrarte anuncios relevantes basados en tus intereses.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">💬 Cookies de Preferencias</h4>
                                            <p className="text-sm text-gray-600">Recordamos tus preferencias (idioma, ubicación, etc.) para futuras visitas.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Gestión de Cookies</h3>
                                    <p className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600 mb-4">
                                        Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador o
                                        mediante el banner de cookies en nuestro sitio web.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🚫 Rechazar Todas</h4>
                                            <p className="text-sm text-gray-600">Puedes optar por no aceptar cookies no esenciales.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">✅ Aceptar Selección</h4>
                                            <p className="text-sm text-gray-600">Selecciona qué tipos de cookies deseas permitir.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🔧 Configuración Detallada</h4>
                                            <p className="text-sm text-gray-600">Personaliza tus preferencias de cookies en detalle.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* Data Security */}
                    <article id="seguridad" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                🔐 Seguridad de Datos y Protección
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-400">
                                    <h3 className="font-bold text-2xl mb-4 text-red-800">📋 Medidas de Seguridad Implementadas</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-red-600">🔒 Encriptación SSL/TLS</h4>
                                            <p className="text-sm text-gray-600">Todos los datos se transmiten encriptados para protegerlos de accesos no autorizados.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-red-600">🛡️ Firewalls y Antivirus</h4>
                                            <p className="text-sm text-gray-600">Sistemas de detección y prevención de intrusiones activos 24/7.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-red-600">🔑 Autenticación Segura</h4>
                                            <p className="text-sm text-gray-600">Control de acceso basado en roles y autenticación de dos factores.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold mb-2 text-red-600">💾 Copias de Seguridad</h4>
                                            <p className="text-sm text-gray-600">Respaldo diario de datos con encriptación y almacenamiento seguro.</p>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Incidentes de Seguridad</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🚨 Protocolo de Notificación</h4>
                                            <p className="text-sm text-gray-600">
                                                En caso de brecha de seguridad que afecte tus datos, te notificaremos dentro de las 72 horas
                                                según requiere el GDPR, o según lo exijan las leyes aplicables en tu jurisdicción.
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📋 Procedimientos de Actuación</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Identificación y análisis del incidente</li>
                                                <li>• Contención y recuperación</li>
                                                <li>• Notificación a autoridades competentes</li>
                                                <li>• Comunicación a los interesados afectados</li>
                                                <li>• Medidas correctivas y preventivas</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </article>

                    {/* Contact and Rights */}
                    <article id="contacto" className="mb-20 scroll-mt-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8 text-[var(--color-primary-deep)]">
                                📞 Contacto y Ejercicio de Derechos
                            </h2>

                            <div className="space-y-8 text-gray-700 leading-relaxed">
                                <div className="bg-[var(--color-secondary-soft-gray)] p-6 rounded-2xl">
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 ¿Cómo Ejercer Tus Derechos?</h3>
                                    <p className="text-gray-600 mb-6">
                                        Puedes ejercer cualquiera de tus derechos contactándonos a través de los siguientes canales:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📧 Correo Electrónico</h4>
                                            <p className="text-sm text-gray-600 mb-2">Para consultas generales:</p>
                                            <p className="font-mono text-sm text-blue-600">info@corvicac.org</p>
                                            <p className="text-sm text-gray-600 mb-2 mt-4">Para temas de protección de datos:</p>
                                            <p className="font-mono text-sm text-blue-600">protecciondedatos@corvicac.org</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📍 Dirección Postal</h4>
                                            <p className="text-sm text-gray-600">
                                                CORVICAC<br />
                                                Departamento de Protección de Datos<br />
                                                Calle Principal #123<br />
                                                Bogotá, Colombia
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Plazos de Respuesta</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">⏱️ GDPR (UE)</h4>
                                            <p className="text-sm text-gray-600">Máximo 1 mes calendario, ampliable a 3 meses en casos complejos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">⏱️ LGPD (Brasil)</h4>
                                            <p className="text-sm text-gray-600">Máximo 15 días, con posibilidad de prorroga.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">⏱️ CCPA (California)</h4>
                                            <p className="text-sm text-gray-600">Máximo 45 días, ampliable a 90 días en casos complejos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">📋 Requisitos de Identificación</h4>
                                            <p className="text-sm text-gray-600">Se requerirá identificación válida para verificar tu identidad.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="font-bold text-2xl mb-4 text-[var(--color-primary-deep)]">📋 Recursos y Reclamaciones</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🇪🇺 Autoridades de Control (UE)</h4>
                                            <p className="text-sm text-gray-600">Puedes presentar reclamaciones ante tu autoridad de control local si consideras que el tratamiento infringe el GDPR.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🇧🇷 ANPD (Brasil)</h4>
                                            <p className="text-sm text-gray-600">Agencia Nacional de Proteção de Dados - Autoridad nacional de protección de datos.</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold mb-2 text-[var(--color-primary-green)]">🇺🇸 Procuraduría General (EE.UU.)</h4>
                                            <p className="text-sm text-gray-600">Para reclamaciones bajo CCPA o COPPA según corresponda.</p>
                                        </div>
                                    </div>
                                </section>

                                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400">
                                    <h3 className="font-bold text-2xl mb-4 text-blue-800">📋 Actualizaciones de esta Política</h3>
                                    <p className="text-sm text-blue-700">
                                        Esta Política de Privacidad y Términos de Uso puede ser actualizada periódicamente para reflejar
                                        cambios en nuestras prácticas o requisitos legales. Te notificaremos sobre cambios significativos
                                        a través de nuestro sitio web o mediante correo electrónico.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </Container>
            </section>
        </main>
    );
}