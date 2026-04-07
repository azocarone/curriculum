import { getInitialLanguage } from './utils/lang-utils.js';
import { applyInitialTheme } from './services/theme-service.js';
import { loadAndRenderData } from './services/content-service.js';
import { setupNavListeners } from './controllers/nav-controller.js';
import { renderError } from './ui/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const lang = getInitialLanguage();

        // Aplica el tema guardado o preferencia del sistema
        applyInitialTheme();

        // Carga los datos iniciales
        await loadAndRenderData(lang);

        // Activa los controles de la interfaz
        setupNavListeners();
        
    } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        renderError(error.message);
    }
});