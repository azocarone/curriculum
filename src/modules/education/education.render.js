import { renderGroupedSection } from '@shared/ui/render-engine.js';
import { LABELS } from '@shared/i18n/labels.js';
import * as Templates from '@shared/ui/templates.js';

export function renderEducation(educationGroups, lang = "es") {
    renderGroupedSection(
        "education",
        educationGroups,
        LABELS[lang].education,
        (list, slug) => list.map(item => Templates.createEducationItemHTML(item, lang, slug)).join("")
    )
}