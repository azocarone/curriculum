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