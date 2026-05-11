# Roles de los Módulos JavaScript y la Capa de Servicios (Service Layer)

## 1. Evolución del Proyecto

El arco de esta sesión comenzó con un objetivo claro y ambicioso: construir un **ecosistema de marca personal (Portfolio/CV)** utilizando tecnologías puras (**Vanilla JavaScript**, HTML, CSS) respaldadas por **Supabase**.

- **Fase de Cimentación:** Iniciamos definiendo la estructura de datos para un CV multilingüe. El enfoque principal fue la integridad referencial y la separación de preocupaciones (Base de datos vs. Presentación).

- **Fase de Seguridad:** Se planteó el reto de exponer información de contacto sin comprometer la privacidad, lo que nos llevó a evolucionar de soluciones simples a arquitecturas de base de datos protegidas.

- **Fase de Refactorización:** Pasamos de un código funcional pero monolítico a una arquitectura basada en **Servicios**, buscando el principio **DRY (Don't Repeat Yourself)**.

- **Fase de Optimización:** Exploramos la delegación de lógica al servidor (SQL/RPC) para finalmente encontrar el equilibrio perfecto entre rendimiento y mantenibilidad en el cliente.

## 2. Decisiones Técnicas Clave

A lo largo de la auditoría, se identifican los siguientes pilares arquitectónicos:

- **Arquitectura de Datos Normalizada:** Uso de tablas base (`profiles`, `experiences`, `education`) separadas de sus traducciones (`*_translations`) para permitir una escalabilidad infinita de idiomas.

- **Seguridad por Capas:** Implementación de **Row Level Security (RLS)** y el uso de una **Vista SQL (`v_profiles_public`)** para manejar la ofuscación de datos sensibles directamente en el motor de la base de datos.

- **Patrón Service Layer:** Creación de un `profileService` centralizado que orquesta las llamadas a Supabase, abstrayendo la complejidad de las consultas al resto de la aplicación.

- **Filtrado Dinámico de Idiomas:** Implementación de una lista de rutas transitables (`_TRANSLATABLE_PATHS`) que permite inyectar filtros de idioma en consultas complejas mediante bucles, eliminando el código repetitivo.

## 3. Descartes y Correcciones

Este proyecto ha sido un ejercicio de honestidad técnica, donde se descartaron ideas iniciales en favor de soluciones más robustas:

- **Obfuscación Base64:** Se descartó el uso de `btoa()` en el cliente para ocultar emails y teléfonos por ser una "seguridad por oscuridad" ineficaz. Se reemplazó por lógica de servidor en la vista SQL.

- **Manejo de Arrays en Queries:** Corregimos el error lógico de recibir arrays innecesarios en registros únicos, implementando el método `.single()` para mejorar la precisión del modelo de datos.

- **Funciones RPC (SQL):** Tras múltiples iteraciones para intentar replicar el comportamiento de PostgREST en SQL puro, **se descartó el uso de RPC** para la carga del perfil. Se concluyó que la complejidad de mantenimiento y la rigidez del JSON resultante superaban los beneficios de rendimiento frente al SDK de JavaScript.

## 4. Estado Actual

En este momento, el proyecto cuenta con:

1.  Un **servicio de datos optimizado** que realiza consultas anidadas profundas con un solo "round-trip" a la base de datos.

2.  Un sistema de **agrupamiento resiliente** (`_groupItems`) capaz de procesar datos de educación y habilidades por categorías, incluso con estructuras de datos variables.

3.  Una **base de datos segura** que garantiza que la información privada nunca llegue al navegador en texto plano.

4.  Un código **preparado para el futuro**, donde añadir secciones o idiomas nuevos requiere cambios mínimos en la lógica central.

## 5. Glosario de Implementación

Para mantener la coherencia en futuras expansiones, definimos los siguientes términos clave:

- **RLS (Row Level Security):** Políticas de base de datos que restringen qué filas puede leer un usuario anónimo.

- **!inner Join (PostgREST):** Modificador que obliga a que una relación exista (ej. una traducción) para que el registro principal sea devuelto.

- **JSONB Construction:** Técnica utilizada en SQL para empaquetar múltiples tablas en un solo objeto JSON estructurado.

- **Edge Functions:** Microservicios en Deno evaluados como alternativa para ejecutar lógica de backend con mínima latencia.

- **Slug-based Grouping:** Método de organización de UI basado en identificadores únicos de categoría (`education_types.slug`).

---

> **Nota:** El proyecto se encuentra en un estado de madurez técnica "Senior". La infraestructura es lo suficientemente flexible para soportar una transición a frameworks o a microservicios sin necesidad de rediseñar la base de datos.