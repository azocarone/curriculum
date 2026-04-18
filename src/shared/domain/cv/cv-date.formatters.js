const LABELS = {
    es: "Presente",
    en: "Present"
};

export function formatMonthYear(dateStr, lang) {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "";

    const locale = lang === "es" ? "es-ES" : "en-US";

    const month = date.toLocaleString(locale, { month: "long" });
    const year = date.toLocaleString(locale, { year: "numeric" });

    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
}

export function formatCVDateRange(lang, start, end) {
    const startText = start ? formatMonthYear(start, lang) : null;
    const endText = end ? formatMonthYear(end, lang) : null;

    if (!startText && !endText) return "";
    if (!startText && endText) return `${endText}.`;

    if (startText && !endText) {
        return `${startText} – ${LABELS[lang] ?? LABELS.en}.`;
    }

    return `${startText} – ${endText}`;
}