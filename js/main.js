import { applyInitialTheme, initThemeEventListener } from './themeColorService.js';
import { setupLanguage } from './languageService.js';
import { setupNavListeners } from './navService.js';

document.addEventListener('DOMContentLoaded', async () => {
    applyInitialTheme();
    
    try {
        const browserLanguage = navigator.language.slice(0, 2);
        
        await setupLanguage(browserLanguage);

        initThemeEventListener();
        setupNavListeners();

        console.log("Configuración lista.");
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
});