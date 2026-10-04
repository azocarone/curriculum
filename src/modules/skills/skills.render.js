import { renderGroupedSection } from '@shared/ui/render-engine';
import { LABELS } from '@shared/i18n/labels';

const SKILL_ORDER = ['ai', 'data', 'development', 'cloud', 'business', 'languages'];

export function renderSkills(skillGroups, lang = "es") {
    if (!skillGroups) return;

    // Obtención segura del idioma con fallback a 'es'
    const selectedLang = LABELS[lang] ? lang : "es";
    const { title = '', categories = {} } = LABELS[selectedLang]?.skills || {};

    // Reordenar grupos según SKILL_ORDER
    const orderedGroups = Object.keys(skillGroups)
        .sort((a, b) => {
            const indexA = SKILL_ORDER.indexOf(a);
            const indexB = SKILL_ORDER.indexOf(b);
            return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
        })
        .reduce((acc, key) => {
            acc[key] = skillGroups[key];
            return acc;
        }, {});

    // Renderizado integrado atómico
    renderGroupedSection(
        "skills",
        orderedGroups,
        categories,
        (list) => {
            if (!Array.isArray(list)) return '';
            return list.map(skill => {
                const name = typeof skill === 'string' ? skill : (skill?.name || '');
                return `<li class="main__section-subitem main__section-subitem--punctuation">${name}</li>`;
            }).join("");
        },
        {
            headingTag: "h3",
            titleClass: "main__section-subtitle",
            wrapperClass: "main__section--skills",
            sectionTitle: title
        }
    );
}