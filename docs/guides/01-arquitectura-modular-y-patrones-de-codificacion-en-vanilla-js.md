# Arquitectura Modular y Patrones de Codificación en Vanilla JS

Esta refactorización no ha sido solo un cambio de nombres; ha sido una evolución completa hacia una **arquitectura profesional**. Has pasado de un código que "funciona" a un sistema que es **escalable, mantenible y legible**.

Aquí tienes el resumen de los cambios clave y las habilidades técnicas que ahora forman parte de tu arsenal para cualquier proyecto futuro.

## Arquitectura Modular y Separación de Responsabilidades

El mayor cambio fue romper el monolito y organizar el código por su **función lógica** en lugar de solo por su apariencia.

- **Controllers:** El "cerebro" que decide *cuándo* ocurren las cosas (eventos de navegación, orquestación del renderizado).  

- **Services:** La capa que se comunica con el mundo exterior (Supabase, LocalStorage). Aquí vive la "lógica de negocio".  

- **UI (User Interface):** Módulos puros de pintura. Reciben datos y devuelven HTML (tus archivos cv-render.js y components.js).  

- **Utils:** Herramientas genéricas (detección de idioma) que podrías copiar y pegar en cualquier otro proyecto sin cambios.

> **Habilidad obtenida:** Diseño de sistemas desacoplados. Esto te permite cambiar la base de datos (el servicio) sin tener que tocar cómo se ve el menú (la UI).

## Dominio de Consultas Relacionales Complejas

Resolvimos un problema crítico de "ruido" en los datos al trabajar con **Supabase (PostgREST)** y tablas anidadas.

- **Filtros de Profundidad:** Aprendiste que en PostgreSQL, las relaciones definen el camino, pero los filtros .eq() definen el contenido de cada rama.  

- **Uso de \!inner:** Para asegurar que solo se devuelvan registros que tengan traducciones válidas en el idioma seleccionado.  

- **Normalización de Idiomas:** Manejo consistente de `language_code` a través de múltiples niveles de anidamiento (Perfiles -> Experiencias -> Responsabilidades).

> **Habilidad obtenida:** Ingeniería de datos eficiente. Ahora puedes realizar consultas "pesadas" y obtener un JSON limpio y listo para usar, ahorrando procesamiento en el frontend.

## Patrones de Codificación en JavaScript (ES6+)

Establecimos un estándar de escritura que equilibra la modernidad con la legibilidad.

- **Function vs. Arrow Function:** Decidimos usar function para declaraciones de alto nivel (aprovechando el *hoisting* para que el código se lea como un libro) y => para lógica interna, *callbacks* y preservación de contexto.  

- **Gestión de Errores Async/Await:** Implementación de bloques `try...catch` no solo en el arranque (main.js), sino también en las interacciones del usuario, evitando que la app se "congele" si falla el Wi-Fi.

## CSS Moderno y UX (Experiencia de Usuario)

El diseño dejó de ser estático para ser inteligente y resiliente.

- **Responsive Design Real:** Uso de unidades dvh para móviles y *media queries* estratégicas para asegurar que el contenido sea accesible en cualquier pantalla.  

- **Iconografía en CSS:** Aprendiste a usar **Data URIs (SVG)** directamente en el CSS (::before), eliminando peticiones HTTP extra y asegurando que los iconos carguen al instante.  

- **Theming (Modo Oscuro):** Integración de estilos que respetan el `theme-service.js`, demostrando que la UI puede adaptarse a las preferencias del usuario sin duplicar código.

> **Resumen de Habilidades para tu CV Técnico**

| Categoría | Habilidad Aplicable |
| :---- | :---- |
| **Arquitectura** | Implementación de patrón MVC (Model-View-Controller) en Vanilla JS. |
| **Frontend** | Desarrollo de Single Page Applications (SPA) con arquitectura modular. |
| **Backend/DB** | Consultas relacionales avanzadas y filtrado anidado en Supabase/PostgreSQL. |
| **UX/UI** | Diseño responsive "Mobile-First", soporte de Dark Mode y manejo de estados de error. |
| **Clean Code** | Refactorización de código legado para mejorar la legibilidad y mantenimiento. |

> **¿Cuál es la mayor ventaja ahora?**

Si mañana decides hacer un proyecto nuevo (por ejemplo, una lista de tareas o un dashboard de finanzas), **ya tienes el "esqueleto"**. Solo tendrías que cambiar los *Services* para apuntar a otras tablas y la *UI* para pintar otros componentes. La lógica de navegación, el manejo de errores y la estructura de carpetas ya están validadas y listas para producir.