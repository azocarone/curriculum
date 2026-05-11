# 🧠 Estrategia de Migración hacia un Backend Escalable y Desacoplado

## 1. Evolución del Proyecto

La sesión comenzó con un objetivo claro:

👉 **Migrar un servicio complejo basado en Supabase Query Builder hacia una solución más robusta y escalable usando RPC (Remote Procedure Calls).**

### 🔹 Fase 1: Servicio original (Frontend pesado)

- Se parte de un `profileService` en JavaScript que:
  
  - Usa `.from().select()` con múltiples joins anidados
  
  - Aplica filtros dinámicos de idioma
  
  - Maneja lógica de agrupación en frontend

👉 Problema identificado:

- Alta complejidad

- Difícil mantenimiento

- Riesgo de errores en joins

- Performance subóptima

### 🔹 Fase 2: Migración a RPC

Se propone trasladar la lógica a PostgreSQL mediante funciones RPC.

- Se intenta replicar la query en SQL

- Se introducen:

  - `jsonb_build_object`

  - `jsonb_agg`

  - subqueries por entidad

👉 Objetivo:

- Reducir carga del frontend

- Centralizar lógica en DB

- Mejorar performance

### 🔹 Fase 3: Resolución de errores reales

Durante la implementación se encontraron múltiples errores críticos:

1. ❌ UUID vs INTEGER mismatch  

2. ❌ Problemas con `GROUP BY`  

3. ❌ Uso incorrecto de `ORDER BY`  

4. ❌ Columnas inexistentes (`education_type_id`)  

5. ❌ Ambigüedad por overload de funciones  

👉 Cada error llevó a ajustes en:

- Tipos de datos

- Estructura SQL

- Naming de funciones

### 🔹 Fase 4: Versionado de RPC

Se introduce el concepto de versionado:

- `fetch_full_profile_v1`

- `fetch_full_profile_v2`

👉 Cambio clave:

- Se abandona el uso de overload

- Se adopta versionado explícito

### 🔹 Fase 5: Refactor del servicio JS

Se crean dos versiones del servicio:

- v1 → Query Builder

- v2 → RPC

Luego se diseña un **dispatcher de versiones**:

```txt
profileService.get('v1' | 'v2')
```

👉 Resultado:

- Backend desacoplado

- Evolución controlada

### 🔹 Fase 6: Optimización avanzada (RPC v2)

Se construye una versión optimizada:

- Eliminación de `GROUP BY`

- Uso correcto de `jsonb_agg ORDER BY`

- Subqueries eficientes

- Índices recomendados

👉 Resultado:

- Función production-ready

### 🔹 Fase 7: Introducción de Edge Functions

Se evoluciona la arquitectura hacia:

```txt
Frontend → Edge Function → RPC → PostgreSQL
```

👉 Esto introduce:

- API layer

- control de acceso

- versionado tipo REST

## 2. Decisiones Técnicas Clave

### 🧠 Arquitectura

- Migrar lógica del frontend → PostgreSQL

- Introducir RPC como capa principal

- Añadir Edge Functions como capa API

### 🧩 Backend

- Uso de:

  - `jsonb_build_object`
  
  - `jsonb_agg`
  
  - `COALESCE`

- Subqueries en lugar de joins complejos

### 🔢 Versionado

- ❌ Overload de funciones → descartado

- ✅ Versionado explícito (`_v1`, `_v2`)

### 🧪 Frontend

- Implementación de dispatcher:

  - `profileService.get(version)`

- Validación de inputs en v2

### 🔐 Seguridad

- Uso de `v_profiles_public` para datos sensibles

- Uso de `SERVICE_ROLE_KEY` en Edge Functions

## 3. Descartes y Correcciones

### ❌ Uso de UUID

- Se asumió inicialmente UUID

- Se corrigió a INTEGER (según schema real)

### ❌ GROUP BY incorrecto

- Generado por uso incorrecto de agregaciones

- Se eliminó en favor de subqueries

### ❌ ORDER BY fuera de jsonb_agg

- Provocaba errores SQL

- Se movió dentro del aggregate

### ❌ Columnas incorrectas

- `education_type_id` → ❌

- `type_id` → ✔

### ❌ Overload de funciones

- PostgreSQL no resolvía correctamente

- Se reemplazó por versionado explícito

### ❌ Lógica en frontend

- Demasiado compleja

- Se migró al backend

## 4. Estado Actual

Actualmente el sistema se encuentra en:

### 🏗️ Arquitectura

```txt
Frontend
   ↓
Service Layer (versionado)
   ↓
Edge Function (API)
   ↓
RPC v2
   ↓
PostgreSQL
```

### ✔ Componentes implementados

- RPC v2 optimizada

- Servicio JS versionado

- Dispatcher de versiones

- Edge Function básica

### 📌 Estado funcional

- Sistema listo para producción (nivel medio-alto)

- Backend centralizado

- API escalable

## 5. Glosario de Implementación

### 🔹 RPC (Remote Procedure Call)

Función SQL expuesta como endpoint desde Supabase.

### 🔹 JSONB Aggregation

Uso de:

``` sql
jsonb_build_object
jsonb_agg
```

para construir respuestas estructuradas.

### 🔹 Dispatcher Pattern

Selector dinámico de versión:

```js
profileService.get('v2')
```

### 🔹 Versionado explícito

Estrategia:

```txt
fetch_full_profile_v1
fetch_full_profile_v2
```

### 🔹 Edge Function

Capa backend serverless en Supabase (Deno).

### 🔹 COALESCE

Evita `null` en arrays:

```sql
COALESCE(..., '[]')
```

### 🔹 Subqueries vs Joins

Decisión de usar subqueries para:

- evitar GROUP BY

- mejorar claridad

- reducir errores

### 🔹 Vista de seguridad

`v_profiles_public`:

- protege datos sensibles

- desacopla lógica de acceso

# 🏁 Conclusión General

La sesión representa una evolución clara:

```txt
De:

Frontend complejo + queries anidadas

A:

Arquitectura backend moderna con:

- RPC optimizadas

- versionado

- capa API (Edge Functions)
```

👉 Resultado:

- Mayor escalabilidad

- Mejor performance

- Código más limpio

- Arquitectura profesional