# CORVICAC Web - Checklist de Despliegue en Hostinger

## 📋 Preparación del Proyecto

### ✅ Verificación de Archivos Críticos
- [ ] `package.json` - Configuración del proyecto
- [ ] `package-lock.json` - Dependencias bloqueadas
- [ ] `next.config.ts` - Configuración de Next.js
- [ ] `postcss.config.js` - Configuración de PostCSS
- [ ] `eslint.config.mjs` - Configuración de ESLint
- [ ] `src/` - Código fuente del proyecto
- [ ] `public/` - Archivos estáticos
- [ ] `Dockerfile` - Configuración Docker (opcional)
- [ ] `docker-compose.yml` - Composición Docker (opcional)
- [ ] `nginx.conf` - Configuración Nginx (opcional)
- [ ] `README.md` - Documentación del proyecto
- [ ] `HOSTIGER_SETUP.md` - Configuración específica para Hostiger

### ✅ Exclusión de Archivos Innecesarios
- [ ] `.next/` - Directorio de desarrollo (EXCLUIR)
- [ ] `node_modules/` - Dependencias (EXCLUIR)
- [ ] `.git/` - Historial Git (EXCLUIR)
- [ ] `*.log` - Archivos de registro (EXCLUIR)
- [ ] `*.tmp` - Archivos temporales (EXCLUIR)
- [ ] `*.bak` - Archivos de respaldo (EXCLUIR)
- [ ] `Screenshots/` - Capturas de pantalla (EXCLUIR)
- [ ] `.vscode/` - Configuración VSCode (EXCLUIR)
- [ ] `.idea/` - Configuración IntelliJ (EXCLUIR)

## 🚀 Proceso de Compresión

### Opción 1: Usando el Script Automático (Recomendado)
```bash
# 1. Hacer ejecutable el script
chmod +x compress-for-hostinger.sh

# 2. Ejecutar el script
./compress-for-hostinger.sh

# 3. Verificar el archivo generado
ls -lh corvicac-production-*.zip
```

### Opción 2: Compresión Manual
```bash
# 1. Limpiar directorios de desarrollo
rm -rf .next
rm -rf node_modules

# 2. Instalar dependencias de producción
npm ci --only=production

# 3. Construir para producción
npm run build

# 4. Crear archivo de exclusión
cat > .compress-ignore << 'EOF'
.next/
.git/
node_modules/
*.log
*.tmp
*.bak
*.backup
.vscode/
.idea/
.DS_Store
Thumbs.db
EOF

# 5. Comprimir
zip -r corvicac-production.zip . -x@.compress-ignore

# 6. Limpiar
rm .compress-ignore
```

## 📦 Verificación del Archivo Comprimido

### ✅ Contenido del Archivo
```bash
# Verificar tamaño
ls -lh corvicac-production-*.zip

# Verificar contenido (sin descomprimir)
unzip -l corvicac-production-*.zip | head -20

# Verificar integridad
unzip -t corvicac-production-*.zip
```

### ✅ Archivos Críticos Presentes
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.ts`
- [ ] `src/` (carpeta completa)
- [ ] `public/` (carpeta completa)
- [ ] `README.md`
- [ ] `HOSTIGER_SETUP.md`

### ✅ Tamaño del Archivo
- [ ] Tamaño final: **15-25MB** (máximo recomendado)
- [ ] Reducción del **95%** respecto al tamaño original
- [ ] No contiene directorios `.next/`, `node_modules/`, `.git/`

## 🌐 Configuración en Hostinger

### ✅ Requisitos del Servidor
- [ ] **Node.js 18.0.0 o superior**
- [ ] **npm 8.0.0 o superior**
- [ ] **Espacio en disco suficiente** (mínimo 100MB)
- [ ] **Puertos disponibles** (3000, 80, 443)

### ✅ Pasos de Despliegue

1. **Subir el archivo comprimido**
   - [ ] Subir `corvicac-production-*.zip` a tu cuenta de Hostinger
   - [ ] Descomprimir en el directorio raíz de tu hosting

2. **Instalar dependencias**
   ```bash
   # Instalar dependencias
   npm install
   
   # Verificar instalación
   npm list --depth=0
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env.production (si es necesario)
   cp .env.example .env.production
   
   # Editar variables según tu entorno
   # NEXT_PUBLIC_API_URL=https://api.corvicac.org
   # NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
   ```

4. **Iniciar el servidor**
   ```bash
   # Iniciar en modo producción
   npm run start
   
   # Verificar que el servidor está corriendo
   curl http://localhost:3000
   ```

5. **Configuración de dominio**
   - [ ] Configurar DNS para apuntar a tu hosting
   - [ ] Configurar SSL/TLS (certificado gratuito en Hostinger)
   - [ ] Configurar redirección HTTP a HTTPS

## 🔧 Configuración Adicional

### ✅ Variables de Entorno Recomendadas
```env
# Variables de entorno para producción
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.corvicac.org
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true

# Variables de seguridad (si se requieren)
# NEXTAUTH_SECRET=your-secret-key
# DATABASE_URL=your-database-url
```

### ✅ Configuración de Seguridad
- [ ] **Headers de seguridad** (configurados en `next.config.ts`)
- [ ] **SSL/TLS habilitado**
- [ ] **Firewall configurado**
- [ ] **Acceso SSH restringido**

### ✅ Optimización de Rendimiento
- [ ] **Caché de imágenes habilitado**
- [ ] **Compresión gzip/brotli activada**
- [ ] **CDN configurado** (opcional)
- [ ] **Minificación de recursos activada**

## 🧪 Pruebas de Despliegue

### ✅ Pruebas Básicas
- [ ] **Página principal accesible** (`/`)
- [ ] **Páginas internas funcionando** (`/nosotros`, `/apoyar`, `/eventos`)
- [ ] **Archivos estáticos cargando** (CSS, JS, imágenes)
- [ ] **Formularios funcionando** (si existen)

### ✅ Pruebas de Rendimiento
- [ ] **Tiempo de carga < 3 segundos**
- [ ] **Lighthouse Score > 90**
- [ ] **Mobile-friendly**
- [ ] **SEO optimizado**

### ✅ Pruebas de Seguridad
- [ ] **HTTPS activo**
- [ ] **Headers de seguridad presentes**
- [ ] **No hay información sensible expuesta**
- [ ] **Errores manejados correctamente**

## 📊 Monitoreo y Mantenimiento

### ✅ Monitoreo Recomendado
- [ ] **Google Analytics** configurado
- [ ] **Monitorización de uptime**
- [ ] **Logs de errores**
- [ ] **Métricas de rendimiento**

### ✅ Mantenimiento Regular
- [ ] **Actualizaciones de dependencias**
- [ ] **Backup de datos**
- [ ] **Limpieza de logs**
- [ ] **Verificación de SSL**

## 🚨 Solución de Problemas Comunes

### Problema: Archivo ZIP demasiado grande
**Solución:**
- Verificar que `.next/`, `node_modules/`, `.git/` están excluidos
- Usar el script automático de compresión
- Verificar que no hay archivos duplicados

### Problema: Dependencias no se instalan
**Solución:**
- Verificar que `package-lock.json` está incluido
- Usar `npm ci` en lugar de `npm install`
- Verificar versión de Node.js

### Problema: Página no carga
**Solución:**
- Verificar variables de entorno
- Revisar logs del servidor
- Verificar puertos y firewall
- Probar en modo desarrollo local

### Problema: Errores de build
**Solución:**
- Verificar dependencias de desarrollo
- Limpiar caché: `npm cache clean --force`
- Reinstalar dependencias

## 📞 Soporte

### Documentación
- [ ] **[COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md)** - Guía de compresión
- [ ] **[HOSTIGER_SETUP.md](./HOSTIGER_SETUP.md)** - Configuración Hostiger
- [ ] **[README.md](./README.md)** - Documentación general

### Contacto
- **Email:** info@corvicac.org
- **Sitio Web:** [https://corvicac.org](https://corvicac.org)
- **GitHub:** [@corvicac](https://github.com/corvicac)

---

**✅ Checklist completado** - Tu proyecto CORVICAC Web está listo para desplegarse en Hostinger con optimizaciones de rendimiento y seguridad.