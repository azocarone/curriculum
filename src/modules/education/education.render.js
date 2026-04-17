import { renderGroupedSection } from '@shared/ui/render-engine';
import { LABELS } from '@shared/i18n/labels';
import * as Templates from '@shared/ui/templates';

export function renderEducation(educationGroups, lang = "es") {
    renderGroupedSection(
        "education",
        educationGroups,
        LABELS[lang].education,
        (list, slug) => list.map(item => Templates.createEducationItemHTML(item, lang, slug)).join("")
    )
}