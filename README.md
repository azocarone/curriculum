# 📑 Curriculum Digital - José Azócar

Este repositorio contiene el código fuente de mi currículum profesional, una plataforma diseñada para ofrecer una experiencia de lectura técnica, eficiente y bilingüe, ahora evolucionada hacia una **arquitectura modular escalable**.


🚀 Explora la versión en vivo: [curriculum.joseazocar.pro](https://curriculum.joseazocar.pro)

<div align="center">
  <img src="./assets/img/screenshot.gif" alt="Vista previa del Curriculum Vitae" width="683" height="384" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
</div>

## ✨ Características del Proyecto

- **Ingeniería de Marca Personal**: Evolución del CV estático a una herramienta técnica de alto rendimiento.

- **Arquitectura Profesional**: Implementación de un patrón de diseño desacoplado (MVC) para facilitar el mantenimiento.

- **Eficiencia de Lectura**: Navegación jerárquica y minimalista que prioriza la transmisión de datos sin ruido visual.

- **Resiliencia Técnica**: Gestión proactiva de errores y estados de carga para una experiencia de usuario sin interrupciones

## 🛠️ Tecnologías y Metodologías

Para este proyecto se han aplicado estándares modernos de desarrollo de software:

* **Frontend Core**: HTML5 Semántico, CSS3 (Flexbox/Grid), JavaScript (ES6+).

* **Backend & Data**: **Supabase (PostgreSQL)** para la persistencia y gestión de datos dinámicos.

* **Arquitectura**: Patrón modular (Controllers, Services, UI, Utils).

* **Estilización**: Metodología BEM, Google Fonts, Variables CSS (Theming).

## 🚀 Evolución Arquitectónica y Habilidades Aplicadas

Recientemente, el proyecto atravesó una refactorización profunda para transformar un código monolítico en un sistema profesional. Los hitos principales incluyen:

1. **Arquitectura Modular (Pattern-Based)**

    Se rompió el monolito para organizar el código por su función lógica:

    - **Controllers**: Orquestan los eventos y el flujo de la aplicación.

    - **Services**: Gestionan la comunicación con Supabase y el almacenamiento local.

    - **UI Modules**: Componentes puros encargados exclusivamente del renderizado.

    - **Habilidad**: Diseño de sistemas desacoplados, permitiendo cambiar el motor de datos sin afectar la interfaz.

2. **Ingeniería de Datos y Consultas Relacionales**

    Optimización del flujo de datos multi-idioma mediante **PostgREST**:

    - **Filtros de Profundidad**: Implementación de lógica de filtrado en ramas anidadas para traducciones.

    - **Joins Eficientes**: Uso de `!inner` para garantizar la integridad de los datos mostrados.

    - **Habilidad**: Ingeniería de datos para obtener JSONs limpios y optimizar el rendimiento del frontend.

3. **Robustez en JavaScript (ES6+)**

    - **Gestión Asíncrona**: Uso avanzado de `async/await` con bloques `try...catch` en todas las interacciones críticas.

    - **Estándares de Codificación**: Uso estratégico de `function` para declaraciones globales y `arrow functions` para lógica interna y preservación de contexto.

4. **UX Avanzada y Responsive Design**

    - **Iconografía en CSS**: Uso de Data URIs (SVG) directamente en el CSS para una carga instantánea.

    - **Dynamic Viewport**: Uso de unidades dvh para asegurar una visualización perfecta en navegadores móviles modernos.

    - **Theming Dinámico**: Sistema de cambio de tema (Light/Dark) persistente y reactivo.

## 🎨 Uso y Experiencia de Usuario (UX)

La UX está regida por el principio de **"La información es la interfaz"**:

- **Diseño Centrado en la Legibilidad**: Jerarquía tipográfica rigurosa que permite el escaneo visual en menos de 10 segundos.

- **Gestión de Errores Profesional**: Interfaz dedicada para estados de error, permitiendo al usuario reintentar la carga de forma amigable y responsive.

- **Arquitectura Mobile-First**: El sitio está diseñado para ser consultado "en movimiento", adaptando los bloques de experiencia sin perder jerarquía.

## 🧭 Navegación y Funcionalidades

- **Selector de Idioma (Dual-Language Toggle)**: Alternancia instantánea entre Español e Inglés mediante manipulación del DOM sin recarga de página.

- **Sistema de Temas**: Soporte nativo para modo claro y oscuro basado en preferencias del sistema o elección del usuario.

- **Navegación por Anclajes Semánticos**: Estructura de HTML5 que guía tanto al usuario como a lectores de pantalla y sistemas ATS.

## 💻 Instalación y Configuración Local

Si deseas revisar la estructura del código o realizar pruebas en un entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/azocarone/curriculum.git
    ```
2.  **Acceder al directorio:**
    ```bash
    cd curriculum
    ```
3.  **Ejecución:**
    Abre el archivo `index.html` empleando el plugin **Live Server** en VS Code. instantáneamente.

## 🗺️ Roadmap de Actualizaciones

- [x] Lanzamiento del dominio personalizado.

- [x] Optimización de la versión móvil.

- [x] Implementación de soporte multi-idioma.

- [x] Refactorización modular y escalabilidad (MVC).

- [X] Integración de un sistema de generación de PDF dinámico.

## ⚖️ Licencia

Este proyecto está bajo la Licencia **MIT**. El contenido personal y la trayectoria profesional son propiedad intelectual de **José Azócar**.

---

<div align="right">
    <strong>José Antonio Azócar Marcano</strong><br>
    Ing. Informático | Consultor I&O: Infraestructura y Ops.<br>
    <a href="https://github.com/azocarone">@azocarone</a>
</div>