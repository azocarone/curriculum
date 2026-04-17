import { formatCVDateRange } from '@utils/date-formatters.js';
import { getContactUrl } from '@shared/utils/contact-helpers';

export function createContactItem(key, label, content, sensitiveText) {
    const isSensitive = key === 'phone' || key === 'email';
    const href = getContactUrl(key, content);
    const extraClass = isSensitive ? "js-contact-sensitive" : "";
    const dataAttr = isSensitive ? `data-masked="${content}" data-type="${key}"` : "";
    
    const display = isSensitive 
        ? `<span class="header__contact-content header__contact-content--screen">${sensitiveText}</span>
           <span class="header__contact-content header__contact-content--print">${content}</span>`
        : content;

    return `
        <p class="header__contact-item">
            <span class="header__contact-label">${label}:</span>
            <a class="header__contact-link header__contact-link--${key} ${extraClass}" 
                href="${href}"
                ${!isSensitive ? 'target="_blank" rel="noopener noreferrer"' : ""}
                ${dataAttr}>${display}
            </a>
        </p>
    `;
}

export function createExperienceItemHTML(exp, lang) {
    const trans = exp.experiences_translations?.[0] ?? {};
    const dateRange = formatCVDateRange(lang, exp.start_date, exp.end_date);
    
    const responsibilities = (exp.responsibilities ?? [])
        .map(res => res.responsibilities_translations?.[0]?.description)
        .filter(Boolean)
        .map(desc => `<li class="main__experience-responsibility-item">${desc}</li>`)
        .join("");

    return `
        <ul class="main__experience-list">
            <li class="main__experience-item">
                <a class="main__experience-info" href="${exp.url || '#'}" target="_blank" rel="noopener noreferrer">
                    <h3 class="main__experience-position">${trans.position ?? ''}</h3>
                    <p class="main__experience-dates">${dateRange}</p>
                    <p class="main__experience-company">${exp.company}</p>
                    <p class="main__experience-location">${trans.location ?? ''}</p>
                </a>
                <ul class="main__experience-responsibilities-list">
                    ${responsibilities}
                </ul>
            </li>
        </ul>
    `;
}

export function createEducationItemHTML(item, lang, slug) {
    const t = item.education_translations?.[0] ?? {};
    const dateRange = formatCVDateRange(lang, item.start_date, item.end_date);
    const showLocation = slug !== 'training' && t.location;

    return `
        <li class="main__section-subitem">
            <a class="main__section-subitem__link" href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">
                <span class="main__section-subitem__title">${t.title ?? ''}: </span>
                <span class="main__section-subitem__institution">${t.institution ?? ''}; </span>
                ${showLocation ? `<span class="main__section-subitem__location">${t.location}; </span>` : ''}
                <span class="main__section-subitem__dates">${dateRange}</span>
            </a>
        </li>
    `;
}