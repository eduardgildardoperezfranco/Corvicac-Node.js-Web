'use client';

import React, { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface AccessibilitySettings {
    fontSize: 'small' | 'medium' | 'large';
    contrast: 'normal' | 'high' | 'dark';
    readingMode: boolean;
    animations: boolean;
}

export default function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [settings, setSettings] = useState<AccessibilitySettings>({
        fontSize: 'medium',
        contrast: 'normal',
        readingMode: false,
        animations: true
    });

    useEffect(() => {
        // Load saved settings
        const savedSettings = localStorage.getItem('corvicac-accessibility-settings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            applySettings(parsed);
        }
    }, []);

    const applySettings = (newSettings: AccessibilitySettings) => {
        // Apply font size
        document.documentElement.style.setProperty('--font-size-scale',
            newSettings.fontSize === 'small' ? '0.9' :
                newSettings.fontSize === 'medium' ? '1' : '1.2'
        );

        // Apply contrast
        if (newSettings.contrast === 'high') {
            document.documentElement.style.filter = 'contrast(1.5) brightness(1.1)';
        } else if (newSettings.contrast === 'dark') {
            document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
        } else {
            document.documentElement.style.filter = 'none';
        }

        // Apply animations
        if (!newSettings.animations) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }

        // Apply reading mode
        if (newSettings.readingMode) {
            document.body.style.lineHeight = '1.8';
            document.body.style.maxWidth = '800px';
            document.body.style.margin = '0 auto';
            document.body.style.padding = '20px';
        } else {
            document.body.style.lineHeight = '1.6';
            document.body.style.maxWidth = 'none';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
        }
    };

    const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('corvicac-accessibility-settings', JSON.stringify(newSettings));
        applySettings(newSettings);

        // Track accessibility preference change
        analytics.trackEvent('accessibility_preference', {
            setting: key,
            value: value,
            timestamp: new Date().toISOString()
        });
    };

    const resetSettings = () => {
        const defaultSettings: AccessibilitySettings = {
            fontSize: 'medium',
            contrast: 'normal',
            readingMode: false,
            animations: true
        };
        setSettings(defaultSettings);
        localStorage.setItem('corvicac-accessibility-settings', JSON.stringify(defaultSettings));
        applySettings(defaultSettings);

        analytics.trackEvent('accessibility_preference', {
            setting: 'reset',
            value: 'default',
            timestamp: new Date().toISOString()
        });
    };

    const getContrastClass = (contrast: string) => {
        switch (contrast) {
            case 'normal': return 'border-gray-300 bg-white';
            case 'high': return 'border-yellow-400 bg-yellow-50';
            case 'dark': return 'border-gray-600 bg-gray-800 text-white';
            default: return 'border-gray-300 bg-white';
        }
    };

    return (
        <>
            {/* Unified Accessibility Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed bottom-6 right-6 group relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#FFFF00] to-[#FFD700] text-[#1C1C1C] shadow-xl transition-all duration-300 z-50 animate-pulse ${
                    isHovered
                        ? 'scale-110 shadow-2xl ring-4 ring-[#1C1C1C] ring-opacity-50 animate-none -translate-y-5'
                        : 'hover:shadow-2xl hover:ring-4 hover:ring-[#1C1C1C] hover:ring-opacity-50'
                }`}
                aria-label="Herramientas de Accesibilidad"
                title="Herramientas de Accesibilidad"
                style={{
                    animation: 'float 3s ease-in-out infinite',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 0, 0.3)'
                }}
            >
                <span className="text-2xl font-bold">♿</span>

                {/* Tooltip animado */}
                <div className={`absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1C1C] text-[#FFFF00] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none ${
                    isHovered ? 'scale-100' : 'scale-95'
                }`}>
                    Herramientas de Accesibilidad
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1C] rotate-45"></div>
                </div>
                
                {/* Pulsating ring effect */}
                <span className="absolute inset-0 rounded-full bg-[#FFFF00] opacity-30 animate-ping"></span>
            </button>
            
            {/* CSS for floating animation */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>

            {/* Accessibility Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 z-50 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Accesibilidad</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Cerrar panel de accesibilidad"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Font Size */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño de Fuente</label>
                        <div className="flex gap-2">
                            {[
                                { key: 'small', label: 'A', title: 'Pequeño' },
                                { key: 'medium', label: 'A', title: 'Mediano' },
                                { key: 'large', label: 'A', title: 'Grande' }
                            ].map((size, index) => (
                                <button
                                    key={size.key}
                                    onClick={() => updateSetting('fontSize', size.key)}
                                    className={`flex-1 py-2 px-3 rounded border-2 ${settings.fontSize === size.key
                                            ? 'border-[var(--color-primary-green)] bg-green-50 text-green-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    title={size.title}
                                    style={{ fontSize: index === 0 ? '12px' : index === 1 ? '16px' : '20px' }}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contrast */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraste</label>
                        <div className="space-y-2">
                            {[
                                { key: 'normal', label: 'Normal', desc: 'Contraste estándar' },
                                { key: 'high', label: 'Alto', desc: 'Mayor contraste para mejor visibilidad' },
                                { key: 'dark', label: 'Oscuro', desc: 'Modo nocturno con inversión de colores' }
                            ].map((contrast) => (
                                <button
                                    key={contrast.key}
                                    onClick={() => updateSetting('contrast', contrast.key)}
                                    className={`w-full text-left p-3 rounded border-2 transition-all ${settings.contrast === contrast.key
                                            ? 'border-[var(--color-primary-green)] bg-green-50'
                                            : getContrastClass(contrast.key)
                                        }`}
                                >
                                    <div className="font-medium">{contrast.label}</div>
                                    <div className="text-xs opacity-75">{contrast.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reading Mode */}
                    <div className="mb-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.readingMode}
                                onChange={(e) => updateSetting('readingMode', e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[var(--color-primary-green)] border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Modo de Lectura</span>
                            <span className="text-xs text-gray-500 ml-auto">Mejora la legibilidad</span>
                        </label>
                    </div>

                    {/* Animations */}
                    <div className="mb-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.animations}
                                onChange={(e) => updateSetting('animations', e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[var(--color-primary-green)] border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Animaciones</span>
                            <span className="text-xs text-gray-500 ml-auto">Reduce movimientos</span>
                        </label>
                    </div>



                    {/* Quick Actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={resetSettings}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors text-sm"
                        >
                            Restablecer
                        </button>
                        <button
                            onClick={() => {
                                analytics.trackEvent('accessibility_help', { action: 'open_guide' });
                                window.open('/accessibility-guide', '_blank');
                            }}
                            className="flex-1 bg-[var(--color-primary-green)] text-white py-2 px-3 rounded hover:bg-[var(--color-primary-deep)] transition-colors text-sm"
                        >
                            Guía
                        </button>
                    </div>

                    {/* Accessibility Info */}
                    <div className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-green-500">✓</span>
                            <span>Compatible con lector de pantalla</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-500">✓</span>
                            <span>Navegación por teclado</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-purple-500">✓</span>
                            <span>Contraste WCAG AA</span>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}
