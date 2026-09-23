import { LABELS } from '@shared/i18n/labels';

export function renderSummary(summary, lang = "es") {
    const summarySection = document.getElementById("summary");
    if (!summarySection || !summary?.content) return;

    summarySection.innerHTML = `
        <h2 class="main__section-title main__section-title--summary">${LABELS[lang].summary}</h2>
        <p class="main__section-content">${summary.content}</p>
    `;
}