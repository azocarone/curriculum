import { supabase } from '@core/api/supabase-client.js';
import { ENV } from '@core/config/env';
import { groupItems } from '@/utils/group-items.js';

export const profileServiceV1 = {
    // Rutas que necesitan traducción como una "constante de configuración" interna
    _TRANSLATABLE_PATHS: [
        'profiles_translations',
        'summaries.summaries_translations',
        'experiences.experiences_translations',
        'experiences.responsibilities.responsibilities_translations',
        'education.education_translations',
        'skills.skill_translations'
    ],

    async fetchFullProfile(
        identifier = ENV.DEFAULT_PROFILE_ID,
        lang = ENV.DEFAULT_LANG
    ) {
        // Iniciación de la query
        let query = supabase
            .from('v_profiles_public')
            .select(`
                *,
                profiles_translations!inner(*),
                summaries(*, summaries_translations!inner(*)),
                experiences(
                    *,
                    experiences_translations!inner(*),
                    responsibilities(*, responsibilities_translations!inner(*))
                ),
                education(
                    *,
                    education_translations!inner(*),
                    education_types!inner(slug)
                ),
                skills(
                    *,
                    skill_translations!inner(*),
                    skill_types!inner(slug)
                )
            `)
            .eq('id', identifier);

        // Aplicación de los filtros de idioma dinámicamente
        query = this._applyLanguageFilters(query, lang);

        // Aplicación de los filtros de estado y ordenamiento
        const { data, error } = await query
            .eq('experiences.is_active', true)
            .eq('education.is_active', true)
            .order('start_date', { foreignTable: 'experiences', ascending: false })
            .order('end_date', { foreignTable: 'education', ascending: false, nullsFirst: true })
            .single();

        if (error) throw new Error(`Error al recuperar el perfil: ${error.message}`);

        return {
            ...data,
            educationGroups: groupItems(data.education || [], 'education_types'),
            skillGroups: groupItems(data.skills || [], 'skill_types')
        };
    },

    // Aplica el filtro de código de idioma a todas las rutas definidas.
    _applyLanguageFilters(query, lang) {
        this._TRANSLATABLE_PATHS.forEach(path => {
            query = query.eq(`${path}.language_code`, lang);
        });
        return query;
    }
}