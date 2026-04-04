import { LABELS } from './data/lblConfig.js';

export const UI = {
    renderContact(profile, trans, lang = "es") {
        const headerContact = document.getElementById("contact");
        if (!headerContact || !profile || !trans ) return;

        // Extrae las etiquetas según el idioma.
        const { profile: i18n } = LABELS[lang];
               
        // Definición del esquema de datos. Facilita cambiar el orden de los campos.
        const fields = [
            { key: 'location', label: i18n.location, content: trans.location },
            { key: 'phone',    label: i18n.phone,    content: profile.phone },
            { key: 'email',    label: i18n.email,    content: profile.email },
            { key: 'website',  label: i18n.website,  content: profile.website }
        ];

        const sensitiveText = (lang === "es") ? "Haga clic para ver" : "Click to view";

        // Genera el HTML iterando sobre el esquema.
        const htmlContent = fields
            .filter(f => f.content) // Opcional: No renderiza el campo si está vacío.
            .map(({ key, label, content}) => createContactItem(key, label, content, sensitiveText))
            .join("");

        // Inyección final
        headerContact.innerHTML = `
            <h1 class="header__name">${profile.full_name}</h1>
            <address class="header__contact-address">${htmlContent}</address>
        `;

        // Asume la existencia de la función para manejar los clics en datos sensibles.
        if (typeof initContactListeners === "function") initContactListeners(headerContact);
    },

    renderSummary(trans, lang = "es") {
        const summarySection = document.getElementById("summary");
        if (!summarySection || !trans?.content) return;

        const label = LABELS[lang].summary;

        const htmlContent = `
            <h2 class="main__section-title main__section-title--summary">${label}</h2>
            <p class="main__section-content">${trans.content}</p>
        `;

        summarySection.innerHTML = htmlContent;
    }
}

// Generador del HTML para un ítem de contacto.
const createContactItem = (key, label, content, sensitiveText) => {
    const isSensitive = key === 'email' || key === 'phone';
    const href = getContactUrl(key, content);
    
    let extraClass = "";
    let dataAttr = "";
    let display = content;

    if (isSensitive) {
        extraClass = "js-contact-sensitive";
        dataAttr = `data-encoded="${btoa(content)}" data-type="${key}"`; // Codifica en el momento para el atributo data.
        // En pantalla oculto, en impresión visible.
        display = `
            <span class="header__contact-content header__contact-content--screen">${sensitiveText}</span>
            <span class="header__contact-content header__contact-content--print">${content}</span>
        `;
    }

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
};

// Generador de URLs según tipo de campo.
const getContactUrl = (key, value) => {
    const templates = {
        location: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
        email: () => `javascript:void(0)`,
        phone: () => `javascript:void(0)`,
        website: (v) => `https://${v.replace(/^https?:\/\//, '')}`,
    };
    return templates[key] ? templates[key](value) : "#";
};

const initContactListeners = (container) => {
    container.addEventListener("click", (event) => {
        // Buscar el elemento más cercano al enlace sensible.
        const sensitiveLink = event.target.closest(".js-contact-sensitive");
        
        if (sensitiveLink) {
            event.preventDefault(); // Detener el salto del href.

            const encodedData = sensitiveLink.getAttribute("data-encoded");
            const type = sensitiveLink.getAttribute("data-type");
            const decodedData = atob(encodedData);

            if (type === "email") {
                window.location.href = `mailto:${decodedData}`;
            } else if (type === "phone") {
                const cleanPhone = decodedData.replace(/\D/g, "");
                window.location.href = `https://wa.me/${cleanPhone}`;
            }
        }
    })
}
