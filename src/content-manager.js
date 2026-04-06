import { CV } from './ui/cv-render.js';
import { renderNavbar, renderFooter } from './ui/components.js';

export function applyTranslations(profileData, lang) {
    const profileTranslation = profileData.profiles_translations?.[0];
    const summaryTranslation = profileData.summaries?.[0]?.summaries_translations?.[0];

    CV.renderContact(profileData, profileTranslation, lang);
    CV.renderSummary(summaryTranslation, lang);
    CV.renderExperience(profileData.experiences, lang);
    CV.renderEducation(profileData.educationGroups, lang);
    CV.renderSkills(profileData.skillGroups, lang);

    renderNavbar(lang);
    renderFooter(profileData.full_name, lang);
};