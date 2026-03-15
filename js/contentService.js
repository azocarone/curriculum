import { applyTranslations } from './contentManager.js';

export async function setupLanguage(language) {
    const { content } = await loadLanguage(language);

    if (content) {
        applyTranslations(language, content);
    } else {
        console.error("Error cargando datos del contenido.");
    }
}

async function loadLanguage(language) {
    try {
        const { content } = await import(`./data/${language}.js`);
        return { content };
    } catch (error) {
        console.error(`Error cargando idioma '${language}':`, error);
        return { content: null };
    }
}