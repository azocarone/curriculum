import { LABELS } from './data/lblConfig.js';

/**
 * 1. INTERFAZ PÚBLICA
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
    }
};

/**
 * 2. LÓGICA DE PREPARACIÓN
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
 * 3. GENERADORES DE HTML (Templates)
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

function createExperienceItemHTML(exp, lang) {
    const trans = exp.experiences_translations?.[0] ?? {};
    const dateRange = formatCVDate(lang, exp.start_date, exp.end_date);
    
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

/**
 * 4. UTILIDADES Y COMPORTAMIENTO
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

function formatCVDate(lang, start, end) {
    if (!start) return "";
    const locale = lang === "es" ? 'es-ES' : 'en-US';

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) return "";
        const month = date.toLocaleString(locale, { month: 'long' });
        const year = date.toLocaleString(locale, { year: 'numeric' });
        return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    };

    const startText = formatDate(start);
    const endText = end ? formatDate(end) : (lang === "es" ? "Presente" : "Present");
    return `${startText} – ${endText}.`;
}