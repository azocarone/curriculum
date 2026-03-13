import { setupLanguage } from './languageService.js';
import { applyInitialTheme, initThemeEventListener } from './themeColorService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Aplicar tema guardado inmediatamente para evitar parpadeos
    applyInitialTheme();
    
    try {
        // Obtener el prefijo del idioma del navegador (ej. "es", "en")
        const browserLanguage = navigator.language.slice(0, 2);
        
        // Configurar idioma (esto llama internamente a updateNav)
        await setupLanguage(browserLanguage);

        // Activar el listener del theme-toggle (una sola vez)
        initThemeEventListener();
        
        console.log("Configuración lista con soporte de modo oscuro.");
    } catch (error) {
        // Capturar cualquier error en la carga del servicio de idiomas
        console.error("Error al inicializar el idioma de la aplicación:", error);
    }
});