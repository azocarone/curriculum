# Optimización de Consultas Atómicas y Arquitectura de Capas Clean

## 1. Evolución del Proyecto

La sesión comenzó con una inquietud técnica puntual sobre la **eficiencia de las consultas** en una base de datos Supabase. El objetivo inicial era optimizar la función `fetchFullProfile` para evitar la carga innecesaria de datos. 

A medida que avanzamos, la conversación evolucionó de una simple optimización de código a una **redefinición arquitectónica**, donde pasamos de un script monolítico a una estructura de capas (Infraestructura, Aplicación y UI) siguiendo principios de **Clean Architecture**.

## 2. Decisiones Técnicas Clave

Se establecieron los siguientes pilares para el manejo de datos y la estructura del proyecto:

- **Consultas Atómicas:** Implementación de `.eq('id', identifier)` para filtrar en el servidor de la base de datos y no en el cliente.

- **Integridad de Datos:** Uso del método `.single()` de Supabase para garantizar que la función devuelva un objeto único (`{}`) en lugar de un array, simplificando el consumo de la API.

- **Agrupamiento Lógico:** Los datos de educación y habilidades se transforman inmediatamente después de la consulta mediante una función privada `_groupItems`, organizándolos por `slug`.

- **Arquitectura de Capas:**
    
    - **Capa de Datos (`profile-service.js`):** Comunicación pura con Supabase.
    
    - **Capa de Orquestación (`content-service.js`):** Lógica de negocio y manejo de errores humanos.
    
    - **Capa de Entrada (`main.js`):** Punto de inicio y control del DOM.

## 3. Descartes y Correcciones

Durante la auditoría, identificamos y eliminamos prácticas de riesgo que habrían causado problemas de rendimiento o mantenimiento:

- **Descarte del "Escaneo Total":** Se abandonó la idea de traer todos los registros de la vista `v_profiles_public`.

- **Corrección de Flujo de Datos:** Se corrigió la tendencia de "funciones sumidero" que no devolvían valores. Ahora, las funciones devuelven el objeto `profileData` completo para maximizar la reutilización.

- **Eliminación de Acoplamiento UI-Servicio:** Se descartó que el servicio de contenido llamara directamente a funciones de renderizado (`refreshAppContent`). Se decidió que el servicio solo entregue datos y el controlador decida cuándo pintar.

## 4. Estado Actual

En este momento, contamos con un sistema de obtención de perfiles que es:

1.  **Dinámico:** Soporta cualquier `identifier` (ID) y `lang`.

2.  **Robusto:** Maneja errores de forma jerárquica (errores de DB vs. errores de "no encontrado").

3.  **Escalable:** La separación en tres capas permite añadir caché, analíticas o nuevos componentes de UI sin romper la lógica existente.

## 5. Glosario de Implementación

| Concepto | Definición en nuestro proyecto |
| :--- | :--- |
| **`.single()`** | Método de Supabase que obliga a la respuesta a ser un solo objeto. Lanza error si hay 0 o más de 1. |
| **`!inner` Join** | Filtro de Supabase que asegura que el registro principal solo aparezca si existe su traducción correspondiente. |
| **Desestructuración** | Técnica usada en `main.js` para extraer solo `full_name` de un objeto sin perder el acceso al resto. |
| **Referencia de Objeto** | Concepto por el cual devolver `profileData` completo no consume memoria extra comparado con devolver solo un string. |
| **Separación de Responsabilidades** | El principio de que el código que consulta la DB no debe saber nada sobre cómo se ve la página web. |

---

> **Nota del documentalista:** El sistema está listo para la fase de producción. La lógica de filtrado por lenguaje mediante `!inner` es el punto más sensible; se recomienda asegurar que existan traducciones por defecto en la base de datos para evitar perfiles vacíos.