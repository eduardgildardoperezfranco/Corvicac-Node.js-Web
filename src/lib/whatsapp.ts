import { WHATSAPP_CONFIG, WHATSAPP_FORM_CONFIG } from './constants';

/**
 * WhatsApp Integration Utilities
 */

/**
 * Open WhatsApp with a predefined message
 * @param message The message to send (will be URL encoded)
 * @param phone Optional phone number (defaults to WHATSAPP_CONFIG.PHONE)
 */
export function openWhatsApp(message: string, phone?: string): void {
    const phoneNumber = phone || WHATSAPP_CONFIG.PHONE;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');
}

/**
 * Send form data via WhatsApp
 * @param formData The form data to send
 */
export function sendFormViaWhatsApp(formData: any): void {
    const message = WHATSAPP_FORM_CONFIG.MESSAGE_TEMPLATE(formData);
    openWhatsApp(message);
}

/**
 * Send form data via WhatsApp with enhanced formatting and design
 * @param formData The form data to send
 */
export function sendFormViaWhatsAppEnhanced(formData: any): void {
    const message = formatFormDataForWhatsAppEnhanced(formData);
    openWhatsApp(message);
}

/**
 * Format form data for WhatsApp with enhanced design and styling
 * @param formData The raw form data
 * @returns Formatted message string with visual design elements
 */
export function formatFormDataForWhatsAppEnhanced(formData: any): string {
    const {
        name,
        company,
        email,
        phone,
        taxId,
        country,
        address,
        preferredContact,
        newsletter,
        message,
        termsAccepted,
        amount,
        tier
    } = formData;

    // Enhanced header with visual design
    const header = `
╔══════════════════════════════════════════════════╗
║              📋 SOLICITUD DE PATROCINIO           ║
║              CORVICAC - Transformación Social      ║
╚══════════════════════════════════════════════════╝

`;

    // Formatted data sections with visual separators
    const personalInfo = `
👤 DATOS PERSONALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${name}
• Empresa: ${company || 'No especificada'}
• Correo: ${email}
• Teléfono: ${phone}
• País: ${country || 'No especificado'}
• Dirección: ${address || 'No especificada'}

`;

    const financialInfo = `
💰 INFORMACIÓN FINANCIERA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Monto de Contribución: ${amount ? '$' + amount.toLocaleString('es-CO') : 'No especificado'}
• Nivel de Impacto: ${tier || 'No seleccionado'}
• Identificación Fiscal: ${taxId || 'No especificada'}
• Contacto Preferido: ${preferredContact || 'No especificado'}

`;

    const additionalInfo = `
📝 INFORMACIÓN ADICIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Newsletter: ${newsletter ? '✅ Sí' : '❌ No'}
• Términos Aceptados: ${termsAccepted ? '✅ Sí' : '❌ No'}
• Mensaje Específico: ${message || 'Sin mensaje adicional'}

`;

    const footer = `
📅 DATOS DEL PROCESO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fecha: ${new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
• Hora: ${new Date().toLocaleTimeString('es-CO')}
• Tipo: Solicitud de Patrocinio Transformador
• Organización: CORVICAC

╔══════════════════════════════════════════════════╗
║  🤝 Gracias por su interés en transformar vidas    ║
║     junto a CORVICAC - Justicia, Igualdad, Respeto ║
╚══════════════════════════════════════════════════╝

`;

    return header + personalInfo + financialInfo + additionalInfo + footer;
}

/**
 * Open WhatsApp with contact message
 */
export function openWhatsAppContact(): void {
    openWhatsApp(WHATSAPP_FORM_CONFIG.CONTACT_MESSAGE);
}

/**
 * Generate WhatsApp URL for form submission
 * @param formData The form data to send
 * @returns The WhatsApp URL
 */
export function getWhatsAppFormUrl(formData: any): string {
    const message = WHATSAPP_FORM_CONFIG.MESSAGE_TEMPLATE(formData);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_FORM_CONFIG.PHONE}?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp URL for contact
 * @returns The WhatsApp contact URL
 */
export function getWhatsAppContactUrl(): string {
    const encodedMessage = encodeURIComponent(WHATSAPP_FORM_CONFIG.CONTACT_MESSAGE);
    return `https://wa.me/${WHATSAPP_FORM_CONFIG.PHONE}?text=${encodedMessage}`;
}

/**
 * Check if WhatsApp is available on the device
 * @returns Promise<boolean> indicating if WhatsApp is available
 */
export async function isWhatsAppAvailable(): Promise<boolean> {
    try {
        // Try to open WhatsApp and check if it's handled
        const url = `https://wa.me/${WHATSAPP_FORM_CONFIG.PHONE}`;
        const result = await navigator.serviceWorker?.controller?.postMessage?.({
            type: 'CHECK_WHATSAPP',
            url
        });

        // Fallback check - try to open and see if it redirects to web version
        const testUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_FORM_CONFIG.PHONE}`;
        const response = await fetch(testUrl, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        // If there's an error, assume WhatsApp is available via web
        return true;
    }
}

/**
 * Format form data for WhatsApp message
 * @param formData The raw form data
 * @returns Formatted message string
 */
export function formatFormDataForWhatsApp(formData: any): string {
    const {
        name,
        company,
        email,
        phone,
        taxId,
        country,
        address,
        preferredContact,
        newsletter,
        message,
        termsAccepted
    } = formData;

    const lines = [
        '*NUEVA SOLICITUD DE PATROCINIO*',
        '',
        `*Nombre:* ${name}`,
        `*Empresa:* ${company || 'No especificada'}`,
        `*Correo:* ${email}`,
        `*Teléfono:* ${phone}`,
        `*Identificación:* ${taxId || 'No especificada'}`,
        `*País:* ${country || 'No especificado'}`,
        `*Dirección:* ${address || 'No especificada'}`,
        `*Contacto preferido:* ${preferredContact || 'No especificado'}`,
        `*Newsletter:* ${newsletter ? 'Sí' : 'No'}`,
        `*Mensaje:* ${message || 'Sin mensaje'}`,
        `*Términos aceptados:* ${termsAccepted ? 'Sí' : 'No'}`,
        '',
        `*Fecha:* ${new Date().toLocaleDateString('es-CO')}`,
        `*Hora:* ${new Date().toLocaleTimeString('es-CO')}`
    ];

    return lines.join('\n');
}