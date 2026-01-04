'use client';

import React, { useState } from 'react';
import { hateSpeechPrevention, CommunicationContext } from '@/lib/hateSpeechPrevention';
import { analytics } from '@/lib/analytics';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'tel';
    required: boolean;
    placeholder?: string;
    options?: string[];
}

interface ProtectedFormProps {
    title: string;
    description?: string;
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => Promise<void> | void;
    submitText?: string;
    formType?: 'contact' | 'donation' | 'volunteer' | 'complaint' | 'suggestion';
    className?: string;
}

export default function ProtectedForm({
    title,
    description,
    fields,
    onSubmit,
    submitText = 'Enviar',
    formType = 'contact',
    className = ''
}: ProtectedFormProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const validateField = (name: string, value: string): string | null => {
        const field = fields.find(f => f.name === name);
        if (!field) return null;

        // Required field validation
        if (field.required && (!value || value.trim() === '')) {
            return `${field.label} es requerido`;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Por favor ingresa un correo electrónico válido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(value)) {
                return 'Por favor ingresa un número de teléfono válido';
            }
        }

        return null;
    };

    const checkHateSpeech = (content: string, fieldName: string): boolean => {
        if (!content || content.trim().length < 5) return true;

        const context: CommunicationContext = {
            source: 'form',
            userRole: 'visitor',
            content,
            timestamp: new Date(),
            ipAddress: '', // Would be populated server-side
            userAgent: navigator.userAgent,
            reason: `Form field: ${fieldName}`
        };

        const result = hateSpeechPrevention.processCommunication(context);

        if (!result.allowed) {
            setWarningMessage(result.reason || 'Contenido no apropiado detectado');
            setSuggestions(result.suggestions || []);
            setShowWarning(true);

            // Track hate speech attempt
            analytics.trackEvent('hate_speech_prevention', {
                form_type: formType,
                field_name: fieldName,
                severity: result.action,
                blocked_content: content.substring(0, 100)
            });

            return false;
        }

        if (result.action === 'warn') {
            setWarningMessage('Advertencia: Revisa el contenido de tu mensaje');
            setSuggestions(result.suggestions || []);
            setShowWarning(true);
        }

        return true;
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Real-time hate speech check for text areas and long text fields
        if (value.length > 10) {
            checkHateSpeech(value, name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors: Record<string, string> = {};
        let hasErrors = false;

        for (const field of fields) {
            const value = formData[field.name] || '';
            const error = validateField(field.name, value);
            if (error) {
                newErrors[field.name] = error;
                hasErrors = true;
            }

            // Final hate speech check
            if (value && !checkHateSpeech(value, field.name)) {
                hasErrors = true;
            }
        }

        setErrors(newErrors);

        if (hasErrors) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Track successful form submission
            analytics.trackEvent('form_submission', {
                form_type: formType,
                fields_count: fields.length,
                submission_time: new Date().toISOString()
            });

            await onSubmit(formData);
            setShowSuccess(true);
            setFormData({});
            setShowWarning(false);

            // Reset form after success
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            setErrors(prev => ({ ...prev, submit: 'Error al enviar el formulario. Por favor intenta de nuevo.' }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 ${className}`}>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-[var(--color-primary-black)] mb-2">{title}</h3>
                {description && (
                    <p className="text-gray-600 text-sm">{description}</p>
                )}
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-800 font-medium">¡Formulario enviado exitosamente!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                        Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
                    </p>
                </div>
            )}

            {/* Warning Message */}
            {showWarning && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-800 font-medium">Advertencia de Contenido</span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-1 mb-3">{warningMessage}</p>
                    {suggestions.length > 0 && (
                        <div className="bg-yellow-100 rounded-lg p-3">
                            <p className="text-yellow-800 text-sm font-medium mb-2">Sugerencias para mejorar tu mensaje:</p>
                            <ul className="text-yellow-700 text-sm space-y-1">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-yellow-600">•</span>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        onClick={() => setShowWarning(false)}
                        className="mt-3 text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                    >
                        Entendido, continuar
                    </button>
                </div>
            )}

            {/* Error Message */}
            {errors.submit && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{errors.submit}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === 'textarea' ? (
                            <textarea
                                id={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent ${errors[field.name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                rows={4}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                id={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent ${errors[field.name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Selecciona una opción</option>
                                {field.options?.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent ${errors[field.name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                        )}

                        {errors[field.name] && (
                            <p className="text-red-500 text-sm">{errors[field.name]}</p>
                        )}
                    </div>
                ))}

                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <input type="checkbox" id="terms" required className="rounded" />
                    <label htmlFor="terms">
                        Acepto que mi información será procesada de acuerdo con la
                        <a href="/terminos-y-condiciones" className="text-[var(--color-primary-green)] hover:underline"> política de privacidad</a>
                    </label>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[var(--color-primary-green)] text-white py-3 px-6 rounded-lg hover:bg-[var(--color-primary-deep)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {isSubmitting ? 'Enviando...' : submitText}
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({})}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Limpiar
                    </button>
                </div>

                {/* Form Protection Notice */}
                <div className="text-xs text-gray-400 text-center border-t border-gray-100 pt-4">
                    🔒 Este formulario está protegido contra contenido ofensivo, difamación y acoso.
                    Tu mensaje será revisado para garantizar un entorno seguro y respetuoso.
                </div>
            </form>
        </div>
    );
}