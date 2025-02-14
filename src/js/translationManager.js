import * as ui from './uiRenderer.js';

export function applyTranslations(language, cv) {
    ui.updateNavigationMenu(language);
    ui.updateHeader(cv.profile);
    ui.updateExperience(cv.sections.experience);
    ui.updateEducation(cv.sections.education);
    ui.updateSkills(cv.sections.skills);
    ui.updateFooter(cv.sections.footer, cv.profile.name)
};