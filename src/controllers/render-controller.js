import * as section from '@modules';
import { renderNavbar, renderFooter } from '../ui/components.js';
import { adaptProfileData } from '@modules/profile/model/profile.adapter';

export function refreshContent(profileData, lang) {
    const data = adaptProfileData(profileData);

    // Render principal
    section.renderContact(data.contact.profile, data.contact.translation, lang);
    section.renderSummary(data.summary, lang);
    section.renderExperience(data.experiences, lang);
    section.renderEducation(data.education, lang);
    section.renderSkills(data.skills, lang);

    // UI global
    renderNavbar(lang);
    renderFooter(data.profile.full_name, lang);
};