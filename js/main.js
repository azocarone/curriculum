import { setupLanguage } from './languageService.js';
import { applyInitialTheme, initThemeEventListener } from './themeColorService.js';
import { setupNavListeners } from './navService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Aplicar tema guardado inmediatamente para evitar parpadeos
    applyInitialTheme();
    
    try {
        // Obtener el prefijo del idioma del navegador (ej. "es", "en")
        const browserLanguage = navigator.language.slice(0, 2);
        
        // Configurar idioma (esto llama internamente a updateNav)
        await setupLanguage(browserLanguage);

        // Activar el cambio de tema (esquema)
        initThemeEventListener();
        
        // Activar el control total de cierre del menú (click-away + click-item)
        setupNavListeners();

        console.log("Configuración lista.");
    } catch (error) {
        // Capturar cualquier error en la carga de los servicios
        console.error("Error al inicializar la aplicación:", error);
    }
});