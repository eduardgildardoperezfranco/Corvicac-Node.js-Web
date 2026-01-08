import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SponsorshipData {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
    taxId?: string;
    address?: string;
    preferredContact: 'email' | 'phone' | 'whatsapp';
    newsletter: boolean;
    termsAccepted: boolean;
    amount: number;
    currency: string;
    country: string;
    tier?: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: SponsorshipData = await request.json();

        // Validaciones básicas
        if (!data.name || !data.email || !data.phone || !data.taxId || !data.address) {
            return NextResponse.json(
                { message: 'Todos los campos marcados con * son obligatorios' },
                { status: 400 }
            );
        }

        if (!data.termsAccepted) {
            return NextResponse.json(
                { message: 'Debe aceptar los términos y condiciones' },
                { status: 400 }
            );
        }

        if (data.amount < 5000000) {
            return NextResponse.json(
                { message: 'El monto mínimo de patrocinio es $5,000,000 COP' },
                { status: 400 }
            );
        }

        // Validar formato de email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { message: 'Por favor ingrese un correo electrónico válido' },
                { status: 400 }
            );
        }

        // Crear contenido del correo
        const emailContent = {
            to: process.env.SPONSORSHIP_EMAIL || 'corvicac@corvicac.org',
            subject: `Nueva Solicitud de Patrocinio - ${data.name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nueva Solicitud de Patrocinio</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
                        .amount { font-size: 24px; font-weight: bold; color: #667eea; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .label { font-weight: bold; color: #555; }
                        .value { color: #333; margin-left: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🌟 Nueva Solicitud de Patrocinio</h1>
                            <p>Transformando vidas, transformando el mundo</p>
                        </div>
                        <div class="content">
                            <div class="info-box">
                                <h2>Información del Patrocinador</h2>
                                <p><span class="label">Nombre:</span> <span class="value">${data.name}</span></p>
                                <p><span class="label">Empresa:</span> <span class="value">${data.company || 'No especificada'}</span></p>
                                <p><span class="label">Email:</span> <span class="value">${data.email}</span></p>
                                <p><span class="label">Teléfono:</span> <span class="value">${data.phone}</span></p>
                                <p><span class="label">Contacto preferido:</span> <span class="value">${data.preferredContact}</span></p>
                                <p><span class="label">País:</span> <span class="value">${data.country}</span></p>
                            </div>

                            <div class="info-box">
                                <h2>Detalles del Patrocinio</h2>
                                <p><span class="label">Monto:</span> <span class="amount">${data.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></p>
                                <p><span class="label">Moneda:</span> <span class="value">${data.currency}</span></p>
                                <p><span class="label">Nivel:</span> <span class="value">${data.tier || 'Personalizado'}</span></p>
                                <p><span class="label">ID Fiscal:</span> <span class="value">${data.taxId}</span></p>
                                <p><span class="label">Dirección:</span> <span class="value">${data.address}</span></p>
                            </div>

                            <div class="info-box">
                                <h2>Mensaje/Proyecto de Interés</h2>
                                <p style="white-space: pre-line;">${data.message || 'No especificado'}</p>
                            </div>

                            <div class="info-box">
                                <h2>Opciones Adicionales</h2>
                                <p><span class="label">Newsletter:</span> <span class="value">${data.newsletter ? 'Sí' : 'No'}</span></p>
                                <p><span class="label">Términos aceptados:</span> <span class="value">Sí</span></p>
                            </div>

                            <a href="mailto:${data.email}?subject=Re: Solicitud de Patrocinio CORVICAC" class="btn">
                                📧 Responder al Patrocinador
                            </a>

                            <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 8px;">
                                <h3>📋 Acciones Recomendadas:</h3>
                                <ul>
                                    <li>Responder al patrocinador dentro de las 24 horas</li>
                                    <li>Validar la información fiscal proporcionada</li>
                                    <li>Enviar certificación fiscal según país</li>
                                    <li>Programar reunión de seguimiento</li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Este mensaje fue generado automáticamente desde el sitio web de CORVICAC</p>
                            <p>Corporación de Víctimas del Conflicto Armado Colombiano</p>
                            <p>📧 ${process.env.SPONSORSHIP_EMAIL || 'corvicac@corvicac.org'}</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // Intentar enviar correo (versión simple)
        try {
            // Simulación de envío de correo - en producción usarías un servicio como SendGrid, Mailgun, etc.
            console.log('📧 Correo de notificación preparado para envío:');
            console.log('Para:', emailContent.to);
            console.log('Asunto:', emailContent.subject);
            console.log('Datos del patrocinador:', {
                name: data.name,
                email: data.email,
                amount: data.amount,
                country: data.country
            });

            // Aquí puedes integrar con tu servicio de correo preferido
            // Por ejemplo, con Nodemailer, SendGrid, Mailgun, etc.

        } catch (emailError) {
            console.error('Error al enviar correo:', emailError);
            // No detenemos el proceso si falla el envío de correo
        }

        // Guardar en archivo JSON para respaldo (opcional)
        try {
            const fs = require('fs');
            const path = require('path');

            const backupDir = path.join(process.cwd(), 'data', 'sponsorships');
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `sponsorship_${timestamp}_${data.name.replace(/\s+/g, '_')}.json`;
            const filepath = path.join(backupDir, filename);

            fs.writeFileSync(filepath, JSON.stringify({
                ...data,
                receivedAt: new Date().toISOString(),
                source: 'web-form'
            }, null, 2));

            console.log('💾 Solicitud guardada en:', filepath);

        } catch (backupError) {
            console.error('Error al guardar respaldo:', backupError);
        }

        return NextResponse.json({
            message: '¡Gracias por su interés en patrocinar! Un asesor se pondrá en contacto para guiarle en el proceso de certificación fiscal internacional. Revisaremos su solicitud y nos contactaremos a la brevedad.',
            success: true,
            data: {
                name: data.name,
                amount: data.amount,
                email: data.email
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error procesando solicitud de patrocinio:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor. Por favor intente de nuevo.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Endpoint de patrocinio. Use POST para enviar solicitudes.' },
        { status: 200 }
    );
}