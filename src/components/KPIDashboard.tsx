'use client';

import React, { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface KPI {
    id: string;
    title: string;
    value: number;
    target: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    color: string;
    description: string;
}

interface UserStats {
    totalPoints: number;
    level: string;
    badges: string[];
    lastActivity: Date;
    engagementScore: number;
}

export default function KPIDashboard() {
    const [kpis, setKpis] = useState<KPI[]>([]);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [timeRange, setTimeRange] = useState('week');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Initialize KPIs with mock data
        const initialKPIs: KPI[] = [
            {
                id: 'beneficiaries',
                title: 'Personas Impactadas',
                value: 8247,
                target: 10000,
                unit: 'personas',
                trend: 'up',
                color: 'green',
                description: 'Personas que han recibido apoyo directo de nuestros programas'
            },
            {
                id: 'donations',
                title: 'Donaciones Recaudadas',
                value: 185000000,
                target: 250000000,
                unit: 'COP',
                trend: 'up',
                color: 'blue',
                description: 'Total recaudado en el período seleccionado'
            },
            {
                id: 'projects',
                title: 'Proyectos Activos',
                value: 163,
                target: 200,
                unit: 'proyectos',
                trend: 'stable',
                color: 'purple',
                description: 'Proyectos en ejecución en todo el país'
            },
            {
                id: 'volunteers',
                title: 'Voluntarios Activos',
                value: 1248,
                target: 1500,
                unit: 'personas',
                trend: 'up',
                color: 'orange',
                description: 'Personas comprometidas con nuestra causa'
            },
            {
                id: 'engagement',
                title: 'Tasa de Engagement',
                value: 78,
                target: 85,
                unit: '%',
                trend: 'up',
                color: 'teal',
                description: 'Porcentaje de usuarios que interactúan con nuestro contenido'
            },
            {
                id: 'social',
                title: 'Alcance Social',
                value: 245000,
                target: 500000,
                unit: 'personas',
                trend: 'up',
                color: 'pink',
                description: 'Personas alcanzadas a través de redes sociales'
            }
        ];

        setKpis(initialKPIs);

        // Load user stats
        const savedUserStats = localStorage.getItem('corvicac-user-stats');
        if (savedUserStats) {
            setUserStats(JSON.parse(savedUserStats));
        } else {
            const newUserStats: UserStats = {
                totalPoints: 0,
                level: 'Descubridor',
                badges: [],
                lastActivity: new Date(),
                engagementScore: 0
            };
            setUserStats(newUserStats);
            localStorage.setItem('corvicac-user-stats', JSON.stringify(newUserStats));
        }

        setIsLoading(false);

        // Track dashboard view
        analytics.trackEvent('dashboard_view', {
            time_range: timeRange,
            user_level: userStats?.level || 'anonymous'
        });

        // Simulate real-time updates
        const interval = setInterval(() => {
            setKpis(prev => prev.map(kpi => ({
                ...kpi,
                value: kpi.value + Math.floor(Math.random() * 10)
            })));
        }, 5000);

        return () => clearInterval(interval);
    }, [timeRange]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const getProgressColor = (value: number, target: number): string => {
        const percentage = (value / target) * 100;
        if (percentage >= 100) return 'bg-green-500';
        if (percentage >= 75) return 'bg-blue-500';
        if (percentage >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            case 'stable': return '➡️';
        }
    };

    const getLevelProgress = (level: string): number => {
        switch (level) {
            case 'Descubridor': return 25;
            case 'Comprometido': return 50;
            case 'Promotor': return 75;
            case 'Transformador': return 100;
            default: return 0;
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-gray-100 rounded-lg p-4 h-32"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-primary-black)]">Dashboard de Impacto</h2>
                    <p className="text-gray-600">Métricas en tiempo real de nuestra transformación social</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {['week', 'month', 'year'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${timeRange === range
                                    ? 'bg-[var(--color-primary-green)] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {range === 'week' ? 'Semana' : range === 'month' ? 'Mes' : 'Año'}
                        </button>
                    ))}
                </div>
            </div>

            {/* User Progress Section */}
            {userStats && (
                <div className="bg-gradient-to-r from-[var(--color-primary-green)] to-[var(--color-primary-deep)] rounded-xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">Tu Impacto Personal</h3>
                            <p className="text-white/80">Nivel: {userStats.level}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{userStats.totalPoints} puntos</div>
                            <div className="text-sm text-white/70">Puntuación de engagement: {userStats.engagementScore}%</div>
                        </div>
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                        <div
                            className="bg-white h-3 rounded-full transition-all duration-500"
                            style={{ width: `${getLevelProgress(userStats.level)}%` }}
                        ></div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {userStats.badges.map((badge, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis.map((kpi) => (
                    <div key={kpi.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full bg-${kpi.color}-500`}></div>
                                <h3 className="font-semibold text-gray-900">{kpi.title}</h3>
                            </div>
                            <span className="text-2xl">{getTrendIcon(kpi.trend)}</span>
                        </div>

                        <div className="flex items-end justify-between mb-2">
                            <div>
                                <div className="text-3xl font-bold text-[var(--color-primary-black)]">
                                    {kpi.unit === 'COP' ? `$${formatNumber(kpi.value)}` : formatNumber(kpi.value)}
                                </div>
                                <div className="text-sm text-gray-600">de {kpi.unit === 'COP' ? `$${formatNumber(kpi.target)}` : formatNumber(kpi.target)} objetivo</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-600">
                                    {Math.round((kpi.value / kpi.target) * 100)}%
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(kpi.value, kpi.target)}`}
                                style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                            ></div>
                        </div>

                        <p className="text-sm text-gray-600">{kpi.description}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                    onClick={() => analytics.trackEvent('dashboard_action', { action: 'view_reports' })}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                >
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium text-gray-900">Ver Reportes</div>
                    <div className="text-sm text-gray-600">Detalles completos</div>
                </button>

                <button
                    onClick={() => analytics.trackEvent('dashboard_action', { action: 'share_impact' })}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                >
                    <div className="text-2xl mb-2">📤</div>
                    <div className="font-medium text-gray-900">Compartir Impacto</div>
                    <div className="text-sm text-gray-600">En redes sociales</div>
                </button>

                <button
                    onClick={() => analytics.trackEvent('dashboard_action', { action: 'download_data' })}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                >
                    <div className="text-2xl mb-2">📥</div>
                    <div className="font-medium text-gray-900">Descargar Datos</div>
                    <div className="text-sm text-gray-600">Formato CSV/Excel</div>
                </button>

                <button
                    onClick={() => analytics.trackEvent('dashboard_action', { action: 'set_goals' })}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                >
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-medium text-gray-900">Fijar Metas</div>
                    <div className="text-sm text-gray-600">Objetivos futuros</div>
                </button>
            </div>

            {/* Last Updated */}
            <div className="mt-6 text-xs text-gray-500 text-center">
                Actualizado en tiempo real • Última actualización: {new Date().toLocaleTimeString('es-CO')}
            </div>
        </div>
    );
}