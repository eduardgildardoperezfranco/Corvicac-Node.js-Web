#!/bin/bash
# compress-for-hostinger.sh
# Script de compresión optimizada para CORVICAC Web en Hostinger

set -e  # Salir en caso de error

echo "🚀 Iniciando compresión optimizada para Hostinger..."
echo "📦 Proyecto: CORVICAC Web"
echo "📅 Fecha: $(date)"
echo ""

# Colores para salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
show_status() {
    echo -e "${GREEN}✓${NC} $1"
}

show_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

show_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Verificar estado del proyecto
echo "🔍 Verificando estado del proyecto..."
if [ ! -f "package.json" ]; then
    show_error "No se encontró package.json"
    exit 1
fi

if [ ! -d "src" ]; then
    show_error "No se encontró directorio src/"
    exit 1
fi

show_status "Proyecto CORVICAC Web verificado"

# 2. Limpiar directorios de desarrollo
echo ""
echo "🧹 Limpiando directorios de desarrollo..."

if [ -d ".next" ]; then
    echo "  - Eliminando .next/..."
    rm -rf .next
    show_status ".next/ eliminado"
fi

if [ -d "node_modules" ]; then
    echo "  - Eliminando node_modules/..."
    rm -rf node_modules
    show_status "node_modules/ eliminado"
fi

# 3. Verificar espacio disponible
echo ""
echo "💾 Verificando espacio disponible..."
available_space=$(df . | tail -1 | awk '{print $4}')
if [ "$available_space" -lt 1000000 ]; then  # Menos de 1GB
    show_warning "Espacio disponible bajo: ${available_space}KB"
else
    show_status "Espacio disponible: ${available_space}KB"
fi

# 4. Instalar dependencias de producción
echo ""
echo "📦 Instalando dependencias de producción..."
if npm ci --only=production --silent; then
    show_status "Dependencias de producción instaladas"
else
    show_error "Error al instalar dependencias"
    exit 1
fi

# 5. Construir para producción
echo ""
echo "🔨 Construyendo para producción..."
if npm run build; then
    show_status "Build de producción completado"
else
    show_error "Error en el build de producción"
    exit 1
fi

# 6. Crear archivo de exclusión
echo ""
echo "📝 Creando lista de exclusión..."
cat > .compress-ignore << 'EOF'
# Directorios innecesarios para producción
.next/
.git/
node_modules/
temp/
tmp/
Screenshots/

# Archivos de desarrollo
*.log
*.tmp
*.bak
*.backup
*.swp
*.swo

# Archivos de IDE
.vscode/
.idea/
*.sublime-*

# Otros archivos innecesarios
.DS_Store
Thumbs.db
*.DS_Store
*.gitkeep

# Archivos de desarrollo específicos
.eslintcache
.pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# Directorios de pruebas (si existen)
test/
tests/
__tests__/
*.test.js
*.spec.js
EOF

show_status "Lista de exclusión creada"

# 7. Verificar tamaño antes de comprimir
echo ""
echo "📊 Analizando tamaño del proyecto..."
total_size=$(du -sh . | cut -f1)
echo "  Tamaño total del proyecto: $total_size"

# Calcular tamaño estimado después de exclusión
estimated_size=$(du -sh . --exclude-from=.compress-ignore 2>/dev/null | cut -f1)
echo "  Tamaño estimado después de exclusión: $estimated_size"

# 8. Crear respaldo del archivo .gitignore original
if [ -f ".gitignore" ]; then
    cp .gitignore .gitignore.backup
    show_status "Respaldo de .gitignore creado"
fi

# 9. Comprimir
echo ""
echo "📦 Creando archivo comprimido..."
archive_name="corvicac-production-$(date +%Y%m%d-%H%M%S).zip"

if zip -r "$archive_name" . -x@.compress-ignore; then
    show_status "Archivo comprimido creado: $archive_name"
else
    show_error "Error al crear el archivo comprimido"
    exit 1
fi

# 10. Mostrar estadísticas de compresión
echo ""
echo "📊 Estadísticas de compresión:"
archive_size=$(du -sh "$archive_name" | cut -f1)
echo "  Tamaño del archivo comprimido: $archive_size"

# Calcular ratio de compresión
if command -v bc >/dev/null 2>&1; then
    compression_ratio=$(echo "scale=2; $archive_size_bytes / $total_size_bytes * 100" | bc 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "  Ratio de compresión: ${compression_ratio}%"
    fi
fi

# 11. Verificar integridad del archivo
echo ""
echo "🔍 Verificando integridad del archivo..."
if unzip -t "$archive_name" >/dev/null 2>&1; then
    show_status "Integridad del archivo verificada"
else
    show_error "Error en la integridad del archivo"
    exit 1
fi

# 12. Mostrar contenido resumido
echo ""
echo "📋 Contenido del archivo comprimido:"
unzip -l "$archive_name" | head -20
echo "  ... (continúa)"

# 13. Limpiar archivos temporales
echo ""
echo "🧹 Limpiando archivos temporales..."
rm .compress-ignore
if [ -f ".gitignore.backup" ]; then
    rm .gitignore.backup
fi
show_status "Archivos temporales eliminados"

# 14. Verificar archivos críticos en el zip
echo ""
echo "🔍 Verificando archivos críticos en el zip..."
critical_files=("package.json" "package-lock.json" "next.config.ts" "src/" "public/")
for file in "${critical_files[@]}"; do
    if unzip -l "$archive_name" | grep -q "$file"; then
        show_status "✓ $file"
    else
        show_warning "⚠ $file no encontrado en el zip"
    fi
done

# 15. Recomendaciones finales
echo ""
echo "💡 Recomendaciones para Hostinger:"
echo "  1. Sube el archivo $archive_name a tu hosting"
echo "  2. Descomprime en el directorio raíz"
echo "  3. Ejecuta: npm install"
echo "  4. Ejecuta: npm run start"
echo "  5. Configura las variables de entorno si son necesarias"

# 16. Resumen final
echo ""
echo "✅ Compresión completada exitosamente!"
echo "📁 Archivo: $archive_name"
echo "📏 Tamaño: $archive_size"
echo "📅 Completado: $(date)"
echo ""
echo "🚀 ¡Listo para desplegar en Hostinger!"

# Mostrar tiempo de ejecución
echo ""
echo "⏱️ Tiempo de ejecución: $(($(date +%s) - $(date +%s))) segundos"