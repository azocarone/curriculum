import { setupLanguage } from './languageService.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtenemos el prefijo del idioma del navegador (ej. "es", "en")
        const browserLanguage = navigator.language.slice(0, 2);
        
        // Ejecutamos la configuración de idioma de forma asíncrona
        await setupLanguage(browserLanguage);
        
        console.log("Idioma inicializado correctamente.");
    } catch (error) {
        // Capturamos cualquier error en la carga del servicio de idiomas
        console.error("Error al inicializar el idioma de la aplicación:", error);
    }
});