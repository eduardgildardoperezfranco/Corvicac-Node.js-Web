'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

interface Program {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    beneficiaries: string;
    impact: string;
    image: string;
    status: 'Activo' | 'En Planeación' | 'En Evaluación' | 'Temporal';
    monthlyCost: number;
    annualBeneficiaries: number;
}

const programs: Program[] = [
    {
        id: 'justicia-territorial',
        title: 'Programa de Justicia Territorial',
        description: 'Asesoría jurídica integral para la restitución de tierras y derechos territoriales.',
        category: 'Justicia y Derechos',
        duration: 'Permanente',
        beneficiaries: 'Familias desplazadas por conflicto armado',
        impact: 'Recuperación de tierras, seguridad jurídica, restablecimiento de derechos',
        image: '/programas/justicia.jpg',
        status: 'Activo',
        monthlyCost: 15000000,
        annualBeneficiaries: 200
    },
    {
        id: 'salud-mental',
        title: 'Programa de Salud Mental y Resiliencia',
        description: 'Atención psicosocial especializada para víctimas del conflicto armado.',
        category: 'Salud Mental',
        duration: '12 meses por beneficiario',
        beneficiaries: 'Niños, adultos y familias afectadas',
        impact: 'Sanación emocional, herramientas de afrontamiento, reintegración social',
        image: '/Programa_de_Salud_Mental_y_resiliencia.jpeg',
        status: 'Activo',
        monthlyCost: 12000000,
        annualBeneficiaries: 500
    },
    {
        id: 'emprendimiento',
        title: 'Programa de Emprendimiento Solidario',
        description: 'Capacitación y acompañamiento para el desarrollo de emprendimientos sostenibles.',
        category: 'Desarrollo Económico',
        duration: '6 meses de capacitación + 6 meses de seguimiento',
        beneficiaries: 'Jóvenes y adultos en situación de vulnerabilidad',
        impact: 'Generación de ingresos, autonomía económica, empleo digno',
        image: '/programas/emprendimiento.jpg',
        status: 'Activo',
        monthlyCost: 18000000,
        annualBeneficiaries: 150
    },
    {
        id: 'educacion-paz',
        title: 'Programa de Educación para la Paz',
        description: 'Formación en valores, convivencia y construcción de paz en comunidades.',
        category: 'Educación',
        duration: 'Anual',
        beneficiaries: 'Niños, jóvenes y líderes comunitarios',
        impact: 'Cultura de paz, liderazgo juvenil, prevención del conflicto',
        image: '/programas/educacion.jpg',
        status: 'Activo',
        monthlyCost: 8000000,
        annualBeneficiaries: 1000
    },
    {
        id: 'tejido-familiar',
        title: 'Programa de Fortalecimiento del Tejido Familiar',
        description: 'Acompañamiento psicosocial para la reconstrucción de vínculos familiares.',
        category: 'Inclusión Social',
        duration: '9 meses',
        beneficiaries: 'Familias desintegradas por el conflicto',
        impact: 'Unidades familiares fortalecidas, cohesión social, apoyo mutuo',
        image: '/programas/familia.jpg',
        status: 'En Evaluación',
        monthlyCost: 10000000,
        annualBeneficiaries: 300
    },
    {
        id: 'agricultura-sostenible',
        title: 'Programa de Agricultura Sostenible',
        description: 'Implementación de sistemas agrícolas sostenibles para seguridad alimentaria.',
        category: 'Desarrollo Rural',
        duration: '18 meses',
        beneficiaries: 'Comunidades rurales desplazadas',
        impact: 'Soberanía alimentaria, sostenibilidad ambiental, ingresos estables',
        image: '/programas/agricultura.jpg',
        status: 'En Planeación',
        monthlyCost: 20000000,
        annualBeneficiaries: 120
    },
    {
        id: 'mujeres-lideres',
        title: 'Programa de Mujeres Líderes',
        description: 'Formación y empoderamiento de mujeres víctimas del conflicto armado.',
        category: 'Género y Equidad',
        duration: '12 meses',
        beneficiaries: 'Mujeres sobrevivientes de violencia de género',
        impact: 'Liderazgo femenino, autonomía, participación ciudadana',
        image: '/programas/mujeres.jpg',
        status: 'Activo',
        monthlyCost: 9000000,
        annualBeneficiaries: 250
    },
    {
        id: 'juventud-futuro',
        title: 'Programa Juventud con Futuro',
        description: 'Oportunidades educativas y laborales para jóvenes en riesgo.',
        category: 'Juventud',
        duration: '10 meses',
        beneficiaries: 'Jóvenes entre 16-28 años en situación de vulnerabilidad',
        impact: 'Capacitación laboral, inclusión social, prevención de reclutamiento',
        image: '/programas/juventud.jpg',
        status: 'Temporal',
        monthlyCost: 14000000,
        annualBeneficiaries: 400
    }
];

const categoryColors = {
    'Justicia y Derechos': 'bg-[var(--color-primary-green)]',
    'Salud Mental': 'bg-red-500',
    'Desarrollo Económico': 'bg-[var(--color-primary-gold)]',
    'Educación': 'bg-[var(--color-primary-deep)]',
    'Inclusión Social': 'bg-purple-500',
    'Desarrollo Rural': 'bg-emerald-500',
    'Género y Equidad': 'bg-pink-500',
    'Juventud': 'bg-blue-500'
};

const statusColors = {
    'Activo': 'bg-green-500',
    'En Planeación': 'bg-blue-500',
    'En Evaluación': 'bg-yellow-500',
    'Temporal': 'bg-orange-500'
};

export default function ProgramasPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todos');

    const categories = ['Todos', ...Array.from(new Set(programs.map(p => p.category)))];
    const statuses = ['Todos', ...Array.from(new Set(programs.map(p => p.status)))];

    const filteredPrograms = programs.filter(program => {
        const categoryMatch = selectedCategory === 'Todos' || program.category === selectedCategory;
        const statusMatch = selectedStatus === 'Todos' || program.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    const getTotalMonthlyCost = () => {
        return filteredPrograms.reduce((sum, program) => sum + program.monthlyCost, 0);
    };

    const getTotalAnnualBeneficiaries = () => {
        return filteredPrograms.reduce((sum, program) => sum + program.annualBeneficiaries, 0);
    };

    return (
        <main className="min-h-screen bg-[var(--color-secondary-soft-gray)]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[var(--color-primary-green)] via-[var(--color-primary-deep)] to-[var(--color-primary-black)] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Nuestros Programas de Transformación
                            </h1>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Programas integrales diseñados para atender las necesidades específicas
                                de las víctimas del conflicto armado, promoviendo su recuperación,
                                empoderamiento y reintegración social.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        {programs.length}
                                    </div>
                                    <div className="text-sm text-white/80">Programas Activos</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        {getTotalAnnualBeneficiaries().toLocaleString()}
                                    </div>
                                    <div className="text-sm text-white/80">Beneficiarios Anuales</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20 min-h-[85px] flex flex-col justify-center overflow-hidden">
                                    <div className="text-base md:text-lg lg:text-xl font-bold text-[var(--color-primary-gold)] leading-tight whitespace-nowrap overflow-x-auto scrollbar-hide">
                                        {formatCurrency(getTotalMonthlyCost())}
                                    </div>
                                    <div className="text-xs md:text-sm text-white/80 font-medium mt-1">Costo Mensual Total</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)] text-center">
                                        8 Programas
                                    </div>
                                    <div className="text-sm text-white/80 text-center">Áreas Estratégicas</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold mb-4">Enfoque Integral</h3>
                                <p className="text-white/80 mb-4">
                                    Cada programa aborda una dimensión fundamental del proceso de paz
                                </p>
                                <div className="space-y-2 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Enfoque victimocéntrico</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Metodologías validadas</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Seguimiento continuo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Resultados medibles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {statuses.map((status) => (
                                <Button
                                    key={status}
                                    variant={selectedStatus === status ? 'primary' : 'ghost'}
                                    size="sm"
                                    className={selectedStatus === status ? '' : 'border border-gray-200'}
                                    onClick={() => setSelectedStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-20 bg-[var(--color-secondary-soft-gray)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.map((program) => (
                            <Card key={program.id} className="hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-48 rounded-t-xl overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = '/LogoCorvicac3D.png';
                                            e.currentTarget.className = 'w-full h-full object-cover bg-gradient-to-br from-[var(--color-primary-green)] to-[var(--color-primary-deep)]';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`${categoryColors[program.category as keyof typeof categoryColors]} text-white`}>
                                            {program.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[program.status as keyof typeof statusColors]}`}>
                                            {program.status}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-[var(--color-primary-deep)] text-xl">
                                        {program.title}
                                    </CardTitle>
                                    <CardDescription className="text-[var(--color-primary-black)]/80">
                                        {program.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Duración</div>
                                            <div className="font-bold text-[var(--color-primary-green)]">
                                                {program.duration}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Costo Mensual</div>
                                            <div className="font-bold text-[var(--color-primary-green)]">
                                                {formatCurrency(program.monthlyCost)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-3">
                                        <div className="text-[var(--color-primary-brown)]/70 mb-2">Población Objetivo</div>
                                        <div className="text-[var(--color-primary-black)]/80 text-sm">
                                            {program.beneficiaries}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-3">
                                        <div className="text-[var(--color-primary-brown)]/70 mb-2">Impacto Esperado</div>
                                        <div className="text-[var(--color-primary-black)]/80 text-sm">
                                            {program.impact}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Beneficiarios Anuales</div>
                                            <div className="font-bold text-[var(--color-primary-deep)]">
                                                {program.annualBeneficiaries.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Costo por Beneficiario</div>
                                            <div className="font-bold text-[var(--color-primary-deep)]">
                                                {formatCurrency(Math.round(program.monthlyCost / program.annualBeneficiaries))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-deep)] text-white"
                                            href="/apoyar"
                                        >
                                            Apoyar
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-2">
                                Sin Programas Disponibles
                            </h3>
                            <p className="text-[var(--color-primary-brown)]/80">
                                No hay programas que coincidan con los filtros seleccionados.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Program Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Áreas Estratégicas de Intervención
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80">
                            Nuestros programas están organizados en áreas clave para una transformación integral
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Justicia y Derechos',
                                description: 'Recuperación de derechos, asesoría jurídica y restitución de tierras',
                                programs: 1,
                                icon: '⚖️',
                                color: 'bg-[var(--color-primary-green)]'
                            },
                            {
                                title: 'Salud Mental',
                                description: 'Sanación emocional, apoyo psicosocial y resiliencia',
                                programs: 1,
                                icon: '🧠',
                                color: 'bg-red-500'
                            },
                            {
                                title: 'Desarrollo Económico',
                                description: 'Emprendimiento, generación de ingresos y autonomía',
                                programs: 1,
                                icon: '💼',
                                color: 'bg-[var(--color-primary-gold)]'
                            },
                            {
                                title: 'Educación',
                                description: 'Formación para la paz, valores y convivencia',
                                programs: 1,
                                icon: '🎓',
                                color: 'bg-[var(--color-primary-deep)]'
                            },
                            {
                                title: 'Inclusión Social',
                                description: 'Fortalecimiento familiar y comunitario',
                                programs: 1,
                                icon: '🤝',
                                color: 'bg-purple-500'
                            },
                            {
                                title: 'Desarrollo Rural',
                                description: 'Agricultura sostenible y seguridad alimentaria',
                                programs: 1,
                                icon: '🌾',
                                color: 'bg-emerald-500'
                            },
                            {
                                title: 'Género y Equidad',
                                description: 'Empoderamiento femenino y equidad de género',
                                programs: 1,
                                icon: '👩‍💼',
                                color: 'bg-pink-500'
                            },
                            {
                                title: 'Juventud',
                                description: 'Oportunidades para jóvenes y prevención',
                                programs: 1,
                                icon: '👥',
                                color: 'bg-blue-500'
                            }
                        ].map((category, i) => (
                            <Card key={i} className="text-center hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-8 space-y-4">
                                    <div className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-bold text-[var(--color-primary-deep)] text-lg">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-primary-brown)]/70 leading-relaxed">
                                        {category.description}
                                    </p>
                                    <div className="text-xs text-[var(--color-primary-green)] font-semibold">
                                        {category.programs} Programa{category.programs > 1 ? 's' : ''}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Statistics */}
            <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                            Impacto de Nuestros Programas
                        </h2>
                        <p className="text-xl text-white/90">
                            Resultados tangibles del acompañamiento integral a las víctimas del conflicto
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            {
                                label: 'Personas Atendidas',
                                value: '2,500+',
                                icon: '👥',
                                description: 'Anualmente en todos nuestros programas'
                            },
                            {
                                label: 'Familias Fortalecidas',
                                value: '800+',
                                icon: '🏠',
                                description: 'Con acompañamiento psicosocial integral'
                            },
                            {
                                label: 'Emprendimientos Exitosos',
                                value: '150+',
                                icon: '💼',
                                description: 'Con seguimiento durante 2 años'
                            },
                            {
                                label: 'Comunidades Impactadas',
                                value: '45+',
                                icon: '🤝',
                                description: 'En zonas de alta vulnerabilidad'
                            }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                <div className="text-white/80 text-sm font-semibold mb-2">{stat.label}</div>
                                <div className="text-white/70 text-xs">{stat.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-6">
                        ¿Cómo Puede Apoyar Nuestros Programas?
                    </h2>
                    <p className="text-lg text-[var(--color-primary-brown)]/80 mb-8 leading-relaxed">
                        Cada programa necesita de su solidaridad para seguir transformando vidas.
                        Elija el programa que más le inspire y conviértase en agente de cambio.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant="primary"
                            size="lg"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20programas%20de%20CORVICAC"
                            aria-label="Contacto Personalizado por WhatsApp"
                            className="bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-deep)]"
                        >
                            📞 Contacto Personalizado
                        </Button>
                        <Button
                            variant="outline"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20apoyar%20un%20programa%20de%20CORVICAC"
                            aria-label="Contactar por WhatsApp"
                            className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                            💬 Contactar por WhatsApp
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20proponer%20un%20nuevo%20programa%20para%20CORVICAC"
                            aria-label="Proponer Programa por WhatsApp"
                        >
                            💡 Proponer Programa
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                        >
                            📋 Descargar Catálogo
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}