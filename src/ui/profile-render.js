import { LABELS } from '../data/lbl-config.js';
import * as Utils from '../utils/contact-helpers.js';
import * as Templates from './templates.js';
import { renderGroupedSection } from './render-engine.js';

export const CV = {
    renderContact(profile, trans, lang = "es") {
        const headerContact = document.getElementById("contact");
        if (!headerContact || !profile || !trans) return;

        const fields = Utils.prepareContactFields(profile, trans, LABELS, lang);
        const sensitiveText = lang === "es" ? "Haga clic para ver" : "Click to view";

        const htmlContent = fields
            .map(f => Templates.createContactItem(f.key, f.label, f.content, sensitiveText))
            .join("");

        headerContact.innerHTML = `
            <h1 class="header__name">${profile.full_name}</h1>
            <address class="header__contact-address">${htmlContent}</address>
        `;

        Utils.initContactListeners(headerContact);
    },

    renderSummary(trans, lang = "es") {
        const summarySection = document.getElementById("summary");
        if (!summarySection || !trans?.content) return;

        summarySection.innerHTML = `
            <h2 class="main__section-title main__section-title--summary">${LABELS[lang].summary}</h2>
            <p class="main__section-content">${trans.content}</p>
        `;
    },

    renderExperience(experiences, lang = "es") {
        const experienceSection = document.getElementById("experience");
        if (!experienceSection || !Array.isArray(experiences)) return;

        const htmlContent = experiences
            .map(exp => Templates.createExperienceItemHTML(exp, lang))
            .join("");

        experienceSection.innerHTML = `
            <h2 class="main__section-title main__section-title--experience">${LABELS[lang].experience}</h2>
            ${htmlContent}
        `;
    },

    renderEducation(educationGroups, lang = "es") {
        renderGroupedSection(
            "education", 
            educationGroups, 
            LABELS[lang].education,
            (list, slug) => list.map(item => Templates.createEducationItemHTML(item, lang, slug)).join("")
        );
    },

    renderSkills(skillGroups, lang = "es") {
        renderGroupedSection(
            "skills", 
            skillGroups, 
            LABELS[lang].skills,
            (list) => list.map(skill => {
                const t = skill.skill_translations?.[0] ?? {};
                return `<li class="main__section-subitem main__section-subitem--punctuation">${t.name || ''}</li>`;
            }).join("")
        );
    }
};