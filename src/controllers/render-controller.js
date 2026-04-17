import * as CV from '@modules';
import { renderNavbar, renderFooter } from '../ui/components.js';

export function refreshContent(profileData, lang) {
    const profileTranslation = profileData.profiles_translations?.[0];
    const summaryTranslation = profileData.summaries?.[0]?.summaries_translations?.[0];

    // Delega el renderizado al módulo de UI específico
    CV.renderContact(profileData, profileTranslation, lang);
    CV.renderSummary(summaryTranslation, lang);
    CV.renderExperience(profileData.experiences, lang);
    CV.renderEducation(profileData.educationGroups, lang);
    CV.renderSkills(profileData.skillGroups, lang);

    // Renderizado de componentes globales
    renderNavbar(lang);
    renderFooter(profileData.full_name, lang);
};