// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"

/*console.log("Hello from Functions!")

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})*/

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // 1. Extraer headers de seguridad
  const authHeader = req.headers.get('Authorization')
  const apiKey = req.headers.get('apikey')

  console.log("Procesando petición con lógica híbrida...")

  try {
    const { name } = await req.json()

    // 2. Lógica de respuesta basada en el contexto
    // Aquí puedes personalizar la respuesta si el usuario está autenticado o no
    const responseData = {
      message: `¡Hola, ${name || 'Usuario'}!`,
      context: "Seguridad JWT activa en Gateway",
      platform: "Fedora Workstation / Podman"
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Petición mal formada" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }
})
