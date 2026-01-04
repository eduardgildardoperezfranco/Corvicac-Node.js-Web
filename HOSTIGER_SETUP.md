# CORVICAC Web - Configuración para Hostiger

## 🚀 Despliegue en Hostiger

Esta configuración está optimizada para desplegar CORVICAC Web en Hostiger VPS o hosting.

### Requisitos del Sistema

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Sistema Operativo**: Linux (Ubuntu 20.04+ recomendado)

### Comandos de Despliegue

```bash
# Instalar dependencias
npm install

# Construir para producción
npm run build

# Exportar para hosting estático (opcional)
npm run export

# Iniciar en modo producción
npm run start
```

### Configuración del Servidor

Para VPS en Hostiger, se recomienda:

1. **Node.js**: Instalar la última versión LTS
2. **PM2**: Para manejo de procesos
3. **Nginx**: Como reverse proxy
4. **SSL**: Certificado SSL gratuito con Let's Encrypt

### Variables de Entorno

Crear archivo `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.corvicac.org
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
```

### Optimizaciones para Hostiger

- ✅ Compresión gzip/brotli habilitada
- ✅ Caché de imágenes optimizada
- ✅ Seguridad reforzada con headers
- ✅ Build standalone para menor overhead
- ✅ Performance optimizada para hosting compartido/VPS

### Monitoreo y Mantenimiento

- **Logs**: `/var/log/corvicac-web/`
- **Backup**: Automatizar respaldo de la carpeta `data/`
- **Actualizaciones**: Mantener dependencias actualizadas
- **Performance**: Monitorear tiempos de carga y recursos

### Soporte

Para soporte técnico:
- Documentación: [README.md](./README.md)
- Issues: Reportar en el repositorio
- Contacto: info@corvicac.org