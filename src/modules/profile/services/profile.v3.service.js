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