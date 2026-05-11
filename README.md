# 📑 Curriculum Digital - José Azócar

### *Modular Multilingual Digital Curriculum System*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Vite](https://img.shields.io/badge/Frontend-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Backend: Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com/)
[![JS: ES6+](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Este repositorio contiene el ecosistema digital de mi trayectoria profesional. No es solo un currículum estático, sino una plataforma de alto rendimiento con **arquitectura modular escalable**, diseñada para ser compatible con sistemas ATS y ofrecer una experiencia de lectura técnica bilingüe optimizada.

🚀 **Versión en vivo:** [curriculum.joseazocar.pro](https://curriculum.joseazocar.pro)

<div align="center">
  <img src="./assets/img/screenshot.gif" alt="Vista previa del Curriculum Vitae" width="683" height="384" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
</div>

---

## 📖 Tabla de Contenidos

- [🛠 Auditoría del Stack Tecnológico](#-auditoría-del-stack-tecnológico)
- [🏗 Arquitectura del Sistema](#-arquitectura-del-sistema)
- [✨ Características Principales](#-características-principales)
- [💻 Instalación y Configuración](#-instalación-y-configuración)
- [⚙️ Variables de Entorno](#️-variables-de-entorno)
- [🚀 Uso y Desarrollo](#-uso-y-desarrollo)
- [🗺 Roadmap](#-roadmap)
- [⚖️ Licencia](#️-licencia)

---

## 🛠 Auditoría del Stack Tecnológico

Se identifica el siguiente ecosistema técnico:

- **Frontend Core**: HTML5 Semántico, CSS3 con metodología **BEM** y JavaScript moderno (ES6+).
- **Herramientas de Construcción**: **Vite** como empaquetador para una experiencia de desarrollo rápida y gestión de aliases de rutas.
- **Backend & Persistencia**: **Supabase (PostgreSQL)** para la gestión dinámica de datos y traducciones mediante PostgREST.
- **Lógica de Servidor**: Implementación de **Edge Functions** de Supabase para lógica en el servidor.
- **Distribución de Lenguajes**: Predominio de PLpgSQL (44.3%) y JavaScript (30.6%), lo que refleja una fuerte lógica de base de datos integrada.

---

## 🏗 Arquitectura del Sistema

El proyecto implementa un patrón **MVC (Model-View-Controller)** desacoplado para asegurar la mantenibilidad:

1. **Controllers**: Orquestan el flujo de datos y los eventos del ciclo de vida de la aplicación.
2. **Services**: Capa encargada de la comunicación con las APIs de Supabase y el almacenamiento local.
3. **UI Modules**: Componentes puros de renderizado que transforman datos JSON en interfaces accesibles.
4. **Utils**: Funciones auxiliares y configuración de aliases para evitar "prop drilling" y rutas relativas complejas.

---

## ✨ Características Principales

- **Dual-Language Engine**: Selector de idioma instantáneo (ES/EN) mediante manipulación reactiva del DOM sin recarga de página.
- **Resiliencia de Datos**: Uso avanzado de `async/await` con gestión proactiva de errores y estados de carga (Loading/Error UI).
- **Diseño de Alto Rendimiento**:
    - **Iconografía In-line**: Uso de Data URIs (SVG) para minimizar peticiones HTTP.
    - **Viewport Adaptativo**: Implementación de unidades `dvh` para un ajuste perfecto en navegadores móviles modernos.
- **Theming Dinámico**: Sistema de cambio de tema (Claro/Oscuro) persistente y basado en preferencias del usuario.

---

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

---

## ⚙️ Variables de Entorno

Para que el sistema se comunique con la base de datos de Supabase, es necesario configurar las siguientes variables:

| Variable                 | Descripción                         | Requerido |
| :----------------------- | :---------------------------------- | :-------- |
| `VITE_SUPABASE_URL`      | URL del proyecto en Supabase        | Sí        |
| `VITE_SUPABASE_ANON_KEY` | Clave pública de la API de Supabase | Sí        |

---

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

- **Servidor Local Alternativo:** Si solo desea revisar la interfaz estática, puede usar la extensión **Live Server** de VS Code abriendo el archivo `index.html`.

---

## 🗺 Roadmap

- [x] Lanzamiento de dominio personalizado y optimización móvil.
- [x] Refactorización modular (MVC) y escalabilidad.
- [x] Integración de Supabase para gestión de datos dinámicos.
- [x] Implementación de soporte multi-idioma (Dual-Language Toggle).
- [ ] Generación dinámica de CV en formato PDF desde la web.
- [ ] Dashboard administrativo para actualización de experiencia en tiempo real.

---

## ⚖️ Licencia

Este proyecto se distribuye bajo la **Licencia MIT**. El contenido personal y la trayectoria profesional son propiedad intelectual de **José Azócar**.

---

<div align="right">
    <strong>José Antonio Azócar Marcano</strong><br>
    Ing. Informático | Consultor I&O: Infraestructura y Ops.<br>
    <a href="https://github.com/azocarone">@azocarone</a>
</div>