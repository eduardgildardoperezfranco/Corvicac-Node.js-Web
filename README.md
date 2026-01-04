# CORVICAC Web - Modern Web Application

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-blue?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Descripción

Aplicación web moderna para CORVICAC (Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano), desarrollada con las últimas tecnologías y mejores prácticas del desarrollo web.

## ✨ Características

### 🎨 Diseño y Experiencia de Usuario
- **Diseño responsive** - Optimizado para todos los dispositivos
- **Accesibilidad WCAG 2.1** - Cumple con estándares de accesibilidad
- **Modo oscuro** - Soporte para preferencias de color del sistema
- **Animaciones fluidas** - Transiciones y micro-interacciones suaves
- **Tipografía optimizada** - Fuentes web modernas y legibles

### 🚀 Rendimiento
- **Next.js 16** - Renderizado optimizado (SSR/SSG/ISR)
- **Tailwind CSS 4** - Estilos atómicos y personalizados
- **Optimización de imágenes** - Carga diferida y formatos modernos
- **Caché inteligente** - Estrategias de caché avanzadas
- **Carga rápida** - Tiempos de carga optimizados

### 🔧 Arquitectura
- **Componentes modulares** - Sistema de componentes reutilizables
- **Gestión de estado** - Hooks personalizados y contextos
- **Tipado fuerte** - TypeScript estricto
- **SEO optimizado** - Meta tags, schema.org y Open Graph
- **Internacionalización** - Soporte para múltiples idiomas

### 🛡️ Calidad y Seguridad
- **Validación de formularios** - Validación en cliente y servidor
- **Manejo de errores** - Gestión robusta de errores
- **Pruebas de accesibilidad** - Asegura compatibilidad con lectores de pantalla
- **Código limpio** - ESLint y formatos consistentes

## 📦 Instalación

### Requisitos Previos
- Node.js 18.0.0 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd corvicac-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_API_URL=https://api.corvicac.org
   NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
   NEXT_PUBLIC_DONATIONS_ENABLED=true
   NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador:**
   Ve a `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── nosostros/         # Ruta de página
├── components/            # Componentes reutilizables
│   ├── layout/           # Componentes de layout
│   └── ui/               # Componentes UI
├── lib/                  # Lógica de negocio
│   ├── constants.ts      # Constantes de la aplicación
│   ├── hooks.ts          # Hooks person
│   ├── utils.ts          # Funciones utilitarias
│   └── index.ts          # Exportaciones
└── public/               # Archivos estáticos
```

## 🎯 Guía de Desarrollo

### Crear un Nuevo Componente

1. **Crear el archivo del componente:**
   ```tsx
   // src/components/ui/Example.tsx
   import React from 'react';

   interface ExampleProps {
       title: string;
       children: React.ReactNode;
   }

   export default function Example({ title, children }: ExampleProps) {
       return (
           <div className="bg-white rounded-lg p-6">
               <h2 className="text-xl font-bold mb-4">{title}</h2>
               {children}
           </div>
       );
   }
   ```

2. **Exportar desde el índice:**
   ```tsx
   // src/components/ui/index.ts
   export { default as Example } from './Example';
   ```

3. **Usar el componente:**
   ```tsx
   import { Example } from '@/components/ui';
   ```

### Crear una Nueva Página

1. **Crear la carpeta de la página:**
   ```
   src/app/nueva-pagina/
   ```

2. **Crear el archivo page.tsx:**
   ```tsx
   // src/app/nueva-pagina/page.tsx
   export default function NuevaPagina() {
       return (
           <div>
               <h1>Nueva Página</h1>
           </div>
       );
   }
   ```

### Crear una API Route

```tsx
// src/app/api/ejemplo/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
    const body = await request.json();
    // Procesar datos
    return NextResponse.json({ success: true });
}
```

## 🎨 Convenciones de Código

### Naming
- **Archivos:** `kebab-case` (ej: `mi-componente.tsx`)
- **Componentes:** `PascalCase` (ej: `MiComponente`)
- **Variables:** `camelCase` (ej: `miVariable`)
- **Constantes:** `UPPER_SNAKE_CASE` (ej: `API_URL`)

### Estilos
- **Tailwind CSS:** Clases atómicas
- **CSS Modules:** Para estilos específicos de componente
- **Variables CSS:** Para colores y breakpoints personalizados

### Tipado
- **TypeScript estricto:** Todas las variables deben tener tipo
- **Interfaces:** Para props y tipos complejos
- **Type Guards:** Para validación de tipos en runtime

## 🔍 SEO y Accesibilidad

### Meta Tags
El proyecto incluye configuración SEO avanzada:
- Meta tags dinámicos
- Open Graph tags
- Twitter Cards
- Schema.org markup
- Sitemap automático

### Accesibilidad
- ARIA labels
- Navegación por teclado
- Contraste de colores
- Tamaños de fuente accesibles
- Soporte para lectores de pantalla

## 🚀 Despliegue

### Hostiger (Recomendado)
1. **Requisitos:** Node.js 18+, npm 8+
2. **Comandos:**
   ```bash
   npm run hostiger:build
   npm run hostiger:deploy
   ```
3. **Configuración:** Ver [HOSTIGER_SETUP.md](./HOSTIGER_SETUP.md)

### Vercel
1. Conecta tu proyecto a GitHub
2. Importa en Vercel
3. Configura variables de entorno
4. Despliega

### Docker
```bash
# Construir imagen
docker build -t corvicac-web .

# Iniciar contenedor
docker run -p 3000:3000 corvicac-web

# Con docker-compose
docker-compose up -d
```

### Otros Providers
- **Netlify:** Soporta Next.js 13+
- **AWS Amplify:** Con configuración SSR
- **Docker:** Imagen lista para producción

## 📊 Métricas de Rendimiento

### Objetivos
- **Lighthouse Score:** > 95
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### Optimizaciones Implementadas
- Imágenes optimizadas
- Código dividido (code splitting)
- Carga diferida (lazy loading)
- Caché de recursos estáticos
- Compresión Gzip/Brotli

## 🤝 Contribuir

1. **Fork** el proyecto
2. Crea un **branch** (`git checkout -b feature/AmazingFeature`)
3. **Commitea** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Sube** el branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Email:** info@corvicac.org
- **Sitio Web:** [https://corvicac.org](https://corvicac.org)
- **GitHub:** [@corvicac](https://github.com/corvicac)

## 🙏 Agradecimientos

- Comunidad de React y Next.js
- Equipo de Tailwind CSS
- Contribuidores de TypeScript
- Usuarios y beneficiarios de CORVICAC

---

**CORVICAC Web** - Construyendo un futuro mejor juntos 🌟
