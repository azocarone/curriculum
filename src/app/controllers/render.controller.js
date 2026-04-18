import * as section from '@modules';
import { renderLayout } from '@shared/ui/layout/layout.render';
import { adaptProfileData } from '@modules/profile/model/profile.adapter';

export function refreshContent(profileData, lang) {
    const data = adaptProfileData(profileData);

    // Render principal
    section.renderContact(data.contact.profile, data.contact.translation, lang);
    section.renderSummary(data.summary, lang);
    section.renderExperience(data.experiences, lang);
    section.renderEducation(data.education, lang);
    section.renderSkills(data.skills, lang);

    // Render layout global
    renderLayout({ lang, author: data.profile.full_name });
};