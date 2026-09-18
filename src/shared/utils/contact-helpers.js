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
        website: (v) => `https://${v.replace(/^https?:\/\//, '')}`
    };
    return templates[key] ? templates[key](value) : null;
}