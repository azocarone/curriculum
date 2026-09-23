import { renderGroupedSection } from '@shared/ui/render-engine';
import { LABELS } from '@shared/i18n/labels';

// 1. Definimos la secuencia exacta que deseamos mostrar en la UI
const SKILL_ORDER = ['soft', 'technical', 'languages'];

export function renderSkills(skillGroups, lang = "es") {
    if (!skillGroups) return;

    // 2. Reordenamos las entradas del objeto antes de renderizar
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

    // 3. Renderizamos pasando el objeto ya garantizado en orden
    renderGroupedSection(
        "skills",
        orderedGroups,
        LABELS[lang].skills,
        (list) => list.map(skill => {
            return `<li class="main__section-subitem main__section-subitem--punctuation">${skill.name || ''}</li>`;
        }).join("")
    );
}