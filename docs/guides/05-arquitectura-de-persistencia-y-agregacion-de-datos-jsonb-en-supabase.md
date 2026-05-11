# 🧠 Arquitectura de Persistencia y Agregación de Datos JSONB en Supabase

## 📌 Resumen Ejecutivo

Este documento describe la migración completa desde:

- Supabase Query Builder con joins anidados ❌  

hacia:  

- Arquitectura RPC optimizada con PostgreSQL JSONB ✅  

El objetivo es:

✔ reducir complejidad en frontend  
✔ centralizar lógica en base de datos  
✔ mejorar performance  
✔ evitar errores de joins  
✔ implementar versionado de API  

## 🏗️ Arquitectura del Sistema

### 🔄 Flujo final

```
Frontend (JavaScript / React)
↓
profileService.fetchFullProfile()
↓
Supabase RPC Layer (v1 / v2)
↓
PostgreSQL JSONB Aggregation Engine
↓
Structured JSON Response
```

## 🧩 Modelo de Datos

### 📦 Entidades principales

- profiles
- profiles_contact
- summaries
- experiences
- responsibilities
- education
- skills

### 🌐 Sistema de traducciones

Cada entidad soporta multilanguage:

- *_translations
- language_code filtering

Ejemplo:

- experiences_translations
- education_translations
- skill_translations

## 🔐 Vista de Seguridad

### v_profiles_public

Se usa para proteger datos sensibles:

```sql
CREATE VIEW v_profiles_public AS
SELECT
    p.id,
    p.full_name,

    CASE 
        WHEN pc.phone IS NOT NULL THEN '******' || right(pc.phone, 4)
        ELSE 'No disponible'
    END AS phone,

    CASE 
        WHEN pc.email IS NOT NULL THEN
            left(pc.email, 1) || '****@' || split_part(pc.email, '@', 2)
        ELSE 'No disponible'
    END AS email,

    p.website
FROM profiles p
LEFT JOIN profiles_contact pc ON p.id = pc.profile_id;
```

## 🚀 Migración a RPC

### ❌ Antes (Query Builder)

```javascript
supabase
  .from('v_profiles_public')
  .select(`
    *,
    experiences(...),
    education(...),
    skills(...)
  `)
  .eq('id', id);
```

### ✅ Después (RPC)

```javascript
const { data, error } = await supabase.rpc('fetch_full_profile_v1', {
  p_identifier: id,
  p_lang: lang
});
```

## ⚙️ Estrategia RPC

### Principios técnicos

- SQL puro (language sql)
- JSONB aggregation
- COALESCE para evitar null arrays
- Filtros por language_code
- Subqueries por entidad

### 🔧 Funciones clave

jsonb_build_object()
jsonb_agg()
COALESCE(..., '[]')

## ⚠️ Problemas Reales Encontrados

### ❌ UUID vs INTEGER mismatch

`invalid input syntax for type uuid: "1"`

**✔ Solución**

```sql
p_identifier INTEGER
```

### ❌ ORDER BY en jsonb_agg

`column must appear in GROUP BY`

**✔ Solución correcta**

```sql
jsonb_agg(... ORDER BY e.start_date DESC)
```

---

### ❌ Columnas inexistentes

`education_type_id does not exist`

**✔ Corrección real**

```sql
education.type_id
skills.type_id
```

---

### ❌ Function Overload Conflict

`Could not choose best candidate function`

**✔ Causa**

```sql
fetch_full_profile(integer, text)
fetch_full_profile(uuid, text)
```

**✔ Solución**

```sql
DROP FUNCTION fetch_full_profile(uuid, text);`
```

## 🔢 Versionado de RPC (BEST PRACTICE)

### ❌ Evitar

`fetch_full_profile (overloaded)`

### ✅ Implementar

| Versión |	Estado | Uso |
| --- | --- | --- |
| v1  |	Estable |	Producción |
| v2  |	Experimental |	Evolución |
| v3+ |	Futuro | Extensiones |

### 🧠 Ejemplo

```javascript
fetch_full_profile_v1
fetch_full_profile_v2
``` 

## 🧠 SQL vs PL/pgSQL

### 🟢 SQL puro

✔ SELECT
✔ JSON aggregation
✔ performance alta
✔ ideal para RPC

### 🔧 PL/pgSQL

✔ lógica condicional
✔ variables
✔ validaciones
✔ transacciones

### 🎯 Regla clave

```
SQL → READ (consultas)
PL/pgSQL → LOGIC (negocio)
```

## 🧪 Capa JavaScript (Frontend)

### Servicio final

```javascript
export const profileService = {

  async fetchFullProfile(id, lang, version = 'v1') {
    const rpcName = `fetch_full_profile_${version}`;

    const { data, error } = await supabase.rpc(rpcName, {
      p_identifier: Number(id),
      p_lang: lang
    });

    if (error) throw new Error(error.message);

    return {
      ...data,
      educationGroups: this._groupItems(data.education, 'education_types'),
      skillGroups: this._groupItems(data.skills, 'skill_types')
    };
  },

  _groupItems(list, key) {
    return (list || []).reduce((acc, item) => {
      const group = item?.[key]?.slug || 'others';
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  }
};
```

## 🧱 Agrupación de datos

### Lógica

- educationGroups → por education_types.slug
- skillGroups → por skill_types.slug

## 🧭 Arquitectura Final

```
Frontend
   ↓
Service Layer (JS)
   ↓
Supabase RPC (v1/v2)
   ↓
PostgreSQL JSONB Engine
   ↓
Structured API Response
```

## 🧼 Buenas Prácticas

### Backend

- usar SQL puro para lectura
- evitar overload de funciones
- usar versionado explícito
- usar vistas para seguridad
- usar COALESCE

### Frontend

- validar tipos (Number)
- manejar errores RPC
- mantener lógica mínima
- evitar joins complejos

## 🚨 Checklist de errores comunes

- UUID vs INTEGER mismatch
- ORDER BY fuera de jsonb_agg
- columnas inexistentes
- funciones duplicadas
- joins incorrectos
- traducciones sin filtro

## 📌 Lecciones clave

### 🔥 Arquitectura

RPC elimina complejidad del frontend.

### 🔥 Performance

JSONB aggregation reduce múltiples queries.

### 🔥 Escalabilidad

Versionado permite evolución sin romper producción.

### 🔥 Seguridad

Vista protege datos sensibles.

## 🏁 Conclusión

Se evoluciona de:

`Frontend complejo + múltiples joins`

a:

`RPC versionado + JSON estructurado + frontend limpio`

### 🚀 Resultado final

✔ menos código en frontend
✔ backend centralizado
✔ arquitectura escalable
✔ API versionada
✔ performance optimizada