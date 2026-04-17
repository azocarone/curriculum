export function prepareContactFields(profile, trans, LABELS, lang) {
    const { profile: i18n } = LABELS[lang];
    return [
        { key: 'location', label: i18n.location, content: trans.location },
        { key: 'phone',    label: i18n.phone,    content: profile.phone },
        { key: 'email',    label: i18n.email,    content: profile.email },
        { key: 'website',  label: i18n.website,  content: profile.website }
    ].filter(f => f.content);
}

export function getContactUrl(key, value) {
    const templates = {
        location: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
        phone: () => `javascript:void(0)`,
        email: () => `javascript:void(0)`,
        website: (v) => `https://${v.replace(/^https?:\/\//, '')}`,
    };
    return templates[key] ? templates[key](value) : "#";
}

export function initContactListeners(container) {
    container.addEventListener("click", (event) => {
        const sensitiveLink = event.target.closest(".js-contact-sensitive");
        if (!sensitiveLink) return;

        event.preventDefault();
        // Aquí se debe implementar la función de bases de datos (RPC)
        const unMaskedData = sensitiveLink.getAttribute("data-masked");
        const type = sensitiveLink.getAttribute("data-type");

        if (type === "phone") {
            const cleanPhone = unMaskedData.replace(/\D/g, "");
            window.location.href = `https://wa.me/${cleanPhone}`;
        } else if (type === "email") {
            window.location.href = `mailto:${unMaskedData}`;
        }
    });
}