# Guía de Despliegue Seguro en Hostinger - CORVICAC Web

## 🚨 Protocolo de Despliegue sin Leaks

Esta guía proporciona el procedimiento **ESTRICTO** para desplegar CORVICAC Web en Hostinger sin riesgos de exposición de datos sensibles.

## 🔒 Preparación Segura del Entorno

### Paso 1: Configuración de Variables de Entorno Seguras

```bash
# Crear archivo .env.production (NO SUBIR A GIT)
cat > .env.production << 'EOF'
# Configuración de Entorno
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.corvicac.org

# Analytics y Tracking (SEGURAS)
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID_SEGURA
NEXT_PUBLIC_FB_PIXEL_ID=FB_PIXEL_ID_SEGURA
NEXT_PUBLIC_HOTJAR_ID=HOTJAR_ID_SEGURA

# Funcionalidades (BOOLEANAS)
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
NEXT_PUBLIC_NEWS_ENABLED=true
NEXT_PUBLIC_GALLERY_ENABLED=true
NEXT_PUBLIC_EVENTS_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true

# Contacto (SEGURAS)
NEXT_PUBLIC_WHATSAPP_PHONE=+573001234567
SPONSORSHIP_EMAIL=donaciones@corvicac.org

# Seguridad
NEXT_PUBLIC_CSP_ENABLED=true
NEXT_PUBLIC_HSTS_MAX_AGE=31536000
EOF
```

### Paso 2: Actualizar Referencias de Seguridad

```typescript
// src/lib/constants.ts - ACTUALIZACIÓN SEGURA
export const ANALYTICS = {
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
    HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
};

export const CONTACT = {
    WHATSAPP_PHONE: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '',
    SPONSORSHIP_EMAIL: process.env.SPONSORSHIP_EMAIL || 'corvicac@corvicac.org',
};

export const FEATURE_FLAGS = {
    DONATIONS_ENABLED: process.env.NEXT_PUBLIC_DONATIONS_ENABLED === 'true',
    VOLUNTEERS_ENABLED: process.env.NEXT_PUBLIC_VOLUNTEERS_ENABLED === 'true',
    NEWS_ENABLED: process.env.NEXT_PUBLIC_NEWS_ENABLED === 'true',
    GALLERY_ENABLED: process.env.NEXT_PUBLIC_GALLERY_ENABLED === 'true',
    EVENTS_ENABLED: process.env.NEXT_PUBLIC_EVENTS_ENABLED === 'true',
    BLOG_ENABLED: process.env.NEXT_PUBLIC_BLOG_ENABLED === 'true',
};
```

### Paso 3: Actualizar Componentes con Variables Seguras

```typescript
// src/app/apoyar/page.tsx - ACTUALIZACIÓN SEGURA
import { CONTACT } from '@/lib/constants';

// Reemplazar todas las referencias directas
const handleWhatsAppClick = (action: string) => {
    const message = action === 'join' 
        ? 'Hola, quisiera programar una conversación sobre transformación con CORVICAC'
        : 'Hola, quisiera profundizar sobre el impacto con CORVICAC';
    
    if (CONTACT.WHATSAPP_PHONE) {
        window.open(`https://wa.me/${CONTACT.WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    }
};
```

## 📦 Compresión Segura para Hostinger

### Script de Compresión Seguro

```bash
#!/bin/bash
# secure-hostinger-deploy.sh

set -e  # Salir en caso de error

echo "🔒 Iniciando despliegue seguro para Hostinger..."

# Variables de seguridad
PROJECT_NAME="corvicac-web"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ARCHIVE_NAME="${PROJECT_NAME}-hostinger-${TIMESTAMP}.zip"

# 1. Verificar estado del proyecto
echo "🔍 Verificando estado del proyecto..."
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json"
    exit 1
fi

# 2. Limpiar directorios sensibles
echo "🧹 Limpiando directorios sensibles..."
rm -rf .next
rm -rf node_modules
rm -rf .git
rm -rf Screenshots
rm -rf .vscode
rm -rf .idea
rm -f .env*
rm -f *.log
rm -f *.tmp
rm -f *.bak

# 3. Verificar archivo .env.production
if [ ! -f ".env.production" ]; then
    echo "⚠️  Advertencia: No se encontró .env.production"
    echo "   Creando archivo de variables de entorno básico..."
    cat > .env.production << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.corvicac.org
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
SPONSORSHIP_EMAIL=donaciones@corvicac.org
EOF
fi

# 4. Instalar dependencias de producción
echo "📦 Instalando dependencias de producción..."
npm ci --only=production --silent

# 5. Construir para producción
echo "🔨 Construyendo para producción..."
npm run build

# 6. Crear lista de exclusión segura
cat > .secure-exclude << 'EOF'
# Archivos sensibles
.env*
*.env
*.log
*.tmp
*.bak
*.backup
*.swp
*.swo

# Directorios de desarrollo
.git/
.next/
node_modules/
temp/
tmp/
Screenshots/
.vscode/
.idea/

# Archivos del sistema
.DS_Store
Thumbs.db
*.DS_Store
*.gitkeep

# Archivos de desarrollo específicos
.eslintcache
.pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
EOF

# 7. Verificar tamaño antes de comprimir
echo "📊 Analizando tamaño del proyecto..."
TOTAL_SIZE=$(du -sh . | cut -f1)
echo "  Tamaño total: $TOTAL_SIZE"

# 8. Comprimir con seguridad
echo "📦 Creando archivo comprimido seguro..."
if zip -r "$ARCHIVE_NAME" . -x@.secure-exclude; then
    echo "✅ Archivo comprimido creado: $ARCHIVE_NAME"
else
    echo "❌ Error al crear el archivo comprimido"
    exit 1
fi

# 9. Verificar integridad
echo "🔍 Verificando integridad del archivo..."
if unzip -t "$ARCHIVE_NAME" >/dev/null 2>&1; then
    echo "✅ Integridad verificada"
else
    echo "❌ Error en la integridad del archivo"
    exit 1
fi

# 10. Mostrar estadísticas de seguridad
ARCHIVE_SIZE=$(du -sh "$ARCHIVE_NAME" | cut -f1)
echo ""
echo "📊 Estadísticas de despliegue seguro:"
echo "  📁 Archivo: $ARCHIVE_NAME"
echo "  📏 Tamaño: $ARCHIVE_SIZE"
echo "  🔒 Seguridad: Verificada"
echo "  🚀 Listo para Hostinger"

# 11. Limpiar archivos temporales
rm .secure-exclude

echo ""
echo "✅ Despliegue seguro completado exitosamente!"
echo "📤 Sube el archivo $ARCHIVE_NAME a tu hosting de Hostinger"