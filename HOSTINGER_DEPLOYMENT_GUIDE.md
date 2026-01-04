# CORVICAC Web - Guía de Despliegue en Hostinger

## 🚨 Problemas Comunes y Soluciones

### Problema 1: Incompatibilidad de Versiones de Node.js
**Error:** `npm warn EBADENGINE Unsupported engine { package: 'next@16.0.10', required: { node: '>=20.9.0' }, current: { node: 'v18.20.8' } }`

**Solución:** Hemos degradado Next.js a la versión 14.2.5 que es compatible con Node.js 18.

### Problema 2: Error de Permisos
**Error:** `sh: line 1: /home/u415105967/domains/corvicac.org/public_html/.builds/source/Corvicac Web/corvicac-web/node_modules/.bin/next: Permission denied`

**Solución:** Usaremos un script de construcción especial que corrige los permisos antes de construir.

## 📋 Pasos para el Despliegue Exitoso

### 1. Preparación Local
1. Asegúrate de tener Node.js 18 instalado localmente
2. Ejecuta el script de construcción para Hostinger:
   - En Windows: `build-for-hostinger.bat`
   - En Linux/Mac: `chmod +x build-for-hostinger.sh && ./build-for-hostinger.sh`

3. Esto generará un archivo zip llamado `corvicac-hostinger-[FECHA-HORA].zip`

### 2. Subida a Hostinger
1. Inicia sesión en tu panel de control de Hostinger
2. Ve a la sección de "Administrador de Archivos"
3. Navega al directorio raíz de tu dominio
4. Sube el archivo zip generado

### 3. Descompresión y Configuración
1. Descomprime el archivo zip en el directorio raíz
2. Crea un archivo `.env.production` con las siguientes variables:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://api.corvicac.org
   NEXT_PUBLIC_WHATSAPP_PHONE=+573209610147
   SPONSORSHIP_EMAIL=donaciones@corvicac.org
   NEXT_PUBLIC_DONATIONS_ENABLED=true
   NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
   NEXT_PUBLIC_NEWS_ENABLED=true
   NEXT_PUBLIC_GALLERY_ENABLED=true
   NEXT_PUBLIC_EVENTS_ENABLED=true
   NEXT_PUBLIC_BLOG_ENABLED=true
   ```

3. Configura las variables de entorno en el panel de control de Hostinger si es necesario

### 4. Instalación de Dependencias
1. Abre la terminal SSH en Hostinger
2. Navega al directorio de tu aplicación
3. Ejecuta: `npm install --production`

### 5. Inicio de la Aplicación
1. En la terminal SSH, ejecuta: `npm start`
2. O usa el script de inicio: `./start.sh` (Linux) o `start.bat` (Windows)

## 🔧 Configuración Adicional

### Configuración del Servidor Web
Si estás usando Apache, añade estas reglas a tu archivo `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```

Si estás usando Nginx, añade esta configuración:

```nginx
location / {
    try_files $uri $uri/ @nextjs;
}

location @nextjs {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Configuración de PM2 (Recomendado)
Para mantener tu aplicación corriendo en producción:

1. Instala PM2: `npm install -g pm2`
2. Crea un archivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'corvicac-web',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

3. Inicia la aplicación con PM2: `pm2 start ecosystem.config.js`

## 🚀 Verificación del Despliegue

1. Verifica que la aplicación está corriendo visitando tu dominio
2. Revisa el archivo de logs para detectar posibles errores
3. Prueba todas las funcionalidades principales:
   - Navegación
   - Formularios de contacto
   - Integración con WhatsApp
   - Galería de imágenes

## 🛠️ Solución de Problemas

### Problema: Error de Memoria
**Solución:** Aumenta la memoria disponible para Node.js:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

### Problema: Variables de Entorno No Cargadas
**Solución:** Verifica que el archivo `.env.production` esté en el directorio correcto y tenga los permisos adecuados.

### Problema: La Aplicación No Inicia
**Solución:** Revisa los logs de errores:
```bash
pm2 logs corvicac-web
```

## 📞 Soporte

Si encuentras problemas durante el despliegue:
1. Revisa los logs de errores detalladamente
2. Verifica que todas las dependencias estén instaladas correctamente
3. Confirma que las variables de entorno estén configuradas adecuadamente
4. Asegúrate de que los permisos de los archivos sean correctos

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación:
1. Sigue los mismos pasos de preparación local
2. Sube el nuevo archivo zip
3. Detén la aplicación actual: `pm2 stop corvicac-web`
4. Reemplaza los archivos
5. Reinicia la aplicación: `pm2 start corvicac-web`
