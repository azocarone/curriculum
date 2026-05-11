# Diseño Orientado a Dominios (DDD) y Organización de Módulos Empresariales

## 1. Evolución del Proyecto: El Camino a la Modularidad

La sesión comenzó con un objetivo claro: construir un **CV/Portafolio profesional** (joseazocar.pro) utilizando **Vanilla JavaScript**, evitando el "ruido" de frameworks pesados pero manteniendo un estándar de calidad corporativo.

El arco de desarrollo ha pasado por tres etapas críticas:

1. **Fundamentos de Datos:** Definición del esquema en Supabase y la protección de información sensible.

2. **Refactorización de Lógica:** Transición de funciones aisladas a una **Capa de Servicios** profesional, optimizando la recuperación de registros únicos.

3. **Arquitectura de Sistemas:** La conversación evolucionó hacia la organización de archivos de nivel empresarial, adoptando una estructura de **módulos por dominio** y versionado de lógica (`v1`/`v2`) para garantizar la estabilidad del sistema.

## 2. Decisiones Técnicas Clave

- **Stack Tecnológico:** Vanilla JS, HTML5, CSS3 y **Supabase (PostgreSQL)** como motor de persistencia.

- **Seguridad por Diseño:** Implementación de **Row Level Security (RLS)** y políticas de acceso para separar la información pública de los datos de contacto privados.

- **Patrón de Servicio:** Uso de clases o módulos de servicio (ej. `profileService`) para encapsular las llamadas a la base de datos, mejorando el mantenimiento.

- **Internacionalización (i18n):** Implementación de un sistema de navegación dinámico capaz de renderizar contenido en inglés y español.

- **Versionado de Lógica:** Adopción de sufijos `.v1.` y `.v2.` en archivos de servicios para permitir migraciones de API sin romper componentes existentes.

## 3. Descartes y Correcciones

En el proceso de auditoría, se identificaron dos cambios de rumbo fundamentales que elevaron la calidad del código:

- **Abandono de Obfuscación en Cliente:** Se descartó el uso de `btoa()` (Base64) para ocultar correos o teléfonos, reconociendo que no es seguridad real. Se sustituyó por una **Vista SQL en base de datos**, moviendo la responsabilidad de la privacidad al servidor.

- **Corrección de Lógica de Consulta:** Se identificó un error en el fetch de datos donde se recuperaban arrays completos innecesariamente. Se corrigió mediante el método `.single()` de Supabase para asegurar que la aplicación siempre reciba el objeto exacto esperado por el ID.

## 4. Estado Actual

El proyecto se encuentra en una fase de **consolidación arquitectónica**. Actualmente, el repositorio `azocarone/curriculum` refleja una estructura de **Diseño Orientado a Dominios (DDD)**. 

- Se ha definido la carpeta `modules` como contenedora de funcionalidades completas (UI + Lógica + Servicios).

- Existe una convivencia de versiones (`v1` y `v2`) en los servicios, lo que sugiere que estás en medio de una actualización de la estructura de datos o de la API de perfiles.

- El sistema de navegación y temas ya es funcional y dinámico.

## 5. Glosario de Implementación

- **RLS (Row Level Security):** Capa de seguridad de PostgreSQL que controla qué filas puede ver un usuario según su rol.

- **Service Layer:** Patrón que separa la lógica de obtención de datos de la lógica de presentación.

- **Barrel Pattern:** El uso de archivos `index.js` para simplificar las exportaciones de un módulo.

- **Domain-Based Structure:** Organización de carpetas donde cada directorio representa una entidad del negocio (ej. `profiles`) en lugar de solo un tipo de archivo.

- **Vanilla JS:** JavaScript puro, sin el uso de librerías externas como React o Vue.