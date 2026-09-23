import * as section from '@modules';
import { renderLayout } from '@shared/ui/layout/layout.render';
import { adaptProfileData } from '@modules/profile/model/profile.adapter';

export function refreshContent(profileData, lang = "es") {
    // Transformación/Sanitización
    const data = adaptProfileData(profileData);

    // Delegación limpia a vistas
    section.renderContact(data.contact, lang);
    section.renderSummary(data.summary, lang);
    section.renderExperience(data.experiences, lang);
    section.renderEducation(data.education, lang);
    section.renderSkills(data.skills, lang);

    // Render layout global
    renderLayout({ lang, author: data.contact.full_name });
};