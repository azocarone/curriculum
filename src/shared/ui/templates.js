import { formatCVDateRange } from '@/shared/domain/cv/cv-date.formatters.js';
import { getContactUrl } from '@shared/utils/contact-helpers';

export function createContactItem(key, label, content) {
    const url = getContactUrl(key, content);

    const contentHtml = url
        ? `<a class="header__contact-link header__contact-link--${key}" href="${url}" target="_blank" rel="noopener noreferrer">${content}</a>`
        : `<span class="header__contact-link header__contact-link--${key} header__contact-text">${content}</span>`;

    return `
        <p class="header__contact-item header__contact-item--${key}">
            <span class="header__contact-label">${label}:</span>
            ${contentHtml}
        </p>
    `;
}

export function createExperienceItemHTML(exp, lang) {
    const dateRange = formatCVDateRange(lang, exp.start_date, exp.end_date);
    
    // Mapeo directo de la propiedad 'description' dentro de cada responsabilidad
    const responsibilities = (exp.responsibilities ?? [])
        .map(res => res.description)
        .filter(Boolean)
        .map(desc => `<li class="main__experience-responsibility-item">${desc}</li>`)
        .join("");

    return `
        <ul class="main__experience-list">
            <li class="main__experience-item">
                <a class="main__experience-info" href="${exp.url || '#'}" target="_blank" rel="noopener noreferrer">
                    <h3 class="main__experience-position">${exp.position ?? ''}</h3>
                    <p class="main__experience-dates">${dateRange}</p>
                    <p class="main__experience-company">${exp.company}</p>
                    <p class="main__experience-location">${exp.location ?? ''}</p>
                </a>
                <ul class="main__experience-responsibilities-list">
                    ${responsibilities}
                </ul>
            </li>
        </ul>
    `;
}

export function createEducationItemHTML(item, lang, slug) {
    const dateRange = formatCVDateRange(lang, item.start_date, item.end_date);
    const showLocation = slug !== 'training' && item.location;

    return `
        <li class="main__section-subitem">
            <a class="main__section-subitem__link" href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">
                <span class="main__section-subitem__title">${item.title ?? ''}: </span>
                <span class="main__section-subitem__institution">${item.institution ?? ''}; </span>
                ${showLocation ? `<span class="main__section-subitem__location">${item.location}; </span>` : ''}
                <span class="main__section-subitem__dates">${dateRange}</span>
            </a>
        </li>
    `;
}