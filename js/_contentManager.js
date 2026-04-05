import * as ui from './uiRenderer.js';

export function applyTranslations(language, content) {
    const { nav, contact, sections, footer } = content;
    const { summary, experience, education, skills } = sections;

    ui.updateNav(nav);
    ui.updateContact(language, contact);
    
    ui.updateSummary(summary);
    ui.updateExperience(language, experience);
    ui.updateEducation(language, education);
    ui.updateSkills(skills);
    
    ui.updateFooter(contact.name, footer.label);
};