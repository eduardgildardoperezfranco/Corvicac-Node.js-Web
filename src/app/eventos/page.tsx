'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'En Ejecución' | 'Planeado' | 'Finalizado' | 'En Riesgo';
    budget: number;
    progress: number;
    beneficiaries: number;
    startDate: string;
    endDate: string;
    image: string;
    impact: string;
}

const projects: Project[] = [
    {
        id: 'tierras-libres',
        title: 'Restitución de Tierras Libres',
        description: 'Proyecto integral para la restitución de tierras a familias desplazadas por el conflicto armado.',
        category: 'Justicia y Derechos',
        status: 'En Ejecución',
        budget: 150000000,
        progress: 65,
        beneficiaries: 150,
        startDate: '2024-01-15',
        endDate: '2025-12-31',
        image: '/proyectos/tierras.jpg',
        impact: 'Recuperación de 500 hectáreas y reubicación digna de 150 familias'
    },
    {
        id: 'escuelas-de-paz',
        title: 'Escuelas de Paz y Convivencia',
        description: 'Construcción y dotación de espacios educativos en zonas afectadas por el conflicto.',
        category: 'Educación',
        status: 'Planeado',
        budget: 85000000,
        progress: 15,
        beneficiaries: 500,
        startDate: '2024-03-01',
        endDate: '2025-06-30',
        image: '/proyectos/escuelas.jpg',
        impact: '3 escuelas construidas, 500 niños con acceso a educación segura'
    },
    {
        id: 'tejido-productivo',
        title: 'Tejido Productivo Comunitario',
        description: 'Programa de capacitación y dotación para emprendimientos sostenibles.',
        category: 'Desarrollo Económico',
        status: 'En Ejecución',
        budget: 120000000,
        progress: 45,
        beneficiaries: 300,
        startDate: '2024-02-01',
        endDate: '2025-12-31',
        image: '/proyectos/emprendimientos.jpg',
        impact: '40 emprendimientos exitosos, generación de empleo sostenible'
    },
    {
        id: 'salud-mental',
        title: 'Salud Mental y Resiliencia',
        description: 'Atención psicosocial especializada para víctimas del conflicto armado.',
        category: 'Salud',
        status: 'Finalizado',
        budget: 75000000,
        progress: 100,
        beneficiaries: 800,
        startDate: '2023-01-01',
        endDate: '2024-06-30',
        image: '/Salud_Mental_y_Resiliencia.jpeg',
        impact: '800 personas atendidas, 50 profesionales capacitados'
    },
    {
        id: 'vivienda-digna',
        title: 'Vivienda Digna para Todos',
        description: 'Construcción de viviendas seguras y sostenibles para familias en situación de vulnerabilidad.',
        category: 'Vivienda',
        status: 'En Riesgo',
        budget: 200000000,
        progress: 30,
        beneficiaries: 80,
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        image: '/proyectos/vivienda.jpg',
        impact: '80 viviendas construidas con materiales sostenibles y acceso a servicios básicos'
    },
    {
        id: 'agricultura-sostenible',
        title: 'Agricultura Sostenible Familiar',
        description: 'Implementación de sistemas agrícolas sostenibles para seguridad alimentaria.',
        category: 'Agricultura',
        status: 'En Ejecución',
        budget: 95000000,
        progress: 55,
        beneficiaries: 200,
        startDate: '2024-02-15',
        endDate: '2025-12-31',
        image: '/proyectos/agricultura.jpg',
        impact: '200 familias con huertas productivas, independencia alimentaria asegurada'
    }
];

const statusColors = {
    'En Ejecución': 'bg-green-500',
    'Planeado': 'bg-blue-500',
    'Finalizado': 'bg-gray-500',
    'En Riesgo': 'bg-red-500'
};

const categoryColors = {
    'Justicia y Derechos': 'bg-[var(--color-primary-green)]',
    'Educación': 'bg-[var(--color-primary-deep)]',
    'Desarrollo Económico': 'bg-[var(--color-primary-gold)]',
    'Salud': 'bg-red-500',
    'Vivienda': 'bg-purple-500',
    'Agricultura': 'bg-emerald-500'
};

export default function EventosPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todos');

    const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];
    const statuses = ['Todos', ...Array.from(new Set(projects.map(p => p.status)))];

    const filteredProjects = projects.filter(project => {
        const categoryMatch = selectedCategory === 'Todos' || project.category === selectedCategory;
        const statusMatch = selectedStatus === 'Todos' || project.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    const getProgressColor = (progress: number) => {
        if (progress >= 75) return 'bg-green-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getTotalBudget = () => {
        return filteredProjects.reduce((sum, project) => sum + project.budget, 0);
    };

    const getTotalBeneficiaries = () => {
        return filteredProjects.reduce((sum, project) => sum + project.beneficiaries, 0);
    };

    return (
        <main className="min-h-screen bg-[var(--color-secondary-soft-gray)]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[var(--color-primary-green)] via-[var(--color-primary-deep)] to-[var(--color-primary-black)] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Nuestros Eventos Transformadores
                            </h1>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Cada proyecto es una semilla de esperanza plantada en tierra fértil.
                                Aquí encontrará el detalle de nuestras iniciativas que están
                                cambiando vidas y reconstruyendo el tejido social de Colombia.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        {projects.length}
                                    </div>
                                    <div className="text-sm text-white/80">Eventos Activos</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        {getTotalBeneficiaries().toLocaleString()}
                                    </div>
                                    <div className="text-sm text-white/80">Beneficiarios Directos</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        {formatCurrency(getTotalBudget())}
                                    </div>
                                    <div className="text-sm text-white/80">Inversión Total</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-[var(--color-primary-gold)]">
                                        85%
                                    </div>
                                    <div className="text-sm text-white/80">Efectividad</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="text-6xl mb-4">🏗️</div>
                                <h3 className="text-2xl font-bold mb-4">Transparencia Total</h3>
                                <p className="text-white/80 mb-4">
                                    Seguimiento en tiempo real de cada iniciativa
                                </p>
                                <div className="space-y-2 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Reportes mensuales detallados</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Fotografías y testimonios reales</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Indicadores de impacto medibles</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-400">✓</span>
                                        <span>Auditorías independientes</span>
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

            {/* Projects Grid */}
            <section className="py-20 bg-[var(--color-secondary-soft-gray)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Card key={project.id} className="hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-48 rounded-t-xl overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = '/LogoCorvicac3D.png';
                                            e.currentTarget.className = 'w-full h-full object-cover bg-gradient-to-br from-[var(--color-primary-green)] to-[var(--color-primary-deep)]';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute top-4 left-4">
                                        <Badge className={`${categoryColors[project.category as keyof typeof categoryColors]} text-white`}>
                                            {project.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[project.status as keyof typeof statusColors]}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-[var(--color-primary-deep)] text-xl">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="text-[var(--color-primary-black)]/80">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Presupuesto</div>
                                            <div className="font-bold text-[var(--color-primary-green)]">
                                                {formatCurrency(project.budget)}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Beneficiarios</div>
                                            <div className="font-bold text-[var(--color-primary-green)]">
                                                {project.beneficiaries.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Inicio</div>
                                            <div className="font-bold text-[var(--color-primary-deep)]">
                                                {formatDate(project.startDate)}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3">
                                            <div className="text-[var(--color-primary-brown)]/70">Finalización</div>
                                            <div className="font-bold text-[var(--color-primary-deep)]">
                                                {formatDate(project.endDate)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-3">
                                        <div className="text-[var(--color-primary-brown)]/70 mb-2">Impacto Esperado</div>
                                        <div className="text-[var(--color-primary-black)]/80 text-sm">
                                            {project.impact}
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

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏗️</div>
                            <h3 className="text-2xl font-bold text-[var(--color-primary-deep)] mb-2">
                                Sin Eventos Disponibles
                            </h3>
                            <p className="text-[var(--color-primary-brown)]/80">
                                No hay eventos que coincidan con los filtros seleccionados.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Impact Statistics */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary-black)] mb-4">
                            Nuestro Impacto en Cifras
                        </h2>
                        <p className="text-lg text-[var(--color-primary-brown)]/80">
                            Resultados tangibles de nuestro compromiso con las víctimas del conflicto armado
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                label: 'Eventos Activos',
                                value: projects.filter(p => p.status !== 'Finalizado').length,
                                icon: '🏗️',
                                color: 'bg-[var(--color-primary-green)]'
                            },
                            {
                                label: 'Personas Impactadas',
                                value: getTotalBeneficiaries().toLocaleString(),
                                icon: '👥',
                                color: 'bg-[var(--color-primary-deep)]'
                            },
                            {
                                label: 'Inversión Total',
                                value: formatCurrency(getTotalBudget()),
                                icon: '💰',
                                color: 'bg-[var(--color-primary-gold)]'
                            },
                            {
                                label: 'Tasa de Éxito',
                                value: '85%',
                                icon: '📈',
                                color: 'bg-green-500'
                            }
                        ].map((stat, i) => (
                            <Card key={i} className="text-center hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-8">
                                    <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-[var(--color-primary-deep)] mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-[var(--color-primary-brown)]/70">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                        ¿Quiere Ser Parte de Estos Eventos?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        Cada proyecto necesita de su apoyo para seguir transformando vidas.
                        Elija el proyecto que más le inspire y conviértase en agente de cambio.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant="ghost"
                            size="lg"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20eventos%20de%20CORVICAC"
                            aria-label="Contacto Personalizado por WhatsApp"
                            className="bg-white text-[var(--color-primary-green)] hover:bg-gray-100"
                        >
                            📞 Contacto Personalizado
                        </Button>
                        <Button
                            variant="outline"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20apoyar%20un%20evento%20de%20CORVICAC"
                            aria-label="Contactar por WhatsApp"
                            className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                            💬 Contactar por WhatsApp
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            href="https://wa.me/573209610147?text=Hola,%20me%20gustar%C3%ADa%20proponer%20un%20nuevo%20evento%20para%20CORVICAC"
                            aria-label="Proponer Proyecto por WhatsApp"
                            className="border-white text-white hover:bg-white hover:text-[var(--color-primary-green)]"
                        >
                            💡 Proponer Evento
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}