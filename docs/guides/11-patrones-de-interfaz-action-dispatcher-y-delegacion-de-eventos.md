# Patrones de Interfaz: Action Dispatcher y Delegación de Eventos

## 1. Evolución del Proyecto

El arco de esta sesión comenzó con el objetivo de construir una plataforma de marca personal utilizando un stack de **Vanilla JavaScript, HTML, CSS y Supabase**. 

- **Fase Inicial:** Definición de la estructura base y gestión de datos biográficos. El foco estaba en la visualización de información y la descarga de documentos (CV).

- **Fase de Blindaje:** La conversación viró hacia la seguridad, implementando capas de protección para datos sensibles (teléfono, email) mediante la base de datos.

- **Fase de Refactorización Arquitectónica:** Se detectó que las funciones monolíticas estaban creciendo en complejidad. Se realizó una transición hacia un **Service Layer** para la lógica de datos y un **Action Dispatcher** para la interfaz de usuario.

- **Fase de Optimización de UI:** El último tramo se ha centrado en pulir el componente de navegación para que sea declarativo, manejando estados de idioma, temas y descargas de forma centralizada.

## 2. Decisiones Técnicas Clave

- **Arquitectura Sin Frameworks:** Se mantuvo la decisión de no usar React/Vue para maximizar el rendimiento y demostrar dominio de las Web APIs fundamentales.

- **Action Dispatcher Pattern:** Se implementó un mapa de acciones (`actions = { ... }`) en los listeners para evitar la "fatiga de condicionales" y facilitar la expansión de funcionalidades.

- **Seguridad en el Backend (Supabase):** Uso de **Row Level Security (RLS)** y políticas de acceso para asegurar que solo los datos públicos sean consultables sin filtros adicionales.

- **Internacionalización (i18n) Dinámica:** Implementación de un sistema de plantillas que renderiza el contenido basándose en un objeto de etiquetas (`NAV_LABELS`), permitiendo el cambio de idioma en tiempo real sin recargar la página.

## 3. Descartes y Correcciones

Durante la auditoría, se identificaron tres momentos críticos de corrección de rumbo:

1.  **De Ofuscación Client-Side a SQL Views:** Se descartó el plan inicial de usar `btoa()` (Base64) para ocultar correos en el frontend. Se sustituyó por una **Vista SQL** en la base de datos que actúa como un túnel seguro, eliminando el riesgo de scraping básico.

2.  **Optimización de Queries:** Se corrigió un error de lógica donde el servicio de perfil traía arrays completos de datos. Se implementó el método `.single()` y filtros por ID para mejorar la eficiencia de la memoria.

3.  **Flujo de Control en Eventos:** Se abandonó la cadena de `if/else` en el listener de navegación. Esta decisión se tomó porque el código se volvía difícil de leer y propenso a errores de prioridad (como el conflicto detectado entre enlaces externos y toggles internos).

## 4. Estado Actual

El proyecto se encuentra en una fase de **alta madurez técnica**. 

- El **Navbar** es ahora un componente puramente declarativo que utiliza atributos `data-action` para despachar lógica. 

- Se ha resuelto la gestión de enlaces externos (`target="_blank"`) mediante helpers que analizan el `href`.

- La lógica de descarga de CV está integrada tanto para disparadores programáticos (JS) como para enlaces directos, manteniendo la compatibilidad con el cambio de idioma.

## 5. Glosario de Implementación

- **Privacy by Design:** Filosofía aplicada al ocultar datos de contacto desde la arquitectura de la base de datos.

- **Service Layer:** Capa de abstracción (`profileService`) que separa las llamadas a la base de datos de la lógica de renderizado.

- **Template Literals con Atributos Condicionales:** Técnica de uso de strings de JavaScript para generar HTML limpio, eliminando atributos vacíos o innecesarios.

- **Event Delegation:** Técnica de asignar un único listener al contenedor padre (`#nav`) para gestionar todos los clics de los hijos, optimizando el uso de recursos.

- **Action Mapping:** Objeto de configuración que vincula una cadena de texto (acción) con una función ejecutable.