import { applyInitialTheme } from './themeService.js';
import { setupLanguage } from './contentService.js';
import { setupNavListeners } from './navController.js';

document.addEventListener('DOMContentLoaded', async () => {
    applyInitialTheme();
    
    try {
        const browserLanguage = navigator.language.slice(0, 2);
        
        await setupLanguage(browserLanguage);

        setupNavListeners();

        console.log("Configuración lista.");
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
});