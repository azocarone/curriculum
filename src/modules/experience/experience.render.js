import * as Templates from '@shared/ui/templates.js';
import { LABELS } from '@shared/i18n/labels.js';

export function renderExperience(experiences, lang = "es") {
    const experienceSection = document.getElementById("experience");
    if (!experienceSection || !Array.isArray(experiences)) return;

    const htmlContent = experiences
        .map(exp => Templates.createExperienceItemHTML(exp, lang))
        .join("");

    experienceSection.innerHTML = `
        <h2 class="main__section-title main__section-title--experience">${LABELS[lang].experience}</h2>
        ${htmlContent}
    `;
}