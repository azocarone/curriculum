import { getInitialLanguage } from './utils/lang-utils.js';
import { applyInitialTheme } from './services/theme-service.js';
import { loadAndRenderData } from './services/content-service.js';
import { setupNavListeners } from './controllers/nav-controller.js';
import { renderError } from './ui/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const lang = getInitialLanguage();

        applyInitialTheme();

        await loadAndRenderData(lang);

        setupNavListeners(lang);
        
    } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        renderError(error.message);
    }
});