# Configuración de Correos para el Formulario de Patrocinio

Este documento explica cómo configurar el envío de correos electrónicos para el formulario de patrocinio de CORVICAC.

## 📧 Configuración Básica (Actual)

Actualmente, el formulario está configurado para:
- ✅ Validar todos los datos del formulario
- ✅ Enviar notificaciones por consola
- ✅ Guardar respaldos en archivos JSON
- ✅ Responder al usuario con confirmación

### Archivos de Configuración
- `.env.local` - Contiene la configuración de correo básico
- `src/app/api/sponsorship/route.ts` - Endpoint de procesamiento

## 🚀 Opciones para Envío de Correos Reales

### Opción 1: SendGrid (Recomendada)

1. **Crear cuenta en SendGrid**: https://sendgrid.com/
2. **Obtener API Key**: 
   - Ir a Settings > API Keys
   - Crear una nueva API Key con permisos de Mail Send
3. **Configurar variables de entorno**:

```env
SPONSORSHIP_EMAIL=corvicac@corvicac.org
SENDGRID_API_KEY=tu_api_key_de_sendgrid_aqui
```

4. **Actualizar el endpoint** (en `route.ts`):

```typescript
import sgMail from '@sendgrid/mail';

// Después de las validaciones, agregar:
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
    to: process.env.SPONSORSHIP_EMAIL,
    from: 'noreply@corvicac.org',
    subject: emailContent.subject,
    html: emailContent.html,
};

await sgMail.send(msg);
```

### Opción 2: Mailgun

1. **Crear cuenta en Mailgun**: https://www.mailgun.com/
2. **Obtener credenciales**:
   - Domain Name
   - API Key
3. **Configurar variables de entorno**:

```env
SPONSORSHIP_EMAIL=corvicac@corvicac.org
MAILGUN_API_KEY=tu_api_key_de_mailgun
MAILGUN_DOMAIN=tu_dominio.mailgun.org
```

4. **Instalar dependencia**:
```bash
npm install mailgun.js
```

5. **Actualizar el endpoint**:

```typescript
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY!
});

const messageData = {
    from: 'CORVICAC <noreply@corvicac.org>',
    to: process.env.SPONSORSHIP_EMAIL,
    subject: emailContent.subject,
    html: emailContent.html
};

await client.messages.create(process.env.MAILGUN_DOMAIN!, messageData);
```

### Opción 3: SMTP (Gmail, Outlook, etc.)

1. **Habilitar SMTP** en tu proveedor de correo
2. **Configurar variables de entorno**:

```env
SPONSORSHIP_EMAIL=corvicac@corvicac.org
SMTP_HOST=tu_servidor_smtp.com
SMTP_PORT=587
SMTP_USER=tu_usuario
SMTP_PASS=tu_contraseña
```

3. **Instalar dependencia**:
```bash
npm install nodemailer
```

4. **Actualizar el endpoint**:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const mailOptions = {
    from: 'CORVICAC <noreply@corvicac.org>',
    to: process.env.SPONSORSHIP_EMAIL,
    subject: emailContent.subject,
    html: emailContent.html
};

await transporter.sendMail(mailOptions);
```

## 📋 Pasos para Implementar

### Paso 1: Elegir Proveedor
- [ ] SendGrid (más fácil de configurar)
- [ ] Mailgun (buenas tasas de entrega)
- [ ] SMTP (con tu dominio existente)

### Paso 2: Configurar Cuenta
- [ ] Crear cuenta en el proveedor elegido
- [ ] Verificar dominio (si aplica)
- [ ] Obtener credenciales/API Keys

### Paso 3: Actualizar Configuración
- [ ] Agregar credenciales al `.env.local`
- [ ] Instalar dependencias necesarias
- [ ] Actualizar el endpoint `route.ts`

### Paso 4: Probar
- [ ] Enviar formulario de prueba
- [ ] Verificar recepción de correo
- [ ] Comprobar respaldo en JSON

## 🔧 Solución de Problemas Comunes

### Correos no llegan
- Verificar API Key
- Revisar configuración de dominio
- Chequear carpeta de spam
- Validar autenticación SPF/DKIM

### Errores de envío
- Verificar límites del plan gratuito
- Revisar cuota de envío diaria
- Chequear logs de errores

### Formato de correo
- El HTML está optimizado para móviles
- Usa colores corporativos de CORVICAC
- Incluye todas las variables del formulario

## 📊 Métricas a Monitorear

- Tasa de entrega exitosa
- Tiempo de respuesta promedio
- Correos marcados como spam
- Interacciones con enlaces

## 🛡️ Seguridad

- No exponer credenciales en el frontend
- Usar variables de entorno
- Rotar API Keys regularmente
- Monitorear actividad sospechosa

## 📞 Soporte

Para ayuda con la configuración:
- Revisar logs de consola
- Verificar documentación del proveedor
- Contactar soporte técnico del servicio de correo

---

**Nota**: La configuración actual ya está funcional para pruebas y desarrollo. Para producción, se recomienda implementar uno de los métodos de envío de correo real.