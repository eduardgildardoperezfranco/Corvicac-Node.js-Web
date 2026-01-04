
import Container from '@/components/ui/Container';

export default function NosotrosPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="bg-[var(--color-primary-black)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/underground_theme.jpeg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <Container className="relative z-10" maxWidth="full" padding="md">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--color-primary-gold)]">
                        Quiénes Somos
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                        Un Organismo No Gubernamental para el Desarrollo (ONG), de Economía Social, Sin Ánimo de Lucro,
                        con Autonomía Administrativa y Financiera, creada por Técnicos y Profesionales altamente calificados.
                    </p>
                </Container>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <Container maxWidth="full" padding="md">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[var(--color-primary-gold)]"></div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-[var(--color-primary-deep)]">
                                    Nuestra Misión
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                    Somos una organización dinámica sin ánimo de lucro, dedicada a brindar servicios especializados
                                    y desarrollar eventos de apoyo, acompañamiento y asesoría a las víctimas del conflicto armado en Colombia.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Garantizamos una política efectiva, integral y con influencia nacional e internacional para ayudar
                                    a la superación de la vulnerabilidad, el respeto de los derechos y la reparación integral.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-[var(--color-secondary-soft-gray)] p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[320px]">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-green)] text-2xl">⚖️</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Justicia y Derechos</h3>
                                        <p className="text-sm text-gray-500">Asesoría jurídica y recuperación de tierras en el marco de la ley.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-green)] text-2xl">🎓</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Capacitación</h3>
                                        <p className="text-sm text-gray-500">Programas de entrenamiento y desarrollo laboral.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-green)] text-2xl">🕊️</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Paz Integral</h3>
                                        <p className="text-sm text-gray-500">Compromiso con la verdad, la reparación y la no repetición.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Vision Section */}
            <section className="py-20 bg-[var(--color-primary-deep)] text-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-primary-black)] opacity-20 skew-x-12 transform translate-x-20"></div>
                <Container className="relative z-10" maxWidth="full" padding="md">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <span className="text-[var(--color-primary-gold)] font-bold tracking-wider uppercase text-sm mb-4 block">
                                    Hacia el 2033
                                </span>
                                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[var(--color-primary-gold)]"></div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-white">
                                    Nuestra Visión
                                </h2>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Pretendemos ser una de las mejores Organizaciones No Gubernamentales especializadas en contribuir
                                    con el apoyo, acompañamiento y asesoría a las víctimas. Buscamos la reconstrucción de proyectos de vida,
                                    la recuperación de tierras, el empleo digno y la educación.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-sm border border-white/10 backdrop-blur-sm min-h-[320px]">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-gold)] text-2xl">👑</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Dignidad</h3>
                                        <p className="text-sm text-gray-300">Restablecimiento de derechos y condiciones de vida digna.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-gold)] text-2xl">🏗️</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Reconstrucción</h3>
                                        <p className="text-sm text-gray-300">Apoyo psicosocial y recuperación del tejido familiar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-[var(--color-primary-gold)] text-2xl">🌱</span>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Sostenibilidad</h3>
                                        <p className="text-sm text-gray-300">Proyectos productivos y alianzas estratégicas duraderas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Legal Representative Biography Section */}
            <section className="py-20 bg-gradient-to-br from-[var(--color-primary-deep)] via-[var(--color-primary-black)] to-[var(--color-secondary-soft-gray)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/underground_theme.jpeg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <Container className="relative z-10" maxWidth="full" padding="md">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/3 relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-[var(--color-primary-gold)]">
                                <img
                                    src="/Representante_legal_saliendo_del_Congreso_de_Colombia.jpeg"
                                    alt="José Carlos Obando Angulo, Representante Legal de Corvicac, saliendo del Congreso de Colombia"
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="text-[var(--color-primary-gold)] font-bold text-sm tracking-wider uppercase">
                                        Defensor de Derechos Humanos
                                    </span>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[var(--color-primary-gold)] opacity-50 rounded-full animate-pulse"></div>
                        </div>

                        {/* Biography Content */}
                        <div className="w-full lg:w-2/3 space-y-8">
                            <div className="space-y-4">
                                <span className="text-[var(--color-primary-gold)] font-bold tracking-wider uppercase text-sm">
                                    De la Tragedia a la Transformación
                                </span>
                                <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight">
                                    José Carlos Obando Angulo
                                </h2>
                                <div className="w-24 h-1 bg-[var(--color-primary-gold)]"></div>
                            </div>

                            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                                <p className="text-justify">
                                    <span className="text-[var(--color-primary-gold)] font-bold text-xl">Desde las cenizas de la violencia</span>, José Carlos Obando Angulo nació en el seno de una familia campesina en las tierras del Patía, Cauca y Nariño. Su infancia estuvo marcada por el eco de disparos y el silencio de las despedidas. A los 12 años, la guerra le arrebató a su madre, dos hermanos y a su padre, dejando atrás solo cenizas y tres fincas: El Shismero, Junta Grande y La Pradera.
                                </p>

                                <p className="text-justify">
                                    <span className="text-[var(--color-primary-gold)] font-bold">"La violencia no solo destruye vidas, también destruye sueños"</span> - palabras que resuenan en cada proyecto que lidera. Durante 20 años, su familia sufrió desplazamientos forzados, amenazas y el acoso sistemático de grupos armados que buscaban apoderarse de sus tierras ancestrales.
                                </p>

                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
                                        <span className="text-[var(--color-primary-gold)]">🎯</span>
                                        El Nacimiento de una Visión
                                    </h3>
                                    <p className="text-gray-300">
                                        En 2019, con el corazón aún herido pero con una determinación inquebrantable, José Carlos fundó la Corporación de Afrocolombianos y Mestizos con las Siglas Corvicac. <span className="text-[var(--color-primary-gold)] font-bold">"No nacimos para robar, nacimos para unir"</span> - este lema se convirtió en el ADN de una organización que busca sanar las heridas del conflicto armado colombiano.
                                    </p>
                                </div>

                                <p className="text-justify">
                                    <span className="text-[var(--color-primary-gold)] font-bold text-xl">Hoy, José Carlos es un faro de esperanza</span> para miles de víctimas del conflicto. Su historia no es solo de supervivencia, sino de <span className="text-[var(--color-primary-gold)] font-bold">resiliencia transformadora</span>. Ha convertido su dolor en un motor de cambio, demostrando que desde las profundidades del sufrimiento pueden nacer las soluciones más poderosas.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                        <div className="text-[var(--color-primary-gold)] text-3xl mb-2">🛡️</div>
                                        <h4 className="font-bold text-white mb-2">Protección</h4>
                                        <p className="text-sm text-gray-300">Defensor de derechos humanos reconocido por la Policía Nacional</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                        <div className="text-[var(--color-primary-gold)] text-3xl mb-2">🏛️</div>
                                        <h4 className="font-bold text-white mb-2">Reconocimiento</h4>
                                        <p className="text-sm text-gray-300">Condecorado por la Infantería de Marina Colombiana</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                                        <div className="text-[var(--color-primary-gold)] text-3xl mb-2">🤝</div>
                                        <h4 className="font-bold text-white mb-2">Unidad</h4>
                                        <p className="text-sm text-gray-300">Líder que une a víctimas para sanar y reconstruir</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-[var(--color-primary-gold)] to-[var(--color-primary-deep)] p-8 rounded-2xl shadow-2xl">
                                    <blockquote className="text-xl italic leading-relaxed text-[var(--color-primary-black)] font-semibold">
                                        "Creo en la igualdad para todos. Creo que desde la fe, la unión y el trabajo conjunto podemos construir un mundo mejor. Mi historia no terminó con la tragedia, comenzó con ella. Y cada día trabajo para que nadie tenga que contar una historia como la mía."
                                    </blockquote>
                                    <div className="mt-4 text-right">
                                        <span className="text-[var(--color-primary-black)] font-bold">- José Carlos Obando Angulo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Recognition & Achievements Section */}
            <section className="py-20 bg-gradient-to-br from-[var(--color-secondary-soft-gray)] via-white to-[var(--color-primary-deep)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/underground_theme.jpeg')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
                <Container className="relative z-10" maxWidth="full" padding="md">
                    <div className="text-center max-w-5xl mx-auto mb-16">
                        <span className="text-[var(--color-primary-gold)] font-bold tracking-wider uppercase text-sm mb-4 block">
                            Reconocimientos y Logros
                        </span>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-[var(--color-primary-deep)]">
                            Nuestro Camino de Reconocimiento
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A lo largo de nuestro recorrido, hemos sido reconocidos por diversas instituciones
                            por nuestro compromiso con la paz, la justicia y la defensa de los derechos humanos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Human Rights Defender Certification */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="/Certificacion_Defensor_Derechos_Humanos.jpeg"
                                    alt="Certificación como Defensor de Derechos Humanos"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-[var(--color-primary-gold)] text-[var(--color-primary-black)] px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--color-primary-gold)]/30">
                                        Defensor de Derechos Humanos
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[var(--color-primary-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-3 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary-gold)] transition-colors duration-300">
                                    Reconocimiento Humanitario
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                                    Certificación otorgada por organizaciones internacionales en reconocimiento
                                    al trabajo incansable en la defensa de los derechos humanos y la protección
                                    de las víctimas del conflicto armado.
                                </p>
                            </div>
                        </div>

                        {/* Police Protection Recognition */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="/Representante_legal_con_proteccion_de_la_Policia_Colombia.jpeg"
                                    alt="Representante Legal con protección de la Policía Nacional de Colombia"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-[var(--color-primary-deep)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--color-primary-deep)]/30">
                                        Protección Institucional
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[var(--color-primary-deep)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-3 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary-deep)] transition-colors duration-300">
                                    Seguridad y Protección
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                                    Reconocimiento de la Policía Nacional de Colombia por el trabajo de alto riesgo
                                    en la defensa de los derechos humanos y la protección de las comunidades vulnerables.
                                </p>
                            </div>
                        </div>

                        {/* Marine Corps Recognition */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="/Reconocimiento_a_la_Corporacion_por_parte_de_la_Infanteria_de_marina_Colombiana.jpeg"
                                    alt="Reconocimiento a la Corporación por parte de la Infantería de Marina Colombiana"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-[var(--color-primary-black)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--color-primary-black)]/30">
                                        Alianza Estratégica
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[var(--color-primary-black)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-3 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary-deep)] transition-colors duration-300">
                                    Construcción de Paz
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                                    Reconocimiento de la Infantería de Marina Colombiana por la labor conjunta
                                    en la construcción de paz y el fortalecimiento de las comunidades afectadas
                                    por el conflicto armado.
                                </p>
                            </div>
                        </div>

                        {/* CORVICAC Institutional Recognition */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="/Corvicac_Certificacion_Defensor_Derechos_Humanos.jpeg"
                                    alt="CORVICAC Certificación como Defensor de Derechos Humanos"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-[var(--color-primary-gold)] text-[var(--color-primary-black)] px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--color-primary-gold)]/30">
                                        Excelencia Institucional
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-[var(--color-primary-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-3 text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary-gold)] transition-colors duration-300">
                                    Trayectoria Ejemplar
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                                    Distinción otorgada a CORVICAC por su trayectoria ejemplar en la defensa de los derechos humanos
                                    y su compromiso inquebrantable con las víctimas del conflicto armado colombiano.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-[var(--color-primary-deep)] to-[var(--color-primary-gold)] p-8 rounded-2xl shadow-2xl">
                            <h3 className="font-bold text-2xl text-white mb-4">Comprometidos con la Excelencia</h3>
                            <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                                Cada reconocimiento es un compromiso renovado para seguir trabajando con integridad,
                                profesionalismo y dedicación total en la construcción de una Colombia en paz, donde
                                todos los derechos humanos sean respetados y garantizados.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Video Testimony Section */}
            <section className="py-20 bg-gradient-to-br from-[var(--color-secondary-soft-gray)] via-white to-[var(--color-primary-deep)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/underground_theme.jpeg')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
                <Container className="relative z-10" maxWidth="full" padding="md">
                    <div className="text-center max-w-5xl mx-auto mb-16">
                        <span className="text-[var(--color-primary-gold)] font-bold tracking-wider uppercase text-sm mb-4 block">
                            Historia que Inspira
                        </span>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-[var(--color-primary-deep)]">
                            Conoce Nuestra Historia
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Descubre la historia completa de José Carlos Obando Angulo y el nacimiento de CORVICAC.
                            Un testimonio poderoso que inspira esperanza y transformación.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative group w-full max-w-4xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-gold)] to-[var(--color-primary-deep)] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                                <div className="aspect-video bg-gradient-to-br from-[var(--color-primary-deep)] to-[var(--color-primary-black)] flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="text-6xl mb-4">🎬</div>
                                        <h3 className="font-bold text-2xl mb-2">Video Testimonio</h3>
                                        <p className="text-gray-300 mb-6">Historia de Transformación</p>
                                        <a
                                            href="https://youtu.be/VCBzCqpCwmg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-[var(--color-primary-gold)] text-[var(--color-primary-black)] px-6 py-3 rounded-full font-bold hover:bg-[var(--color-primary-deep)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            <span className="text-2xl">▶️</span>
                                            Ver Video Completo
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>YouTube Video</span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            <span>Disponible Ahora</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-[var(--color-primary-gold)] text-3xl mb-4">❤️</div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--color-primary-deep)]">Emoción</h3>
                            <p className="text-gray-600 text-sm">Un relato conmovedor que toca el corazón de todos los que lo escuchan.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-[var(--color-primary-gold)] text-3xl mb-4">💪</div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--color-primary-deep)]">Fuerza</h3>
                            <p className="text-gray-600 text-sm">Una historia de superación que demuestra el poder de la resiliencia humana.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-[var(--color-primary-gold)] text-3xl mb-4">🌟</div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--color-primary-deep)]">Inspiración</h3>
                            <p className="text-gray-600 text-sm">Un testimonio que motiva a otros a superar sus propias adversidades.</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-white">
                <Container maxWidth="full" padding="md">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-[var(--color-primary-deep)]">
                            Únete a Nuestra Misión
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            La historia de José Carlos es un testimonio de que el cambio es posible. Pero para seguir transformando vidas, necesitamos de tu apoyo. Cada contribución, grande o pequeña, se convierte en esperanza para quienes han perdido todo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/apoyar"
                                className="bg-[var(--color-primary-gold)] text-[var(--color-primary-black)] px-8 py-3 rounded-full font-bold hover:bg-[var(--color-primary-deep)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Apoya Nuestra Causa
                            </a>
                            <a
                                href="/programas"
                                className="border-2 border-[var(--color-primary-deep)] text-[var(--color-primary-deep)] px-8 py-3 rounded-full font-bold hover:bg-[var(--color-primary-deep)] hover:text-white transition-all duration-300"
                            >
                                Conoce Nuestros Programas
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
