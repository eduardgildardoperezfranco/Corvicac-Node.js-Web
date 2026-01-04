// Comprehensive Hate Speech Prevention System for CORVICAC
// Protects against hostile words, gossip, defamation, and harmful intentions

export interface HateSpeechDetection {
    isToxic: boolean;
    severity: 'low' | 'medium' | 'high' | 'critical';
    categories: string[];
    blockedWords: string[];
    suggestions: string[];
}

export interface CommunicationContext {
    source: 'form' | 'comment' | 'email' | 'chat' | 'social' | 'internal';
    userRole: 'visitor' | 'donor' | 'volunteer' | 'partner' | 'staff';
    content: string;
    timestamp: Date;
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
    processed?: boolean;
    processedBy?: string;
    processedAction?: 'approve' | 'reject';
}

export interface PreventionRules {
    blockWords: string[];
    suspiciousPatterns: RegExp[];
    contextSensitive: boolean;
    allowAppeals: boolean;
    escalationThreshold: number;
}

class HateSpeechPreventionSystem {
    private rules: PreventionRules;
    private quarantineQueue: CommunicationContext[] = [];
    private blockedUsers: Set<string> = new Set();
    private appealQueue: any[] = [];

    constructor() {
        this.rules = {
            blockWords: [
                // Violent language
                'asesinar', 'matar', 'muerase', 'muerte', 'violencia', 'golpear', 'golpe', 'paliza',
                'torturar', 'tortura', 'mutilar', 'mutilación', 'suicidio', 'suicidarse', 'matarse',
                'balazo', 'bala', 'arma', 'armas', 'pistola', 'fusil', 'cuchillo', 'cuchilla',

                // Hate speech and discrimination
                'racista', 'racismo', 'discriminar', 'discriminación', 'odio', 'odi', 'odiando',
                'xenofobia', 'xenófobo', 'homofobia', 'homófobo', 'lesbofobia', 'lesbofóbico',
                'transfobia', 'transfóbico', 'machismo', 'machista', 'misoginia', 'misógino',
                'anti', 'contra', 'en contra de', 'en contra de los',

                // Defamation and character attacks
                'mentiroso', 'mentirosa', 'mentira', 'farsante', 'farsantes', 'estafador', 'estafadora',
                'ladrón', 'ladrona', 'roba', 'robar', 'corrupto', 'corrupta', 'corrupción', 'soborno',
                'sobornar', 'chantajear', 'chantaje', 'extorsionar', 'extorsión', 'amenazar', 'amenaza',
                'amenazas', 'amenazando', 'peligroso', 'peligrosa', 'peligro', 'dañino', 'dañina',

                // Gossip and rumors
                'rumor', 'rumores', 'chisme', 'chismes', 'chismear', 'chismeando', 'cotilleo', 'cotilleos',
                'hablan', 'dicen', 'comentan', 'comentando', 'se dice que', 'se comenta que', 'se habla de',
                'supuestamente', 'aparentemente', 'al parecer', 'según dicen', 'según se dice',

                // Personal attacks
                'idiota', 'estúpido', 'estúpida', 'tonto', 'tonta', 'imbécil', 'imbecil', 'tarado', 'tarada',
                'loco', 'loca', 'demente', 'dementes', 'psicópata', 'psicópatas', 'necio', 'necia',
                'ignorante', 'ignorantes', 'analfabeto', 'analfabeta', 'analfabetismo',

                // Threats and intimidation
                'voy a', 'voy a matar', 'voy a golpear', 'voy a destruir', 'voy a arruinar', 'voy a arruinar',
                'te voy a', 'le voy a', 'nosotros vamos a', 'ellos van a', 'ellos van a destruir',
                'destruir', 'arruinar', 'acabar', 'terminar', 'acabar con', 'terminar con',

                // Sensitive topics that could be weaponized
                'drogas', 'droga', 'narcóticos', 'narcótico', 'cocaina', 'cocainómano', 'cocainómana',
                'alcohol', 'alcohólico', 'alcohólica', 'drogadicto', 'drogadicta', 'adicción', 'adicciones',
                'prostitución', 'prostituta', 'prostituirse', 'trata', 'trata de personas', 'explotación',

                // Religious intolerance
                'diablo', 'diablos', 'demonio', 'demonios', 'satanás', 'satanico', 'satanica', 'hereje',
                'herejía', 'blasfemo', 'blasfema', 'apóstata', 'apóstata', 'secta', 'sectario', 'sectaria',

                // Political extremism
                'terrorista', 'terrorismo', 'guerrilla', 'paramilitar', 'paramilitares', 'farc', 'eln',
                'guerra', 'guerrero', 'guerrera', 'combatiente', 'combatientes', 'armado', 'armada',

                // Sexual harassment
                'puta', 'puto', 'zorra', 'zorras', 'perra', 'perras', 'caballo', 'caballos', 'marica',
                'maricón', 'maricona', 'gay', 'lesbiana', 'travesti', 'transexual', 'homosexual', 'heterosexual',

                // Financial manipulation
                'dinero', 'dineros', 'plata', 'platas', 'millones', 'millonario', 'millonaria', 'pobre',
                'pobres', 'rico', 'rica', 'ricos', 'ricas', 'herencia', 'herencias', 'testamento', 'testamentos'
            ],
            suspiciousPatterns: [
                // Multiple exclamation marks or question marks
                /[!]{3,}/g,
                /[?]{3,}/g,
                // ALL CAPS words
                /\b[A-Z]{3,}\b/g,
                // Repeated words
                /\b(\w+)\s+\1\b/gi,
                // Suspicious email patterns
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
                // Phone number patterns that might be shared without consent
                /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
                // URLs that might lead to harmful content
                /https?:\/\/[^\s]+/g,
                // Patterns indicating gossip
                /según\s+(el|la|los|las|él|ella|ellos|ellas)/gi,
                /se\s+(dice|comenta|habla|cuenta)\s+que/gi,
                /al\s+perecer|aparentemente|supuestamente/gi
            ],
            contextSensitive: true,
            allowAppeals: true,
            escalationThreshold: 3
        };
    }

    // Main detection function
    detectHateSpeech(context: CommunicationContext): HateSpeechDetection {
        const content = context.content.toLowerCase();
        const words = content.split(/\s+/);
        const blockedWords: string[] = [];
        const categories: string[] = [];
        let severity = 'low';

        // Check for blocked words
        for (const word of words) {
            const cleanWord = word.replace(/[^\w]/g, '');
            if (this.rules.blockWords.includes(cleanWord)) {
                blockedWords.push(cleanWord);
                this.categorizeWord(cleanWord, categories);
            }
        }

        // Check for suspicious patterns
        const suspiciousMatches = this.checkPatterns(content);

        // Calculate severity
        if (blockedWords.length >= 5 || suspiciousMatches.length >= 3) {
            severity = 'critical';
        } else if (blockedWords.length >= 3 || suspiciousMatches.length >= 2) {
            severity = 'high';
        } else if (blockedWords.length >= 1 || suspiciousMatches.length >= 1) {
            severity = 'medium';
        }

        const isToxic = blockedWords.length > 0 || suspiciousMatches.length > 0;

        return {
            isToxic,
            severity: severity as 'low' | 'medium' | 'high' | 'critical',
            categories,
            blockedWords,
            suggestions: this.generateSuggestions(blockedWords, categories)
        };
    }

    // Pattern detection
    private checkPatterns(content: string): string[] {
        const matches: string[] = [];

        for (const pattern of this.rules.suspiciousPatterns) {
            const found = content.match(pattern);
            if (found) {
                matches.push(...found);
            }
        }

        return matches;
    }

    // Categorize detected words
    private categorizeWord(word: string, categories: string[]): void {
        const categoryMap: { [key: string]: string[] } = {
            'violence': ['asesinar', 'matar', 'muerase', 'muerte', 'violencia', 'golpear', 'golpe', 'paliza', 'torturar', 'tortura'],
            'hate': ['racista', 'racismo', 'discriminar', 'discriminación', 'odio', 'odi', 'odiando', 'xenofobia', 'xenófobo'],
            'defamation': ['mentiroso', 'mentirosa', 'mentira', 'farsante', 'farsantes', 'estafador', 'estafadora'],
            'gossip': ['rumor', 'rumores', 'chisme', 'chismes', 'chismear', 'chismeando', 'cotilleo', 'cotilleos'],
            'personal_attack': ['idiota', 'estúpido', 'estúpida', 'tonto', 'tonta', 'imbécil', 'imbecil'],
            'threats': ['voy a', 'te voy a', 'le voy a', 'nosotros vamos a', 'destruir', 'arruinar', 'acabar'],
            'sensitive_topics': ['drogas', 'droga', 'narcóticos', 'alcohol', 'prostitución', 'trata'],
            'religious_intolerance': ['diablo', 'diablos', 'demonio', 'demonios', 'satanás', 'hereje', 'herejía'],
            'political_extremism': ['terrorista', 'terrorismo', 'guerrilla', 'paramilitar', 'farc', 'eln'],
            'sexual_harassment': ['puta', 'puto', 'zorra', 'zorras', 'perra', 'perras', 'caballo', 'caballos']
        };

        for (const [category, words] of Object.entries(categoryMap)) {
            if (words.includes(word) && !categories.includes(category)) {
                categories.push(category);
            }
        }
    }

    // Generate suggestions for improvement
    private generateSuggestions(blockedWords: string[], categories: string[]): string[] {
        const suggestions: string[] = [];

        if (categories.includes('violence')) {
            suggestions.push('Por favor, expresa tus opiniones de manera pacífica y constructiva');
        }

        if (categories.includes('hate') || categories.includes('defamation')) {
            suggestions.push('Te invitamos a usar un lenguaje respetuoso y evitar juicios personales');
        }

        if (categories.includes('gossip')) {
            suggestions.push('Evita compartir información no verificada sobre terceros');
        }

        if (categories.includes('personal_attack')) {
            suggestions.push('Mantén un tono respetuoso en tus comentarios');
        }

        if (categories.includes('threats')) {
            suggestions.push('No se permiten amenazas ni lenguaje intimidatorio');
        }

        if (suggestions.length === 0) {
            suggestions.push('Por favor, revisa tu mensaje para asegurar que sea apropiado');
        }

        return suggestions;
    }

    // Process communication through the system
    processCommunication(context: CommunicationContext): {
        allowed: boolean;
        reason?: string;
        suggestions?: string[];
        action?: 'block' | 'quarantine' | 'allow' | 'warn';
    } {
        const detection = this.detectHateSpeech(context);

        // Immediate blocking for high severity
        if (detection.severity === 'critical') {
            this.addToQuarantine(context, 'critical_severity');
            return {
                allowed: false,
                reason: 'Contenido altamente ofensivo o peligroso detectado',
                suggestions: detection.suggestions,
                action: 'block'
            };
        }

        // Quarantine for medium severity
        if (detection.severity === 'medium') {
            this.addToQuarantine(context, 'medium_severity');
            return {
                allowed: false,
                reason: 'Contenido potencialmente ofensivo en revisión',
                suggestions: detection.suggestions,
                action: 'quarantine'
            };
        }

        // Warning for low severity
        if (detection.severity === 'low') {
            return {
                allowed: true,
                reason: 'Contenido permitido con advertencia',
                suggestions: detection.suggestions,
                action: 'warn'
            };
        }

        return { allowed: true, action: 'allow' };
    }

    // Add to quarantine queue
    private addToQuarantine(context: CommunicationContext, reason: string): void {
        this.quarantineQueue.push({
            ...context,
            reason,
            processed: false,
            timestamp: new Date()
        });
    }

    // Get quarantine queue for manual review
    getQuarantineQueue(): CommunicationContext[] {
        return this.quarantineQueue.filter(item => !item.processed);
    }

    // Process quarantine item
    processQuarantineItem(index: number, action: 'approve' | 'reject', moderator: string): void {
        const item = this.quarantineQueue[index];
        if (item) {
            item.processed = true;
            item.processedBy = moderator;
            item.processedAction = action;

            if (action === 'reject') {
                this.blockUser(item.ipAddress || 'unknown');
            }
        }
    }

    // Block user
    blockUser(identifier: string): void {
        this.blockedUsers.add(identifier);
    }

    // Check if user is blocked
    isUserBlocked(identifier: string): boolean {
        return this.blockedUsers.has(identifier);
    }

    // Submit appeal
    submitAppeal(context: CommunicationContext, reason: string): boolean {
        if (this.rules.allowAppeals) {
            this.appealQueue.push({
                ...context,
                appealReason: reason,
                submittedAt: new Date(),
                status: 'pending'
            });
            return true;
        }
        return false;
    }

    // Get escalation recommendations
    getEscalationRecommendations(context: CommunicationContext): string[] {
        const recommendations: string[] = [];
        const detection = this.detectHateSpeech(context);

        if (detection.severity === 'critical') {
            recommendations.push('Escalate to legal team immediately');
            recommendations.push('Consider reporting to authorities if threats are present');
            recommendations.push('Block user permanently');
        }

        if (detection.categories.includes('defamation')) {
            recommendations.push('Review for potential legal action');
            recommendations.push('Document evidence for potential legal proceedings');
        }

        if (detection.categories.includes('gossip')) {
            recommendations.push('Monitor for patterns of character assassination');
            recommendations.push('Consider warning to sender about defamation laws');
        }

        return recommendations;
    }

    // Generate prevention report
    generatePreventionReport(): {
        totalBlocked: number;
        totalQuarantined: number;
        topCategories: string[];
        blockedUsers: number;
        appeals: number;
    } {
        return {
            totalBlocked: this.quarantineQueue.filter(item => item.processedAction === 'reject').length,
            totalQuarantined: this.quarantineQueue.length,
            topCategories: this.getTopCategories(),
            blockedUsers: this.blockedUsers.size,
            appeals: this.appealQueue.length
        };
    }

    private getTopCategories(): string[] {
        const categoryCount: { [key: string]: number } = {};

        this.quarantineQueue.forEach(item => {
            const detection = this.detectHateSpeech(item);
            detection.categories.forEach(cat => {
                categoryCount[cat] = (categoryCount[cat] || 0) + 1;
            });
        });

        return Object.entries(categoryCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([category]) => category);
    }
}

// Export singleton instance
export const hateSpeechPrevention = new HateSpeechPreventionSystem();

// Export types for use in components
export { HateSpeechPreventionSystem };