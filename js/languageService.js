import { applyTranslations } from './translationManager.js';

export async function setupLanguage(language) {
    const { cv } = await loadLanguage(language);

    if (cv) {
        applyTranslations(language, cv);
        // Para crea el menuLink EventListener del idioma, 
        // llamar desde aquí, el DOM ya estará completo.
        setupMenuLinkEventListener(); 
    } else {
        console.error("Error cargando datos del CV.");
        alert('Error: No se pudieron cargar los datos del CV.')
    }
}

async function loadLanguage(language) {
    try {
        const { cv } = await import(`./data/${language}.js`);
        return { cv };
    } catch (error) {
        console.error(`Error cargando idioma '${language}':`, error);
        alert(`Error: Falta traducción para el idioma '${language}'.`);
        return { cv: null };
    }
}

function setupMenuLinkEventListener() {
    const menuLink = document.getElementById('menuLink');

    menuLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const targetLanguage = menuLink.textContent.trim().includes('Ingles') ? 'en' : 'es';
        await setupLanguage(targetLanguage);
    });
}