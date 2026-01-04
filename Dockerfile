# Multi-stage build para optimización en producción
FROM node:18-alpine AS builder

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de desarrollo
RUN npm ci --only=development

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Segunda etapa: Imagen de producción ligera
FROM node:18-alpine AS production

# Instalar dependencias de producción
RUN apk add --no-cache dumb-init

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar solo lo necesario para producción
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiar al usuario no root
USER nextjs

# Exponer el puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/_health || exit 1

# Iniciar la aplicación
CMD ["dumb-init", "node", "server.js"]