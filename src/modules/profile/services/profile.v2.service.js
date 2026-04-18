import { supabase } from '@core/api/supabase-client.js';
import { ENV } from '@core/config/env.js';
import { groupBy } from '@shared/domain/group-by.js';

export const profileServiceV2 = {

    async fetchFullProfile(
        identifier = ENV.DEFAULT_PROFILE_ID,
        lang = ENV.DEFAULT_LANG
    ) {
        const id = Number(identifier);

        if (!Number.isInteger(id)) 
            throw new Error('Identificador de perfil no válido (debe ser un número entero)');

        if (!lang || typeof lang !== 'string') 
            throw new Error('Código de idioma no válido');

        const { data, error } = await supabase.rpc('fetch_full_profile', {
            p_identifier: id,
            p_lang: lang
        });

        if (error) throw new Error(`Error al recuperar el perfil: ${error.message}`);

        const profile = data || {};

        return {
            ...profile,
            educationGroups: groupBy(profile.education || [], 'education_types'),
            skillGroups: groupBy(profile.skills || [], 'skill_types')
        }
    }
}