const NAV_LABELS = {
    es: { download: "Descargar", lang: "Inglés", langCode: "en", portfolio: "Portafolio", theme: "Tema" },
    en: { download: "Download", lang: "Spanish", langCode: "es", portfolio: "Portfolio", theme: "Theme" }
};

export const getNavContent = (lang) => {
    const t = NAV_LABELS[lang];
    
    return [
        {
            href: new URL(`/assets/pdf/cv-jose-azocar-${lang}.pdf`, import.meta.url).href,
            download: true,
            icon: "fa-solid fa-file-pdf",
            label: t.download
        },
        {
            href: "#",
            id: "language-toggle",
            icon: "fa-solid fa-language",
            label: t.lang,
            lang: t.langCode
        },
        {
            href: "https://joseazocar.pro",
            icon: "fa-solid fa-suitcase",
            label: t.portfolio
        },
        {
            href: "#",
            id: "theme-toggle",
            icon: "fa-solid fa-circle-half-stroke",
            label: t.theme
        }
    ];
};