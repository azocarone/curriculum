import { setupLanguage } from './content-service.js';
import { setupNavListeners } from './nav-controller.js';
import { renderError } from './ui/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const detectedLang = navigator.language.slice(0, 2);
        const lang = ['es', 'en'].includes(detectedLang) ? detectedLang : 'es';

        await setupLanguage(lang);

        setupNavListeners();
    } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        renderError(error.message);
    }
});