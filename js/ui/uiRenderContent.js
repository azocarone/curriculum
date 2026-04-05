import { LABELS } from '../data/lblConfig.js';

/**
 * INTERFAZ PÚBLICA
 */
export const UI = {
    renderContact(profile, trans, lang = "es") {
        const headerContact = document.getElementById("contact");
        if (!headerContact || !profile || !trans) return;

        const fields = prepareContactFields(profile, trans, lang);
        const sensitiveText = lang === "es" ? "Haga clic para ver" : "Click to view";

        const htmlContent = fields
            .map(({ key, label, content }) => createContactItem(key, label, content, sensitiveText))
            .join("");

        headerContact.innerHTML = `
            <h1 class="header__name">${profile.full_name}</h1>
            <address class="header__contact-address">${htmlContent}</address>
        `;

        initContactListeners(headerContact);
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

        const sortedList = prepareExperienceData(experiences);
        if (sortedList.length === 0) return;

        const htmlContent = sortedList
            .map(exp => createExperienceItemHTML(exp, lang))
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
            (list, slug) => {
                return [...list]
                    .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
                    .map(item => createEducationItemHTML(item, lang, slug))
                    .join("");
            }
        );
    },

    renderSkills(skillGroups, lang = "es") {
        renderGroupedSection(
            "skills", 
            skillGroups, 
            LABELS[lang].skills,
            (list) => {
                // Lógica específica: Mapeo simple con clase de puntuación.
                return list.map(skill => {
                    const t = skill.skill_translations?.[0] ?? {};
                    return `
                        <li class="main__section-subitem main__section-subitem--punctuation">
                            ${t.name || ''}
                        </li>
                    `;
                }).join("");
            }
        );
    }
};

/**
 * LÓGICA DE PREPARACIÓN
 */
function prepareContactFields(profile, trans, lang) {
    const { profile: i18n } = LABELS[lang];
    return [
        { key: 'location', label: i18n.location, content: trans.location },
        { key: 'phone',    label: i18n.phone,    content: profile.phone },
        { key: 'email',    label: i18n.email,    content: profile.email },
        { key: 'website',  label: i18n.website,  content: profile.website }
    ].filter(f => f.content);
}

function prepareExperienceData(experiences) {
    return [...experiences]
        .filter(item => item.active !== false)
        .sort((a, b) => {
            const dateA = a.end_date ? new Date(a.end_date) : new Date();
            const dateB = b.end_date ? new Date(b.end_date) : new Date();
            return dateB - dateA;
        });
}

/**
 * GENERADORES DE HTML (Templates)
 */
function createContactItem(key, label, content, sensitiveText) {
    const isSensitive = key === 'email' || key === 'phone';
    const href = getContactUrl(key, content);
    
    const extraClass = isSensitive ? "js-contact-sensitive" : "";
    const dataAttr = isSensitive ? `data-encoded="${btoa(content)}" data-type="${key}"` : "";
    
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

function renderGroupedSection(containerId, groups, labels, itemRenderer) {
    const container = document.getElementById(containerId);
    if (!container || !groups) return;

    container.innerHTML = Object.entries(groups).map(([slug, list]) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${slug}">
                    ${labels[slug] || slug}
                </h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${itemRenderer(list, slug)} </ul>
            </li>
        </ul>
    `).join("");
}

function createExperienceItemHTML(exp, lang) {
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

function createEducationItemHTML(item, lang, slug) {
    const t = item.education_translations?.[0] ?? {};
    const dateRange = formatCVDateRange(lang, item.start_date, item.end_date);

    // Si es "training", no se quiere mostrar la "Location" o estilo distinto.
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

/**
 * UTILIDADES Y COMPORTAMIENTO
 */
function initContactListeners(container) {
    container.addEventListener("click", (event) => {
        const sensitiveLink = event.target.closest(".js-contact-sensitive");
        if (!sensitiveLink) return;

        event.preventDefault();
        const decodedData = atob(sensitiveLink.getAttribute("data-encoded"));
        const type = sensitiveLink.getAttribute("data-type");

        if (type === "email") {
            window.location.href = `mailto:${decodedData}`;
        } else if (type === "phone") {
            const cleanPhone = decodedData.replace(/\D/g, "");
            window.location.href = `https://wa.me/${cleanPhone}`;
        }
    });
}

function getContactUrl(key, value) {
    const templates = {
        location: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
        email: () => `javascript:void(0)`,
        phone: () => `javascript:void(0)`,
        website: (v) => `https://${v.replace(/^https?:\/\//, '')}`,
    };
    return templates[key] ? templates[key](value) : "#";
}

function formatCVDateRange(lang, start, end) {
    const startText = start ? formatMonthYear(start, lang) : null;
    const endText = end ? formatMonthYear(end, lang) : null;

    // No hay ninguna fecha.
    if (!startText && !endText) return "";

    // Solo hay fecha de fin (Muy común en Training/Certificaciones).
    if (!startText && endText) return `${endText}.`;

    // Solo hay fecha de inicio (Trabajo o estudio actual).
    if (startText && !endText) {
        const presentLabel = lang === "es" ? "Presente" : "Present";
        return `${startText} – ${presentLabel}.`;
    }

    //Ambas fechas existen
    return `${startText} – ${endText}.`;
}

function formatMonthYear(dateStr, lang) {
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    const locale = lang === "es" ? 'es-ES' : 'en-US';
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.toLocaleString(locale, { year: 'numeric' });

    // Capitalizamos y devolvemos solo el par "Mes Año".
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
}