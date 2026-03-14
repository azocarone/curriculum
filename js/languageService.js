import { applyTranslations } from './translationManager.js';

export async function setupLanguage(language) {
    const { content } = await loadLanguage(language);

    if (content) {
        applyTranslations(language, content);
    } else {
        console.error("Error cargando datos del contenido.");
        alert('Error: No se pudieron cargar los datos del contenido.')
    }
}

async function loadLanguage(language) {
    try {
        const { content } = await import(`./data/${language}.js`);
        return { content };
    } catch (error) {
        console.error(`Error cargando idioma '${language}':`, error);
        alert(`Error: Falta traducción para el idioma '${language}'.`);
        return { content: null };
    }
}