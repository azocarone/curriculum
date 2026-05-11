# Edge Function para RPC Supabase

Para integrar tu función RPC existente en una **Edge Function** dentro de tu entorno de Fedora con Podman y Fish, seguiremos un flujo que traslada la lógica de tu `profile.v2.service.js` hacia el "borde" (Edge).

Esto te permitirá centralizar la lógica de negocio (como el agrupamiento de datos) y reducir la carga en el cliente.

## 1. Crear la Edge Function

Desde tu terminal Fish, dentro de la raíz de tu proyecto Supabase, ejecuta:

```bash
supabase functions new get-profile
```

Como utilizas Fedora, recuerda aplicar inmediatamente los permisos de **SELinux** a la nueva carpeta para evitar errores de "Permission Denied" en Podman:

```bash
sudo chcon -Rt svirt_sandbox_file_t (pwd)
```

## 2. Implementación de la Función (Deno + TypeScript)

Sustituye el contenido de `supabase/functions/get-profile/index.ts` con el siguiente código. Aquí integraremos la llamada a la RPC y la lógica de `groupBy` que ya tenías en JavaScript:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// 1. Definir cabeceras CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const groupBy = (array: any[], key: string) => {
    return array.reduce((result, currentValue) => {
        const groupKey = currentValue[key]?.slug || 'others';
        (result[groupKey] = result[groupKey] || []).push(currentValue);
        return result;
    }, {});
};

serve(async (req) => {
    // 2. Manejar la petición OPTIONS (Preflight)
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )

        const { identifier, lang } = await req.json()
        const id = Number(identifier)

        if (!Number.isInteger(id)) throw new Error('ID no válido')

        const { data, error } = await supabase.rpc('fetch_full_profile', {
            p_identifier: id,
            p_lang: lang || 'es'
        })

        if (error) throw error

        const profile = data || {}
        const responseData = {
            ...profile,
            educationGroups: groupBy(profile.education || [], 'education_types'),
            skillGroups: groupBy(profile.skills || [], 'skill_types')
        }

        // 3. Incluir corsHeaders en la respuesta exitosa
        return new Response(JSON.stringify(responseData), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200
        })

    } catch (err) {
        // 4. Incluir corsHeaders en la respuesta de error
        return new Response(JSON.stringify({ error: err.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        })
    }
})
```

## 3. Configuración de Secretos y Ejecución Local

Para que la función pueda conectarse a la base de datos (local o remota), debes asegurarte de que las variables de entorno estén disponibles.

**En local (Podman):**
Crea o edita `supabase/functions/.env` con tus credenciales y arranca el servicio:

```bash
# Servir con carga de secretos
supabase functions serve get-profile --env-file supabase/functions/.env --no-verify-jwt
```

**Para despliegue (Producción):**
Sincroniza los secretos con la nube de Supabase:

```bash
supabase secrets set --env-file supabase/functions/.env --project-ref tu_id_proyecto
supabase functions deploy get-profile --project-ref tu_id_proyecto
```

## 4. Actualización del Cliente (Frontend)

Ahora, basado en `profile.v2.service.js`, se crea la `profile.v3.service.js` para que, en lugar de llamar directamente a la RPC, invoque la **Edge Function**. Esto desacopla el frontend de la estructura interna de la base de datos.

```javascript
import { supabase } from '@core/api/supabase-client.js';
import { ENV } from '@core/config/env.js';

export const profileServiceV3 = {

    async fetchFullProfile(
        identifier = ENV.DEFAULT_PROFILE_ID,
        lang = ENV.DEFAULT_LANG
    ) {
        const id = Number(identifier);

        if (!Number.isInteger(id)) 
            throw new Error('Identificador de perfil no válido (debe ser un número entero)');

        if (!lang || typeof lang !== 'string') 
            throw new Error('Código de idioma no válido');

        const { data, error } = await supabase.functions.invoke('get-profile', {
            body: { 
                identifier: Number(identifier), 
                lang: lang 
            }
        });

        if (error) throw new Error(`Error en Edge Function: ${error.message}`);

        const profile = data || {};

        return {
            ...profile,
            //educationGroups: groupBy(profile.education || [], 'education_types'),
            //skillGroups: groupBy(profile.skills || [], 'skill_types')
        }
    }
}
```

### Ventajas de este enfoque:

- **Seguridad**: El cliente no conoce el nombre de la función SQL `fetch_full_profile`.

- **Rendimiento**: El agrupamiento de datos (`groupBy`) ocurre en el servidor de Deno, entregando un JSON ya listo para ser renderizado por el frontend.

- **Mantenibilidad**: Si decides cambiar la estructura de la base de datos, solo actualizas la Edge Function sin tocar el código del frontend.

## Resumen de Incidencias: Edge Function `get-profile`

Aquí un resumen ejecutivo de los incidentes técnicos encontrados, su origen y las soluciones aplicadas para estabilizar la Edge Function `get-profile`.

### 1. Error de CORS (Cross-Origin Resource Sharing)

- **Problema:** El navegador bloqueaba la respuesta de la función mostrando el error `CORS Missing Allow Origin`.

- **Causa:** Las Edge Functions no permiten peticiones desde un dominio distinto (tu app web) a menos que se maneje explícitamente el "apretón de manos" (handshake) inicial.

- **Resolución:** 

    - Se implementó un objeto `corsHeaders` con las políticas de acceso.
    
    - Se añadió una validación al inicio de la función para responder inmediatamente a las peticiones de tipo `OPTIONS` (Preflight).
    
    - Se aseguró que tanto las respuestas exitosas como los bloques de error (`catch`) incluyan los encabezados CORS.

### 2. Error 401: Formato de JWT Inválido

- **Problema:** Una vez resuelto el CORS, la función devolvía un `HTTP 401 Unauthorized` con el mensaje `UNAUTHORIZED_INVALID_JWT_FORMAT`.

- **Causa:** Por defecto, las funciones de Supabase intentan validar el token de autorización como un **JWT de sesión de usuario**. Como el frontend enviaba la `anon_key` en lugar de un token de login activo, el "guardián" de Supabase rechazaba la petición antes de que llegara a tu código.

- **Resolución:** Se desplegó la función utilizando el flag `--no-verify-jwt`. Esto traslada la responsabilidad de la seguridad al código interno de la función, permitiendo peticiones tanto de usuarios logueados como de invitados (dependiendo de la lógica del RPC).

### 3. Restricción de Variables de Entorno (Secrets)

- **Problema:** Al intentar actualizar las credenciales con `supabase secrets set`, el CLI devolvía el error: `Env name cannot start with SUPABASE_`.

- **Causa:** Supabase reserva el prefijo `SUPABASE_` para variables gestionadas por el sistema. El sistema prohíbe que el usuario las sobrescriba manualmente mediante el comando `secrets`.

- **Resolución:** Se aclaró que no es necesario subirlas manualmente. Las variables `SUPABASE_URL` y `SUPABASE_ANON_KEY` se inyectan automáticamente en el entorno de ejecución de la nube, por lo que basta con invocarlas mediante `Deno.env.get()`.

### 4. Visibilidad de Errores Reales

- **Problema:** El navegador reportaba errores genéricos de red o CORS, ocultando el error real del servidor.

- **Causa:** Cuando la función fallaba en el bloque `try/catch` y devolvía un código 400 sin los encabezados de CORS, el navegador descartaba el cuerpo del error por seguridad.

- **Resolución:** Se estandarizó la respuesta del bloque `catch` para que siempre devuelva un JSON con el mensaje de error y los encabezados CORS, permitiendo depurar problemas directamente en la consola del navegador.

---

### Estado Actual de la Solución

La función ahora es **accesible**, maneja correctamente los **permisos del navegador** y utiliza las **credenciales automáticas** de Supabase para comunicarse de forma segura con la base de datos a través del RPC `fetch_full_profile`.

> **Nota de Seguridad:** Al haber desactivado la verificación automática de JWT (`--no-verify-jwt`), la seguridad ahora reside en la lógica de tu función PostgreSQL y en que el cliente debe poseer al menos la `anon_key` del proyecto para realizar la invocación.