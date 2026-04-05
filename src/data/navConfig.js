const NAV_LABELS = {
    es: { download: "Descargar", lang: "Inglés", langCode: "en", portfolio: "Portafolio", theme: "Tema" },
    en: { download: "Download", lang: "Spanish", langCode: "es", portfolio: "Portfolio", theme: "Theme" }
};

export const getNav = (lang) => {
    const t = NAV_LABELS[lang];
    
    return [
        {
            href: `./assets/pdf/cv_jose_azocar_${lang}.pdf`, // El idioma ya define el archivo
            download: true,
            icon: "fa-solid fa-file-pdf",
            label: t.download
        },
        {
            href: "#",
            id: "language-toggle",
            icon: "fa-solid fa-language",
            label: t.lang,
            lang: t.langCode // Usamos el código destino definido arriba
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