import { supabase } from '@/utils/supabase-client.js';
import { ENV } from '@/data/env-config';

export const profileServiceV2 = {

    async fetchFullProfile(
        identifier = ENV.DEFAULT_PROFILE_ID,
        lang = ENV.DEFAULT_LANG
    ) {
        const id = Number(identifier);

        if (!Number.isInteger(id)) {
            throw new Error('Identificador de perfil no válido (debe ser un número entero)');
        }

        if (!lang || typeof lang !== 'string') {
            throw new Error('Código de idioma no válido');
        }

        const { data, error } = await supabase.rpc('fetch_full_profile', {
            p_identifier: id,
            p_lang: lang
        });

        if (error) {
            throw new Error(`Error al recuperar el perfil: ${error.message}`);
        }

        const profile = data || {};

        return {
            ...profile,

            educationGroups: this._groupItems(
                profile.education || [],
                'education_types'
            ),

            skillGroups: this._groupItems(
                profile.skills || [],
                'skill_types'
            )
        };
    },

    _groupItems(list, key) {
        if (!Array.isArray(list)) return {};

        return list.reduce((acc, item) => {
            const groupKey =
                item?.[key]?.slug ||
                item?.[key] ||
                'others';

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }

            acc[groupKey].push(item);

            return acc;
        }, {});
    }
};