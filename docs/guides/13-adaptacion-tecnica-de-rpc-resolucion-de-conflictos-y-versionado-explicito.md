# 🧠 Adaptación Técnica de RPC: Resolución de Conflictos y Versionado Explícito

## 1. Evolución del Proyecto

La sesión inicia con un objetivo claro y técnico:

👉 **Convertir un servicio complejo de Supabase (Query Builder en frontend) en una función RPC en PostgreSQL.**

### 🔹 Fase 1: Servicio original (Frontend acoplado a Supabase)

Se parte de un módulo JS (`profileService`) que:

- Usa `.from('v_profiles_public')`

- Construye una query altamente anidada con:

  - múltiples relaciones (`summaries`, `experiences`, `education`, `skills`)

  - tablas de traducción (`*_translations`)

- Aplica:

  - filtros dinámicos de idioma

  - filtros de estado (`is_active`)

  - ordenamientos en tablas relacionadas

- Incluye lógica adicional en frontend:

  - agrupación (`_groupItems`)

👉 Problemas detectados:

- Alta complejidad en frontend

- Difícil mantenimiento

- Lógica distribuida (DB + JS)

- Riesgo de errores en joins anidados

### 🔹 Fase 2: Migración a RPC (primer intento)

Se intenta trasladar la lógica a una función SQL:

- Uso de:

  - `jsonb_build_object`

  - `jsonb_agg`

  - subqueries

- Objetivo:

  - devolver un JSON estructurado equivalente al del frontend

👉 Problemas iniciales:

- La llamada RPC no se asemejaba a la original

- Diferencias en estructura de datos

### 🔹 Fase 3: Ajustes de tipos y errores de ejecución

Aparecen errores críticos:

#### ❌ Error: UUID inválido

```txt
invalid input syntax for type uuid: "1"
```

👉 Diagnóstico:

- Se asumió uuid

- Pero el schema usa INTEGER (SERIAL)

✔ Corrección:

- RPC actualizada a INTEGER

### 🔹 Fase 4: Problemas SQL estructurales

❌ Error GROUP BY

```
column "e.start_date" must appear in the GROUP BY clause
```

👉 Causa:

- uso incorrecto de agregaciones + ORDER BY

✔ Corrección:

- eliminación de GROUP BY

- uso de subqueries independientes

❌ Error columnas inexistentes

```
column ed.education_type_id does not exist
```

👉 Causa:

- naming incorrecto

✔ Corrección:

- uso correcto de type_id

### 🔹 Fase 5: Ajuste al schema real

El usuario proporciona:

- DDL completo de tablas

- relaciones correctas

- nombres reales de columnas

- vista `v_profiles_public`

👉 Esto permite:

- corregir joins

- corregir claves foráneas

- alinear SQL con modelo real

### 🔹 Fase 6: Función RPC estable

Se construye una versión funcional:

- basada en subqueries

- sin GROUP BY

- -con jsonb_agg ordenado correctamente

- filtrado por idioma (language_code)

- filtrado por estado (is_active)

### 🔹 Fase 7: Problema de overload de funciones

Error:

```
Could not choose the best candidate function
```

👉 Causa:

- coexistencia de:

    - fetch_full_profile(integer, text)

    - fetch_full_profile(uuid, text)

🔹 Cambio de rumbo importante

❌ Se descarta overload
✅ Se adopta versionado explícito

```
fetch_full_profile_v1
fetch_full_profile_v2
```

### 🔹 Fase 8: Refactor del servicio JS

Se generan dos versiones:

v1:

- Query Builder

- lógica en frontend

v2:

- RPC

- validación de inputs

- delegación al backend

👉 Se mantiene:

- agrupación (_groupItems)

### 🔹 Fase 9: Optimización de RPC v2

Se mejora la función:

- eliminación total de GROUP BY

- uso correcto de:

    - `jsonb_agg(... ORDER BY ...)`

- subqueries eficientes

- estructura JSON limpia

- lista para producción

### 🔹 Fase 10: Introducción de versionado en arquitectura

Se consolida patrón:

```
Frontend → Service → RPC (v1/v2)
```

👉 Se propone:

- dispatcher de versiones en JS

- desacoplamiento progresivo

### 🔹 Fase 11: Transición a Edge Functions

Se introduce el siguiente paso evolutivo:

```
Frontend → Edge Function → RPC → DB
```

👉 Esto marca el inicio de:

- backend real

- API layer

- mayor control y seguridad

## 2. Decisiones Técnicas Clave

🧠 Arquitectura

- Migrar lógica desde frontend → base de datos

- Introducir RPC como capa de acceso a datos

- Evolucionar hacia Edge Functions como API

🧩 Backend (PostgreSQL)

- Uso de:

    - jsonb_build_object

    - jsonb_agg

    - COALESCE

- Subqueries en lugar de joins complejos

🔢 Tipos de datos

- Uso correcto de INTEGER en lugar de UUID

🔄 Versionado

- ❌ Overload descartado

- ✅ Versionado explícito (_v1, _v2)

🧪 Frontend

- Validación de inputs

- Adaptación a RPC (supabase.rpc)

- Mantenimiento de lógica de agrupación

🔐 Seguridad

- Uso de vista v_profiles_public

- Protección de datos sensibles (email, phone)

## 3. Descartes y Correcciones


❌ UUID como identificador

- Error conceptual inicial

- Corregido a INTEGER

❌ GROUP BY en queries complejas

- Generaba errores SQL

- Eliminado completamente

❌ ORDER BY fuera de agregación

- Mal uso en contexto de agregados

- Movido dentro de jsonb_agg

❌ Naming incorrecto de columnas

- education_type_id → ❌

- type_id → ✔

❌ Overload de funciones

- PostgreSQL no resolvía correctamente

- Reemplazado por versionado explícito

❌ Lógica excesiva en frontend

- Difícil de mantener

- Migrada al backend

## 4. Estado Actual

🏗️ Arquitectura actual

```
Frontend
   ↓
Service Layer (v1 / v2)
   ↓
RPC (fetch_full_profile_v2)
   ↓
PostgreSQL
```

✔ Componentes implementados

- RPC v2 optimizada

- Servicio JS v2 funcional

- Versionado definido

- Query corregida y estable

📌 Estado técnico

- Backend parcialmente desacoplado

- Lógica centralizada en DB

- Preparado para API layer

🚧 Próximo paso definido

👉 Implementación de Edge Functions

## 5. Glosario de Implementación

### 🔹 RPC (Remote Procedure Call)

Función PostgreSQL expuesta vía Supabase.

### 🔹 JSONB Aggregation

Construcción de estructuras JSON complejas en SQL:

```
jsonb_build_object
jsonb_agg
```

### 🔹 Subqueries

Consultas internas por entidad para evitar:

- joins complejos
- GROUP BY

### 🔹 Versionado explícito

Estrategia:

```
fetch_full_profile_v1
fetch_full_profile_v2
```

### 🔹 Query Builder (Supabase JS)

API de frontend para construir queries SQL-like.

### 🔹 Vista `v_profiles_public`

Capa de abstracción para:

- ocultar datos sensibles

- simplificar acceso

### 🔹 language_code

Filtro aplicado en todas las tablas de traducción.

### 🔹 is_active

Filtro para controlar visibilidad de registros.

### 🔹 _groupItems

Función JS para agrupar datos por tipo (slug).

## 🏁 Conclusión

La sesión representa una transición clara:

```
De:

Frontend complejo + lógica distribuida

A:

Backend estructurado con:

- RPC optimizadas

- versionado explícito

- base lista para API (Edge Functions)
```

👉 Resultado:

- Mayor claridad arquitectónica

- Mejor rendimiento

- Código más mantenible

- Base sólida para escalar