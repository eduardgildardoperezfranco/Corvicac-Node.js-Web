# Guía de Inicio del Servidor de Desarrollo

## Inicio Rápido

### Método 1: Usando los archivos de acceso directo (Recomendado)

1. **Iniciar el servidor**: Haz doble clic en `start-dev.bat`
2. **Abrir la aplicación**: Haz doble clic en `INICIAR_SERVIDOR.url`

### Método 2: Línea de comandos

```bash
npm run dev
```

Luego abre tu navegador en http://localhost:3000

## Solución de Problemas

### Si el servidor no se inicia:

1. Verifica que Node.js esté instalado ejecutando `node --version`
2. Asegúrate de estar en el directorio correcto del proyecto
3. Ejecuta `npm install` para asegurarte de que todas las dependencias estén instaladas

### Si la aplicación no se carga correctamente:

1. Espera a que el servidor termine de iniciar (verás el mensaje "ready" en la consola)
2. Verifica que no haya otros servicios usando el puerto 3000
3. Intenta limpiar la caché del navegador

## Configuración del Servidor

- **Puerto**: 3000 (por defecto)
- **Host**: localhost
- **Recarga en caliente**: Activada
- **Soporte multilingüe**: Configurado

## Archivos de Configuración Relevantes

- `.eslintrc.cjs`: Configuración de ESLint
- `next.config.js`: Configuración de Next.js
- `middleware.ts`: Manejo de rutas e idiomas

## Notas Importantes

- El servidor se reiniciará automáticamente cuando guardes cambios en el código
- Los cambios en `next.config.js` o `middleware.ts` requieren reinicio manual del servidor
- Para detener el servidor, presiona `Ctrl+C` en la ventana de la consola