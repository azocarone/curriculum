import { renderGroupedSection } from '@shared/ui/render-engine';
import { LABELS } from '@shared/i18n/labels';

export function renderSkills(skillGroups, lang = "es") {
    renderGroupedSection(
        "skills",
        skillGroups,
        LABELS[lang].skills,
        (list) => list.map(skill => {
            const t = skill.skill_translations?.[0] ?? {};
            return `<li class="main__section-subitem main__section-subitem--punctuation">${t.name || ''}</li>`;
        }).join("")
    )
}