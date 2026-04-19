const NAV_LABELS = {
    es: { portfolio: "Portafolio", download: "Descargar", theme: "Tema", lang: "Inglés", langCode: "en" },
    en: { portfolio: "Portfolio", download: "Download", theme: "Theme", lang: "Spanish", langCode: "es" }
};

export const getNavContent = (lang) => {
    const t = NAV_LABELS[lang];
    
    return [
        {
            href: "https://joseazocar.pro",
            action: "nav", // Acción simple: navegar y cerrar menú
            icon: "fa-solid fa-suitcase",
            label: t.portfolio,
            behavior: { closeMenu: true }
        },
        {
            href: "#", // O la URL del PDF para descarga nativa
            id: "download-toggle",
            action: "download",
            icon: "fa-solid fa-file-pdf",
            label: t.download,
            behavior: { preventDefault: true, closeMenu: true }
        },
        {
            href: "#",
            id: "theme-toggle",
            action: "theme",
            icon: "fa-solid fa-circle-half-stroke",
            label: t.theme,
            behavior: { preventDefault: true, closeMenu: false }
        },
        {
            href: "#",
            id: "language-toggle",
            action: "lang",
            icon: "fa-solid fa-language",
            label: t.lang,
            lang: t.langCode,
            behavior: { preventDefault: true, closeMenu: true }
        }
    ]
}