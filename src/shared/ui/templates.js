import { formatCVDateRange } from '@/shared/domain/cv/cv-date.formatters.js';
import { getContactUrl } from '@shared/utils/contact-helpers';

export function createContactItem(key, label, content) {
    const url = getContactUrl(key, content);

    const contentHtml = url
        ? `<a class="header__contact-link header__contact-link--${key}" href="${url}" target="_blank" rel="noopener noreferrer">${content}</a>`
        : `<span class="header__contact-link header__contact-link--${key} header__contact-text">${content}</span>`;

    return `
        <li class="header__contact-item header__contact-item--${key}">
            <span class="header__contact-label">${label}:</span>${contentHtml}
        </li>
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
                    <p class="main__experience-company">${exp.company}</p>
                    <time class="main__experience-dates" datetime="2010-01">${dateRange}</time>
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

    // Genera los badges superiores (ej. Grado, CIV, Posgrado)
    const topBadgesHTML = (item.top_badges || [])
        .map(badge => `<span class="main__section-subitem__tag">${badge}</span>`)
        .join('');

    // Genera los badges inferiores (ej. 500 hrs, Vigente)
    const bottomBadgesHTML = (item.bottom_badges || [])
        .map(badge => `<span class="main__section-subitem__tag">${badge}</span>`)
        .join('');

    return `
        <li class="main__section-subitem">
            <a class="main__section-subitem__link" href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">
                
                <!-- Fila Superior: Título + Badges a la derecha en pantalla / en flujo continuo en impresión -->
                <div class="main__section-subitem__row">
                    <div class="main__section-subitem__info">
                        <h3 class="main__section-subitem__title">${item.title ?? ''}</h3>
                        ${topBadgesHTML ? `<div class="main__section-subitem__tags-group">${topBadgesHTML}</div>` : ''}
                        <p class="main__section-subitem__institution">${item.institution ?? ''}</p>
                    </div>
                </div>

                <!-- Fila Inferior: Fechas + Badges inferiores -->
                <div class="main__section-subitem__row main__section-subitem__row--bottom">
                    <div class="main__section-subitem__meta">
                        <p class="main__section-subitem__dates">${dateRange}</p>
                    </div>
                    ${bottomBadgesHTML ? `<div class="main__section-subitem__tags-group">${bottomBadgesHTML}</div>` : ''}
                </div>

            </a>
        </li>
    `;
}