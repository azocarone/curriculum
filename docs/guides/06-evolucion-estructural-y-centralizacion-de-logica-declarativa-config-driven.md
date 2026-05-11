# Evolución Estructural y Centralización de Lógica Declarativa (Config-Driven)

## Evolución del Proyecto

La sesión inicia con una duda puntual sobre el uso del alias `@` en imports dentro de un proyecto con Vite. A partir de ahí, el foco evoluciona hacia la correcta configuración de aliases (`vite.config.js`, `jsconfig.json`) y la advertencia deprecada de `baseUrl`.

Posteriormente, el proyecto da un giro hacia **arquitectura de frontend**, donde el usuario busca reorganizar su código existente hacia una estructura modular más escalable (`modules`, `shared`, `app`, etc.). Esto implica:

- Replantear la ubicación de funciones (`utils` → `domain`, `ui`, etc.).

- Separar responsabilidades (render, servicios, controladores).

- Migrar gradualmente partes del sistema (ej. `contact`, `profileService`).

Luego, la conversación entra en una fase más avanzada:

- Se cuestiona el rol del objeto `CV` y se reemplaza por módulos independientes con un `index.js` agregador.

- Se transforma `render-controller.js` en un orquestador más limpio.

- Se analiza si “controllers” deberían llamarse “orchestrators”.

A partir de ahí, el foco pasa a ser **refactorización profunda y coherencia arquitectónica**, especialmente en:

- `nav-controller.js`

- `navActions`

- `ctx` como contenedor de estado

Finalmente, se llega a una fase de **optimización estructural**, donde se detecta un problema mayor: la duplicación entre configuración de UI (`navbar.js`) y comportamiento (actions/controller). Esto lleva a la propuesta final de:

> 🔥 Unificar UI + comportamiento en una sola fuente de verdad (`navbar.js` con `behavior`)

## Decisiones Técnicas Claves

- Uso de **Vite con aliases personalizados** (`@`, `@modules`, `@shared`, etc.).

- Eliminación de `baseUrl` en favor de `paths` en `jsconfig.json`.

- Adopción de arquitectura modular:

  - `modules/` → features (contact, skills, etc.)
  
  - `shared/` → lógica reutilizable (domain, ui, utils)
  
  - `app/` → controllers/orquestación
  
  - `core/` → configuración

- Sustitución del objeto monolítico `CV` por módulos independientes.

- Implementación de `ctx` como:

  - contenedor de estado (`currentLang`)
  
  - API de acceso (`getLang`, `setLang`)

- Estandarización de firma de actions:

  ```js
  (ctx, el, e, closeMenu)
  ```

- Refactorización de `navActions` hacia consistencia y separación de responsabilidades.

- Decisión clave final:

  > Unificar configuración de navegación (`navbar.js`) con comportamiento (`behavior`) para evitar duplicación.

- Controller reducido a ejecutor/orquestador (sin lógica de decisión).

- Actions convertidas en funciones puras (sin lógica de UX).

## Descartes y Correcciones

- ❌ Uso de `baseUrl` en `jsconfig.json` → reemplazado por `paths`.

- ❌ Mantener todo en `/utils` → migrado a `shared/domain`, `shared/ui`, etc.

- ❌ Objeto `CV` centralizado → reemplazado por módulos desacoplados.

- ❌ `profileService` con selector de versiones → simplificado.

- ❌ Actions accediendo a `ctx.lang` → corregido a `ctx.getLang()`.

- ❌ Pasar métodos como `crypto.randomUUID` sin contexto → corregido con wrapper o `bind`.

- ❌ Controller con lógica de decisión → reducido a dispatcher.

- ❌ Actions manejando UX (`preventDefault`, `closeMenu`) → movido a configuración.

- ❌ Separar config de UI y config de acciones → unificado en un solo archivo (`navbar.js`).

- ❌ Duplicación de comportamiento entre capas → centralizado en `behavior`.

## Estado Actual

El proyecto se encuentra en una fase avanzada de refactorización con:

- Arquitectura modular ya establecida.

- `ctx` implementado como contrato entre controller y actions.

- `nav-controller` parcialmente desacoplado.

- `navbar.js` identificado como punto clave para centralizar configuración.

- Acciones en proceso de limpieza para eliminar lógica de UX.

- Sistema evolucionando hacia un patrón declarativo (config-driven).

Pendiente inmediato:

- Ajustar completamente `navActions` al nuevo modelo.

- Integrar `behavior` en `navbar.js`.

- Limpiar controller y eliminar lógica residual.

- Finalizar reubicación de utilidades restantes.

## Glosario de Implementación

- **Alias (`@`)**: Ruta base configurada para imports absolutos en Vite.

- **`ctx` (Context Object)**: Objeto que encapsula estado y provee acceso controlado mediante getters/setters.

- **Controller / Orchestrator**: Capa encargada de coordinar eventos y delegar ejecución.

- **Actions**: Funciones que ejecutan lógica específica (descarga, cambio de idioma, etc.).

- **Behavior**: Configuración declarativa que define UX (preventDefault, closeMenu).

- **Single Source of Truth**: Principio aplicado al `navbar.js` para unificar UI y comportamiento.

- **Domain Logic**: Lógica específica del negocio (ej. formateo de fechas del CV).

- **Shared Layer**: Código reutilizable entre módulos (domain, ui, utils).

- **Module**: Feature independiente (contact, experience, etc.).

- **Dispatcher Pattern**: Controller que delega ejecución sin lógica propia.

- **Closure**: Mecanismo usado en `ctx` para encapsular `currentLang`.

- **Placeholder Parameters (`_`, `__`)**: Convención para argumentos no utilizados.

---

Este punto del proyecto ya no es de organización básica, sino de **refinamiento arquitectónico y consistencia sistémica**, lo cual es una señal clara de madurez en el diseño.