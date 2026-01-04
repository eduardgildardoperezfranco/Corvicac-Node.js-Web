# Guía Rápida de Compresión para CORVICAC Web

## 🚨 Problemas Identificados

### Errores Comunes al Comprimir para Hostinger

1. **Archivo ZIP demasiado grande** (>500MB)
   - Causa: Incluir `.next/`, `node_modules/`, `.git/`
   - Solución: Excluir directorios innecesarios

2. **Errores de descompresión**
   - Causa: Rutas muy largas o caracteres especiales
   - Solución: Usar nombres de archivo cortos

3. **Falta de archivos críticos**
   - Causa: Excluir archivos necesarios por error
   - Solución: Verificar contenido antes de subir

4. **Problemas de instalación en el servidor**
   - Causa: Dependencias incompletas o incorrectas
   - Solución: Usar `npm ci` y `package-lock.json`

## ⚡ Solución Rápida (5 minutos)

### Paso 1: Limpiar proyecto
```bash
cd corvicac-web
rm -rf .next
rm -rf node_modules
```

### Paso 2: Instalar dependencias de producción
```bash
npm ci --only=production
```

### Paso 3: Construir para producción
```bash
npm run build
```

### Paso 4: Comprimir (método rápido)
```bash
# Crear archivo de exclusión rápido
echo -e ".next/\n.git/\nnode_modules/\n*.log\n*.tmp\n*.bak\n*.backup\n.vscode/\n.idea/\n.DS_Store" > .exclude

# Comprimir
zip -r corvicac-production.zip . -x@.exclude

# Limpiar
rm .exclude
```

### Paso 5: Verificar
```bash
# Verificar tamaño
ls -lh corvicac-production.zip

# Verificar contenido
unzip -l corvicac-production.zip | head -10
```

## 📦 Resultado Esperado

- **Tamaño final:** 15-25MB (reducción del 95%)
- **Contenido:** Solo archivos necesarios para producción
- **Tiempo de subida:** Mucho más rápido
- **Instalación en servidor:** Sin problemas

## 🔧 Si tienes problemas...

### Error: "No space left on device"
```bash
# Verificar espacio disponible
df -h

# Limpiar caché npm
npm cache clean --force
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Build failed"
```bash
# Limpiar y reconstruir
rm -rf .next
npm run build
```

## 🚀 Subir a Hostinger

1. **Sube el archivo** `corvicac-production.zip` a tu hosting
2. **Descomprime** en el directorio raíz
3. **Instala dependencias:**
   ```bash
   npm install
   ```
4. **Inicia el servidor:**
   ```bash
   npm run start
   ```

## ✅ Verificación Final

- [ ] Archivo ZIP < 50MB
- [ ] Contiene `package.json`, `src/`, `public/`
- [ ] No contiene `.next/`, `node_modules/`, `.git/`
- [ ] Se puede descomprimir sin errores
- [ ] Dependencias se instalan correctamente

---

**⚠️ Importante:** Esta es una solución rápida. Para mejores resultados, usa el script completo [`compress-for-hostinger.sh`](./compress-for-hostinger.sh).