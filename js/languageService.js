import { applyTranslations } from './translationManager.js';

export async function setupLanguage(language){
    const { cv } = await loadLanguage(language);

    if (cv) {
        applyTranslations(language, cv);
    } else {
        console.error("Error cargando datos del CV.");
        alert('Error: No se pudieron cargar los datos del CV. Mostrando contenido predeterminado.')
        // Muestra el contenido por defecto del index.html
    }
}

export async function loadLanguage(language) {
    try {
        const { cv } = await import(`./data/${language}.js`);
        return { cv };
    } catch (error) {
        console.error(`Error cargando idioma '${language}':`, error);
        alert(`Error: Falta traducción para el idioma '${language}'.`);
        return { cv: null };
    }
}