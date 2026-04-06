import { ENV } from '../data/env-config.js';

const supabaseClient = supabase.createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

export const profileService = {
    async fetchFullProfile(lang = ENV.DEFAULT_LANG) {
        const { data, error } = await supabaseClient
            .from('profiles')
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
            .eq('profiles_translations.language_code', lang)
            .eq('summaries.summaries_translations.language_code', lang)
            .eq('experiences.experiences_translations.language_code', lang)
            .eq('education.education_translations.language_code', lang)
            .eq('skills.skill_translations.language_code', lang)
            .eq('experiences.is_active', true)
            .eq('education.is_active', true)
            .order('start_date', { 
                foreignTable: 'experiences', 
                ascending: false 
            })
            .order('end_date', { 
                foreignTable: 'education', 
                ascending: false, 
                nullsFirst: true 
            });

        if (error) throw new Error(error.message);

        const profile = data[0];

        // Retorna el perfil con los datos agrupados por el "SLUG".
        return {
            ...profile,
            educationGroups: this._groupItems(profile.education, 'education_types'),
            skillGroups: this._groupItems(profile.skills, 'skill_types')
        };
    },

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