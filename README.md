# 📑 Curriculum Digital - José Azócar

<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Vite](https://img.shields.io/badge/Frontend-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Backend: Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)
[![JS: ES6+](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br>

Este repositorio presenta el **currículum digital** de José Azócar, una plataforma técnica diseñada con un estilo **Harvard** y optimizada para sistemas de selección **ATS**. El proyecto destaca por su **arquitectura modular escalable** que utiliza **JavaScript** moderno, **Vite** y una base de datos en **Supabase** para gestionar contenido **multilingüe**. Entre sus funciones principales se encuentran un motor de **doble idioma** instantáneo, soporte para **modo oscuro** y una estructura orientada a dominios para facilitar el mantenimiento. El sistema integra lógica avanzada de **base de datos** mediante **PLpgSQL** y funciones de servidor para ofrecer un alto rendimiento.

<br>

<div align="center">
    <img src="./assets/img/screenshot.gif" alt="Vista previa del Curriculum Vitae" width="95%" height="95%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
</div>

<div align="right">
    <p><br>🔗 <a href="https://curriculum.joseazocar.pro/">Ver el Curriculum.</a></p>
</div>

<br>

## 📖 Tabla de Contenidos

- [🛠 Auditoría del Stack Tecnológico](#-auditoría-del-stack-tecnológico)
- [🗄️ Arquitectura de Base de Datos para Perfiles Multilingües](#️-arquitectura-de-base-de-datos-para-perfiles-multilingües)
- [🏗 Arquitectura del Sistema](#-arquitectura-del-sistema)
- [✨ Características Principales](#-características-principales)
- [💻 Instalación y Configuración](#-instalación-y-configuración)
- [⚙️ Variables de Entorno](#️-variables-de-entorno)
- [🚀 Uso y Desarrollo](#-uso-y-desarrollo)
- [🗺 Roadmap](#-roadmap)
- [⚖️ Licencia](#️-licencia)

<br>

## 🛠 Auditoría del Stack Tecnológico

Se identifica el siguiente ecosistema técnico:

- **Frontend Core**: HTML5 Semántico, CSS3 con metodología **BEM** y JavaScript moderno (ES6+).
- **Herramientas de Construcción**: **Vite** como empaquetador para una experiencia de desarrollo rápida y gestión de aliases de rutas.
- **Backend & Persistencia**: **Supabase (PostgreSQL)** para la gestión dinámica de datos y traducciones mediante PostgREST.
- **Lógica de Servidor**: Implementación de **Edge Functions** de Supabase para lógica en el servidor.
- **Distribución de Lenguajes**: Predominio de PLpgSQL (44.3%) y JavaScript (30.6%), lo que refleja una fuerte lógica de base de datos integrada.

<br>

## 🗄️ Arquitectura de Base de Datos para Perfiles Multilingües

> ℹ️ **Nota:** El diseño detallado de tablas, relaciones y lógica multilingüe se encuentra en el archivo anexo:
> [Consultar especificaciones técnicas ↗️](docs/database/README.md)

<br>

## 🏗 Arquitectura del Sistema

El proyecto implementa un **Diseño Orientado a Dominios (DDD)**, para maximizar la escalabilidad y el desacoplamiento en la aplicación JavaScript Vanilla:

1. **app (Capa de Aplicación)**: Actúa como el nivel de orquestación del sistema. En esta capa residen los Controllers, que no siguen un patrón MVC tradicional, sino que funcionan como orquestadores de la interfaz de usuario (UI). Sus responsabilidades incluyen coordinar los datos, manejar el flujo de la aplicación (como estados de carga o eventos globales) y decidir qué componentes deben renderizarse.
2. **core (Infraestructura)**: Representa los cimientos y la infraestructura del proyecto. Contiene la configuración global y las conexiones con servicios externos (por ejemplo, Supabase). Es donde se define, en conjunto con los módulos, la lógica de cómo obtener los datos a través de servicios.
3. **modules (El QUÉ)**: Representa las secciones funcionales y el dominio del negocio. Es la parte que el usuario final consume directamente, como las secciones de contacto, experiencia o habilidades en un CV. Junto con la capa shared, se encarga de definir cómo se muestra la información en la interfaz.
4. **shared (El CÓMO)**: Contiene la lógica transversal y las herramientas técnicas que permiten que los módulos funcionen. Es la infraestructura técnica que incluye plantillas (templates), ayudantes (helpers) y elementos de UI, definiendo las herramientas necesarias para mostrar la información al usuario.

<br>

## ✨ Características Principales

- **Dual-Language Engine**: Selector de idioma instantáneo (ES/EN) mediante manipulación reactiva del DOM sin recarga de página.
- **Resiliencia de Datos**: Uso avanzado de `async/await` con gestión proactiva de errores y estados de carga (Loading/Error UI).
- **Diseño de Alto Rendimiento**:
    - **Iconografía In-line**: Uso de Data URIs (SVG) para minimizar peticiones HTTP.
    - **Viewport Adaptativo**: Implementación de unidades `dvh` para un ajuste perfecto en navegadores móviles modernos.
- **Theming Dinámico**: Sistema de cambio de tema (Claro/Oscuro) persistente y basado en preferencias del usuario.

<br>

## 💻 Instalación y Configuración

Siga estos pasos para configurar el entorno de desarrollo localmente:

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/azocarone/curriculum.git
    cd curriculum
    ```

2. **Instalar dependencias:**
    
    ```bash
    npm install
    ```

3. **Configurar el entorno:** Cree un archivo `.env` en la raíz (ver sección de variables de entorno).

<br>

## ⚙️ Variables de Entorno

Para que el sistema se comunique con la base de datos de Supabase, es necesario configurar las siguientes variables:

| Variable                 | Descripción                         | Requerido |
| :----------------------- | :---------------------------------- | :-------- |
| `VITE_SUPABASE_URL`      | URL del proyecto en Supabase        | Sí        |
| `VITE_SUPABASE_ANON_KEY` | Clave pública de la API de Supabase | Sí        |

<br>

## 🚀 Uso y Desarrollo

Aunque el proyecto puede visualizarse mediante un servidor estático simple, se recomienda el flujo de trabajo profesional integrado:

- **Entorno de Desarrollo:**
    
    ```bash
    npm run dev
    ```

- **Construcción para Producción:**
    
    ```bash
    npm run build
    ```

<br>

## 🗺 Roadmap

- [x] Lanzamiento de dominio personalizado y optimización móvil.
- [x] Refactorización modular (MVC) y escalabilidad.
- [x] Integración de Supabase para gestión de datos dinámicos.
- [ ] Dashboard administrativo para gestionar nuevos registros en la base de datos.

<br>

## ⚖️ Licencia

Este proyecto se distribuye bajo **licencia MIT**, permitiendo a otros desarrolladores explorar su configuración técnica y despliegue profesional. El contenido personal y la trayectoria profesional son propiedad intelectual de **José Azócar**.

<br>

---

<br>

<p align="center">
    <img width="40px" src="./assets/img/azocarone.svg" align="right" alt="Logo" />
    <div align="right">
        <strong>José Antonio Azócar Marcano</strong><br>
        Ing. Informático | Consultor I&O: Infraestructura y Ops.<br>
        ⬆ <a href="#-curriculum-digital---josé-azócar">Up</a>
    </div>
    <br clear="all">
</p>