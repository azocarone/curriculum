import { ENV } from './data/envConfig.js';

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
                education(*, education_translations!inner(*)),
                skills(*, skill_translations!inner(*))
            `)
            .eq('profiles_translations.language_code', lang)
            .eq('summaries.summaries_translations.language_code', lang)
            .eq('experiences.experiences_translations.language_code', lang)
            .eq('experiences.responsibilities.responsibilities_translations.language_code', lang)
            .eq('education.education_translations.language_code', lang)
            .eq('skills.skill_translations.language_code', lang)
            .eq('experiences.is_active', true)
            .eq('education.is_active', true)
            .order('start_date', { foreignTable: 'experiences', ascending: false });

        if (error) throw new Error(error.message);
        return data[0];
    }
};