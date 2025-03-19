import * as ui from './uiRenderer.js';

export function applyTranslations(language, cv) {
    const { contact, sections, footer } = cv;
    const { summary, experience, education, skills } = sections

    ui.updateNav(language);
    ui.updateContact(contact);
    
    ui.updateSummary(summary);
    ui.UpdateExperience(experience);
    ui.updateEducation(education);
    ui.updateSkills(skills);
    
    ui.updateFooter(contact.name, footer.label);
};