# Estrategias de Ciberseguridad y Privacidad mediante Ofuscación en el Servidor

Entiendo perfectamente el desafío. Como experto en ciberseguridad y programador senior, veo que te encuentras en un punto crítico: tienes una medida de "seguridad por oscuridad" (Base64), pero el flujo de datos sigue siendo vulnerable porque la lógica de decodificación ocurre en el cliente (el navegador) y los datos originales viajan, tarde o temprano, de forma íntegra.

Lo que buscas es un equilibrio entre UX (experiencia de usuario) y Protección de Datos Personales (PII). Aquí tienes mi análisis y las recomendaciones tácticas para tu stack de Vanilla JS y Supabase:

## El diagnóstico: El problema de btoa() y atob()

El uso de Base64 no es cifrado, es codificación.

- **Vulnerabilidad**: Cualquier persona con conocimientos mínimos de consola de desarrollador (F12) puede ver el tráfico de red de la API de Supabase, capturar el string y usar atob() manualmente.

- **Principio de Privacidad**: Si el dato llega al navegador, ya se considera "expuesto", aunque no esté renderizado en el HTML.

## Estrategia de Arquitectura: "Never Trust the Client"

Para solucionar esto de forma profesional, debemos mover la lógica de "decisión" al servidor (Edge Functions) o usar técnicas de enmascaramiento dinámico.

**A. Uso de Supabase Edge Functions (La opción más segura)**

En lugar de consultar la tabla directamente desde JavaScript Vanilla, crea una Edge Function en Supabase (escrita en TypeScript/Deno).

- **Lógica**: La función recibe la solicitud del usuario.

- **Procesamiento**: Si el usuario solo está "viendo" el perfil, la función devuelve los datos ofuscados (ej. e******@gmail.com).

- **Acción específica**: Solo cuando el usuario hace clic en "Imprimir" o "Contactar", se realiza una petición firmada a la Edge Function para obtener el dato real.

**B. Vistas de Base de Datos (Database Views)**

Puedes crear una Vista en PostgreSQL (dentro de Supabase) que automáticamente entregue los datos ofuscados por defecto.

``` SQL
CREATE VIEW cv_publico AS
SELECT 
  id,
  nombre,
  -- Ofuscación básica en SQL
  substring(email from 1 for 2) || '*****' || substring(email from position('@' in email)) as email_masked,
  '*******' || right(telefono, 4) as telefono_masked
FROM perfiles;
```

Esto asegura que, aunque alguien intercepte la respuesta de la API de la vista, el dato real nunca salió de la base de datos.

## Implementación en JavaScript Vanilla

Para la parte del frontend, te sugiero cambiar el flujo de atob() por un modelo de "Carga bajo demanda".

**Paso 1: Enmascaramiento visual**

No renderices el dato real en el innerText del HTML al cargar la página. Usa un placeholder.

``` HTML
<p id="email-field">e*******@dominio.com</p>
<button id="btn-revelar">Mostrar contacto</button>
```

**Paso 2: Intercepción de eventos**

Cuando el usuario quiera imprimir o usar WhatsApp, dispara una función que busque el dato real.

``` JavaScript
// Ejemplo de lógica para WhatsApp
async function handleWhatsApp() {
    // 1. Solo en este momento pides el dato real a Supabase (vía Edge Function o RPC)
    const { data, error } = await supabase.rpc('get_secure_contact', { user_id: '123' });

    if (data) {
        window.location.href = `https://wa.me/${data.phone}`;
    }
}
```

## Librerías recomendadas (vía NPM/CDN)

Dado que usas Vanilla JS, no necesitas un framework pesado, pero estas librerías te ayudarán:

- **DOMPurify**: Si vas a insertar datos que vienen de la base de datos en tu HTML, úsala para evitar ataques XSS.

- **Crypto-JS**: Si realmente necesitas persistir algo en el cliente de forma "segura", podrías usar cifrado AES con una clave que no sea trivial, aunque lo ideal es que el secreto no viva en el JS del cliente.

- **jsPDF**: Para la parte de "Imprimir", esta librería te permite generar el PDF en el cliente. Puedes pasarle los datos reales solo en el momento de la generación y limpiar la memoria después.

## Resumen de consejos de "Senior"

- **Row Level Security (RLS)**: Asegúrate de que tus políticas de RLS en Supabase sean estrictas. Nadie debería poder consultar correos de otros usuarios a menos que sea el dueño o tenga un permiso específico.

- **Eventos de impresión**: Usa el evento de CSS @media print para ocultar los placeholders y mostrar los campos reales solo cuando se active el diálogo de impresión (inyectando el dato justo antes de window.print()).

- **Ofuscación Real**: En lugar de btoa, usa enmascaramiento parcial desde la base de datos. Es más elegante y cumple mejor con estándares de seguridad.

> Implementar una Edge Function es la forma más profesional de manejar esto, porque actúas en el "lado del servidor". La lógica de descifrado o revelación no está expuesta en tu archivo .js de cliente, sino protegida en el entorno de Supabase.

Aquí tienes la arquitectura y el código para lograrlo:

## El concepto: El "Portero" de datos

En lugar de que tu frontend hable con la base de datos directamente para obtener el email, hablará con la Edge Function.

- Si el usuario solo carga la página: La función devuelve u*******@email.com.

- Si el usuario hace clic en "Revelar": La función verifica la sesión y devuelve el dato real.

## Código de la Edge Function (Deno/TypeScript)

Dentro de tu carpeta de Supabase (supabase/functions/get-profile/index.ts), definirías algo como esto:

``` TypeScript

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { userId, reveal } = await req.json()

  // 1. Configurar cliente administrativo de Supabase (Service Role)
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 2. Consultar el perfil
  const { data, error } = await supabaseAdmin
    .from('curriculums')
    .select('email, telefono')
    .eq('user_id', userId)
    .single()

  if (!data) return new Response("Not found", { status: 404 })

  // 3. Lógica de ofuscación
  if (!reveal) {
    return new Response(
      JSON.stringify({
        email: data.email.replace(/(.{2})(.*)(?=@)/, "$1******"),
        telefono: `******${data.telefono.slice(-4)}`
      }),
      { headers: { "Content-Type": "application/json" } }
    )
  }

  // 4. Si reveal es true, enviamos el dato real
  return new Response(
    JSON.stringify({ email: data.email, telefono: data.telefono }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

## Implementación en JavaScript Vanilla

En tu frontend, manejarás la carga y la acción de "imprimir/contactar" de forma separada.

**Carga inicial (Datos ofuscados)**

``` JavaScript
async function cargarDatosProtegidos() {
  const { data, error } = await supabase.functions.invoke('get-profile', {
    body: { userId: 'tu-uuid-aqui', reveal: false }
  });

  if (data) {
    document.getElementById('email-display').innerText = data.email;
  }
}
```

**Acción de Revelar (Para imprimir o WhatsApp)**

``` JavaScript
async function prepararParaAccion() {
  const { data, error } = await supabase.functions.invoke('get-profile', {
    body: { userId: 'tu-uuid-aqui', reveal: true }
  });

  if (data) {
    // Aquí ya tienes el dato real para inyectar en el enlace de WhatsApp
    // o para colocarlo en el CV justo antes de window.print()
    const waLink = `https://wa.me/${data.telefono}`;
    window.open(waLink, '_blank');
  }
}
```

## Por qué esto es superior a btoa()

- **Invisible al Inspector**: Si un atacante mira la pestaña "Network" de su navegador al cargar la página, solo verá el email ya ofuscado (u*******@email.com). No hay forma de "decodificarlo" porque el resto del string nunca salió del servidor.

- **Control de Acceso**: Puedes añadir una validación en la Edge Function para que solo entregue el dato real si el usuario tiene una sesión activa (req.headers.get('Authorization')).

- **Registro de Auditoría**: Podrías programar la función para que guarde un log cada vez que alguien solicita "revelar" los datos, algo imposible de rastrear si usas atob().

**Un detalle importante para tu impresión**

Para el caso de la impresión, te sugiero usar este truco de CSS:

``` CSS
@media print {
    #email-display {
        display: block !important;
    }
    .no-print {
        display: none;
    }
}
```

Inyectas el dato real en el DOM solo cuando el usuario confirma que va a imprimir, y lo limpias inmediatamente después para que no se quede ahí si el usuario sigue navegando.