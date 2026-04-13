const STOPWORDS = new Set(["de", "del", "la", "las", "los", "y"]);

/**
 * Genera nombre de archivo PDF estándar
 *
 * Formato:
 * cv-{nombre}-{apellido}-{lang}-{timestamp}-{hash}.pdf
 */
export function generatePDFName(texto, lang = "es") {
    const safeLang = ["es", "en"].includes(lang) ? lang : "es";

    const parts = normalizeText(texto);

    const { primerNombre, primerApellido } = extractNameParts(parts);

    const timestamp = getTimestamp();
    const hash = getHash();

    return `cv-${primerNombre}-${primerApellido}-${safeLang}-${timestamp}-${hash}.pdf`;
}

/**
 * Limpia y normaliza texto (sin acentos ni símbolos)
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .filter(w => !STOPWORDS.has(w));
}

/**
 * Obtiene primer nombre y primer apellido según reglas:
 * - primer nombre = parts[0]
 * - primer apellido = parts[2] o fallback parts[1]
 */
function extractNameParts(parts) {
    const primerNombre = parts[0] || "nombre";

    let primerApellido = "apellido";

    if (parts.length >= 4) {
        primerApellido = parts[2];
    } else if (parts.length === 3) {
        primerApellido = parts[1];
    } else if (parts.length === 2) {
        primerApellido = parts[1];
    }

    return { primerNombre, primerApellido };
}

/**
 * Genera timestamp legible: YYYYMMDD-HHMM
 */
function getTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}${month}${day}-${hours}${minutes}`;
}

/**
 * Genera hash corto seguro
 */
function getHash(len = 6) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, len);
}