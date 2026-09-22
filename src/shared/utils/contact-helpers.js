export function prepareContactFields(contact, LABELS, lang) {
    const { profile: i18n } = LABELS[lang];
    return [
        { key: 'location', label: i18n.location, content: contact.location },
        { key: 'phone',    label: i18n.phone,    content: contact.phone },
        { key: 'email',    label: i18n.email,    content: contact.email },
        { key: 'website',  label: i18n.website,  content: contact.website }
    ].filter(f => f.content);
}

export function getContactUrl(key, value) {
    const templates = {
        location: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
        website: (v) => `https://${v.replace(/^https?:\/\//, '')}`
    };
    return templates[key] ? templates[key](value) : null;
}