'use client';

import React, { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    likes: number;
    isVerified: boolean;
    flagged: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    verified: boolean;
    points: number;
    level: string;
}

export default function CommunityEngagement() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [moderationQueue, setModerationQueue] = useState<Comment[]>([]);

    useEffect(() => {
        // Initialize user from localStorage
        const userData = localStorage.getItem('corvicac-user-data');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Create anonymous user
            const anonymousUser: User = {
                id: 'anon_' + Math.random().toString(36).substr(2, 9),
                name: 'Visitante',
                email: '',
                verified: false,
                points: 0,
                level: 'Descubridor'
            };
            setUser(anonymousUser);
        }

        // Load existing comments
        const savedComments = localStorage.getItem('corvicac-comments');
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        }
    }, []);

    const detectHateSpeech = (text: string): boolean => {
        // Simple hate speech detection - in production, use Perspective API or similar
        const hateWords = [
            'odio', 'violencia', 'discriminación', 'racismo', 'xenofobia',
            'hate', 'violence', 'discrimination', 'racism', 'xenophobia',
            'muerte', 'asesinato', 'terrorismo', 'guerra', 'conflicto'
        ];

        const lowerText = text.toLowerCase();
        return hateWords.some(word => lowerText.includes(word));
    };

    const validateContent = (text: string): { isValid: boolean; reason?: string } => {
        // Check for hate speech
        if (detectHateSpeech(text)) {
            return { isValid: false, reason: 'El contenido contiene lenguaje que puede ser ofensivo o discriminatorio' };
        }

        // Check length
        if (text.trim().length < 10) {
            return { isValid: false, reason: 'El comentario debe tener al menos 10 caracteres' };
        }

        // Check for excessive caps
        const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
        if (capsRatio > 0.5) {
            return { isValid: false, reason: 'Evita usar mayúsculas excesivas' };
        }

        // Check for spam patterns
        if ((text.match(/http/g) || []).length > 2) {
            return { isValid: false, reason: 'No se permiten múltiples enlaces en un solo comentario' };
        }

        return { isValid: true };
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;
        if (!newComment.trim()) return;

        const validation = validateContent(newComment);
        if (!validation.isValid) {
            alert(`No se puede publicar tu comentario: ${validation.reason}`);
            analytics.trackEvent('content_moderation', {
                action: 'blocked',
                reason: validation.reason,
                user_id: user.id
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate moderation delay
        const newCommentObj: Comment = {
            id: Date.now().toString(),
            author: user.name,
            content: newComment,
            timestamp: new Date(),
            likes: 0,
            isVerified: user.verified,
            flagged: false
        };

        try {
            // In production, this would go to a moderation queue
            if (Math.random() > 0.8) { // 20% chance of manual moderation
                setModerationQueue(prev => [...prev, newCommentObj]);
                alert('Tu comentario está en revisión por nuestro equipo de moderación. Gracias por tu paciencia.');
            } else {
                setComments(prev => [newCommentObj, ...prev]);
                localStorage.setItem('corvicac-comments', JSON.stringify([newCommentObj, ...comments]));

                // Update user points
                const updatedUser = { ...user, points: user.points + 5 };
                setUser(updatedUser);
                localStorage.setItem('corvicac-user-data', JSON.stringify(updatedUser));

                analytics.trackUserAction('post_comment', 5);
                analytics.trackEvent('community_engagement', {
                    action: 'comment_posted',
                    user_level: user.level,
                    content_length: newComment.length
                });
            }

            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Hubo un error al publicar tu comentario. Por favor, intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = (commentId: string) => {
        setComments(prev => prev.map(comment =>
            comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
        ));

        analytics.trackEvent('community_engagement', {
            action: 'comment_liked',
            comment_id: commentId,
            user_id: user?.id
        });
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Descubridor': return 'text-blue-600';
            case 'Comprometido': return 'text-green-600';
            case 'Promotor': return 'text-purple-600';
            case 'Transformador': return 'text-gold-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--color-primary-black)]">Comunidad Activa</h3>
                <button
                    onClick={() => setShowGuidelines(!showGuidelines)}
                    className="text-sm text-[var(--color-primary-green)] hover:text-[var(--color-primary-deep)] transition-colors"
                >
                    {showGuidelines ? 'Ocultar' : 'Ver'} Normas de Comunidad
                </button>
            </div>

            {showGuidelines && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Normas de Comunidad</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                        <li>• Sé respetuoso con todas las personas</li>
                        <li>• No uses lenguaje ofensivo o discriminatorio</li>
                        <li>• Mantén las conversaciones constructivas</li>
                        <li>• Reporta cualquier contenido inapropiado</li>
                        <li>• Fomenta el diálogo y la empatía</li>
                    </ul>
                </div>
            )}

            {user && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                            <span className={`ml-2 text-sm ${getLevelColor(user.level)}`}>• {user.level}</span>
                            <span className="ml-2 text-sm text-gray-600">• {user.points} puntos</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.verified ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    ✅ Verificado
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    ⚠️ No verificado
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Comparte tus pensamientos (mínimo 10 caracteres)
                    </label>
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario respetuoso y constructivo..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent resize-none"
                        rows={4}
                        maxLength={500}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{newComment.length}/500 caracteres</span>
                        <span>+5 puntos al publicar</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || newComment.trim().length < 10}
                        className="flex-1 bg-[var(--color-primary-green)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-deep)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setNewComment('')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Limpiar
                    </button>
                </div>
            </form>

            {moderationQueue.length > 0 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800 text-sm">
                        {moderationQueue.length} comentario(s) en revisión de moderación
                    </p>
                </div>
            )}

            <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-gray-900">Comentarios Recientes</h4>
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay comentarios aún. Sé el primero en compartir tus pensamientos.</p>
                ) : (
                    comments.slice(0, 5).map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">{comment.author}</span>
                                    {comment.isVerified && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            ✅
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {comment.timestamp.toLocaleDateString('es-CO')}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleLike(comment.id)}
                                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                                    aria-label={`Me gusta ${comment.likes}`}
                                >
                                    ❤️ {comment.likes}
                                </button>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => analytics.trackEvent('community_engagement', { action: 'view_all_comments' })}
                    className="text-[var(--color-primary-green)] hover:text-[var(--color-primary-deep)] transition-colors"
                >
                    Ver todos los comentarios
                </button>
            </div>
        </div>
    );
}