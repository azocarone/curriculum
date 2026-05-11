A continuación, presento la organización de las notas técnicas contenidas en el archivo `01-note.md`, estructuradas de forma coherente y profesional para ser integradas en un archivo `README.md`. Se ha priorizado la claridad arquitectónica y la transición del proyecto hacia un modelo de **Diseño Orientado a Dominios (DDD)**.

***

# Arquitectura Modular y Organización por Dominios (Vanilla JS)

Este documento detalla la lógica de organización del código, evolucionando de una estructura funcional clásica hacia una **arquitectura por dominios**, diseñada para maximizar la escalabilidad y el desacoplamiento en aplicaciones de JavaScript puro.

## 1. Visión Estructural: El Mapa Mental

La arquitectura se divide en tres pilares fundamentales que responden a diferentes necesidades del sistema:,

- **`modules/` (El QUÉ):** Representa las secciones funcionales del CV y el dominio del negocio. Aquí reside lo que el usuario ve y consume (ej. `contact`, `experience`, `skills`).

- **`shared/` (El CÓMO):** Contiene la lógica transversal y las herramientas de renderizado. Es la infraestructura técnica que permite mostrar los módulos (ej. `templates`, `helpers`, `ui`).

- **`core/` (La INFRAESTRUCTURA):** Los cimientos del proyecto. Incluye la configuración global y la conexión con servicios externos como Supabase.

## 2. La Capa de Aplicación: Controllers vs. Orquestadores

En el contexto de este frontend, los **Controllers** no siguen el patrón MVC tradicional de backend; funcionan como **Orquestadores de la UI** dentro de una **Capa de Aplicación** (`app/`).

### Responsabilidades del Controller:

- **Coordinar datos:** Invocar a los servicios correspondientes.

- **Manejar el flujo:** Gestionar cambios de idioma, estados de carga y eventos globales.

- **Llamar al render:** Decidir qué componente de la UI debe pintarse tras obtener los datos.

**Ubicación recomendada:** `src/app/controllers/`. Evitar dejarlos en la raíz de `src/` para prevenir el acoplamiento y garantizar la escalabilidad.,

## 3. Flujo de Ejecución y Separación de Responsabilidades

Para mantener un código "Senior" y limpio, se aplica una separación estricta de tareas:,

1. **Controller (`app/`):** Define *qué hacer* (orquestación).
2. **Service (`modules/` o `core/`):** Define *cómo obtener los datos* (lógica de negocio/API).
3. **Module/Renderer (`modules/` o `shared/`):** Define *cómo mostrar* la información (interfaz).

### Ejemplo de flujo lógico:

```javascript
// El controller orquestando el proceso
import { profileService } from '@modules/profile';
import { renderContact } from '@modules/contact/contact.renderer';

export async function loadProfile(lang) {
    // 1. Obtiene datos a través del servicio
    const profile = await profileService.getProfile(lang); 
    
    // 2. Envía los datos al módulo de UI para su renderizado
    renderContact(profile.profile, profile.translations, lang); 
}
```

## 4. Resumen de la Estructura de Directorios

Basado en esta organización, el árbol de carpetas se define de la siguiente manera:

```text
src/
├── app/
│   └── controllers/    # Orquestadores de lógica y flujo
├── core/
│   └── api/            # Configuración de Supabase y cliente global
├── modules/
│   ├── contact/        # Lógica, servicios y renderizado de Contacto
│   ├── experience/     # Lógica, servicios y renderizado de Experiencia
│   └── ...             # Otros dominios del CV
└── shared/
    ├── ui/             # Componentes visuales comunes
    ├── utils/          # Funciones de ayuda genéricas
    └── i18n/           # Gestión de internacionalización
```

## 5. Beneficios de esta Evolución

- **Desacoplamiento:** La lógica de obtención de datos es independiente de la lógica de pintura.

- **Escalabilidad:** Añadir una nueva sección al CV implica crear un nuevo módulo sin afectar el núcleo del sistema.

- **Mantenibilidad:** Facilita la identificación de errores al segmentar el código por su rol (Qué, Cómo o Infraestructura).,