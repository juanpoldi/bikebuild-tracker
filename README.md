# BikeBuild 🚲

**BikeBuild** es una plataforma para que entusiastas del ciclismo lleven un registro técnico detallado de sus bicicletas, componentes y mantenimientos.

## 🚀 Estado Atual del Proyecto

El proyecto se encuentra en una fase funcional avanzada con un rediseño completo estilo **Neutral/Catalyst** y **Tailwind CSS 4**.

- **✅ UI/UX**: Rediseño sofisticado con paleta de colores Neutral (Zinc/Slate), tipografía de alto contraste, **cabecera minimalista** y navegación unificada.
- **✅ Dark Mode**: Soporte nativo y persistente para modo oscuro, totalmente integrado con la paleta Neutral.
- **✅ Local First**: Los datos se gestionan mediante un store de **Zustand** con persistencia local (`localStorage`).
- **✅ Vistas Implementadas**:
  - **Dashboard**: Vista general con estadísticas clave y accesos rápidos.
  - **Garaje (Bikes List)**: Listado de todas tus bicicletas con tarjetas minimalistas.
  - **Detalle de Bicicleta**: Ficha técnica completa, historial cronológico (Timeline) y gestión de entradas.
  - **Diario Técnico**: Historial global de todas las actividades registradas.
  - **Explorador de Componentes**: Buscador técnico con filtros por categoría.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS 4 (Beta)
- **UI Kit**: Inspirado en Catalyst UI
- **Temas**: `next-themes` para gestión de Dark Mode
- **Estado**: Zustand con persistencia
- **Tipos**: TypeScript
- **Iconografía**: UTF-8 Emojis (Minimalist approach)

---

## 🗺️ Mapa del Sitio (Sitemap)

Estructura completa de las rutas de la aplicación:

- **Inicio** (`/`): Dashboard principal con resumen y estadísticas.
- **Garaje** (`/bikes`): Listado general de bicicletas.
  - **Nueva Bicicleta** (`/bikes/new`): Formulario de creación.
  - **Detalle de Bicicleta** (`/bikes/[id]`): Ficha técnica, timeline y gestión específica.
- **Diario** (`/diary`): Bitácora global de mantenimientos y registros.
  - **Nuevo Registro** (`/diary/new`): Creación de entradas en el diario.
- **Componentes** (`/components`): Galería de componentes UI y Design System.

---

## 📋 Tareas Pendientes (Roadmap)

A continuación se detallan las funcionalidades y mejoras planeadas para futuras fases:

### **Fase 1: Persistencia y Autenticación**
- [ ] Integración con **Supabase** como base de datos persistente.
- [ ] Implementación de autenticación segura (Google Auth).
- [ ] Soporte multi-usuario con perfiles privados.

### **Fase 2: Inteligencia y Datos Técnicos**
- [ ] Sistema de búsqueda y referencia cruzada con bases de datos de componentes reales.
- [ ] Integración de contexto/opiniones desde fuentes externas (Reddit/Foros).
- [ ] Calculadora de compatibilidad entre piezas.

### **Fase 3: Refinamiento UI/UX**
- [ ] Feedback visual dinámico (Toasts, estados de carga).
- [ ] Soporte para fotografías de alta resolución por registro.
- [ ] Optimización SEO avanzada y PWA para uso offline en ruta.

---

**Fecha de última actualización**: 2 de febrero de 2026
**Versión**: 0.3.1 (Dark Mode)
**Estado**: ✅ Completamente funcional
