# Guía de Metadatos para CORVICAC

## Problemas Comunes con Metadatos en Next.js

### 1. Error de Tipo en OpenGraph y Twitter

Next.js utiliza tipos TypeScript muy estrictos para los metadatos de OpenGraph y Twitter. Esto significa que ciertas propiedades solo aceptan valores literales específicos.

#### Problema
```typescript
// Esto causa un error
openGraph: {
  type: META_TAGS.OPEN_GRAPH.TYPE, // Type 'string' no es assignable a 'website' | 'article' | ...
}
```

#### Solución
```typescript
// Usar valores literales directamente
openGraph: {
  type: 'website', // ✅ Correcto
}

// O usar las funciones seguras que hemos creado
openGraph: createOpenGraphMetadata({
  type: 'website', // ✅ Correcto
  // ... resto de propiedades
})
```

### 2. Variables de Entorno No Definidas

Las variables de entorno pueden ser undefined si no están configuradas, lo que puede causar errores en los metadatos.

#### Problema
```typescript
verification: {
  google: META_TAGS.VERIFICATION.GOOGLE, // Puede ser undefined
}
```

#### Solución
```typescript
verification: {
  google: META_TAGS.VERIFICATION.GOOGLE || '', // ✅ Proporciona valor por defecto
}
```

## Mejores Prácticas

### 1. Usar Funciones Seguras

Hemos creado funciones específicas en `src/types/metadata.ts` para manejar los metadatos de forma segura:

```typescript
import { createOpenGraphMetadata, createTwitterMetadata } from '@/types/metadata';

// Uso correcto
openGraph: createOpenGraphMetadata({
  type: 'website',
  // ... resto de propiedades
}),
twitter: createTwitterMetadata({
  card: 'summary_large_image',
  // ... resto de propiedades
})
```

### 2. Valores Permitidos

#### OpenGraph.type
- `'website'`
- `'article'`
- `'book'`
- `'profile'`
- `'music.song'`
- `'music.album'`
- `'music.playlist'`
- `'music.radio_station'`
- `'video.movie'`
- `'video.episode'`
- `'video.tv_show'`
- `'video.other'`

#### Twitter.card
- `'summary'`
- `'summary_large_image'`
- `'app'`
- `'player'`

### 3. Verificación de Variables de Entorno

Siempre proporciona valores por defecto para las variables de entorno que puedan ser undefined:

```typescript
verification: {
  google: META_TAGS.VERIFICATION.GOOGLE || '',
  yandex: META_TAGS.VERIFICATION.YANDEX || '',
  bing: META_TAGS.VERIFICATION.BING || '',
},
```

## Actualización de Metadatos

1. Para actualizar valores existentes, modifica las constantes en `src/lib/constants.ts`.
2. Para cambiar el tipo de OpenGraph o Twitter, modifica directamente en `src/app/metadata.ts` usando valores literales.
3. Si agregas nuevos tipos de metadatos, considera extender las funciones en `src/types/metadata.ts`.

## Prevención de Errores Futuros

1. Siempre verifica los tipos de Next.js antes de usar constantes en metadatos.
2. Mantén las funciones de seguridad actualizadas cuando Next.js actualice sus tipos.
3. Considera agregar pruebas para verificar que los metadatos se generan correctamente.
