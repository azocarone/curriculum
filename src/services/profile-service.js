import { supabase } from '../utils/supabase-client.js';
import { ENV } from '../data/env-config.js';

export const profileService = {
    async fetchFullProfile(identifier = ENV.DEFAULT_PROFILE_ID, lang = ENV.DEFAULT_LANG) {
        const { data, error } = await supabase
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
            .eq('id', identifier)
            .eq('profiles_translations.language_code', lang)
            .eq('summaries.summaries_translations.language_code', lang)
            .eq('experiences.experiences_translations.language_code', lang)
            .eq('experiences.responsibilities.responsibilities_translations.language_code', lang)
            .eq('education.education_translations.language_code', lang)
            .eq('skills.skill_translations.language_code', lang)
            .eq('experiences.is_active', true)
            .eq('education.is_active', true)
            .order('start_date', { foreignTable: 'experiences', ascending: false })
            .order('end_date', { foreignTable: 'education', ascending: false, nullsFirst: true })
            .single();

        if (error) throw new Error(`Error al recuperar el perfil: ${error.message}`);

        // Transformamos los datos antes de enviarlos al controlador
        return {
            ...data,
            educationGroups: this._groupItems(data.education, 'education_types'),
            skillGroups: this._groupItems(data.skills, 'skill_types')
        };
    },

    /**
     * Agrupa elementos dinámicamente según un slug de categoría.
     * Útil para separar habilidades (frontend/backend) o grados académicos.
     */
    _groupItems(list, typeKey) {
        if (!list) return {};
        return list.reduce((acc, item) => {
            const slug = item[typeKey]?.slug || 'others';
            if (!acc[slug]) acc[slug] = [];
            acc[slug].push(item);
            return acc;
        }, {});
    }
};