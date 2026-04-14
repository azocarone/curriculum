import { ENV } from './data/env-config.js';
import { getInitialLanguage } from './utils/lang-utils.js';
import { applyInitialTheme } from './services/theme-service.js';
import { getProfileData } from './services/content-service.js';
import { refreshContent } from './controllers/render-controller.js';
import { setupNavListeners } from './controllers/nav-controller.js';
import { renderError } from './ui/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Intentar obtener ID de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const rawId = urlParams.get('id');
        // Convertir a número y verificar si es válido, sino usar el del Config
        const identifier = (rawId && !isNaN(rawId)) ? parseInt(rawId) : ENV.DEFAULT_PROFILE_ID;

        const lang = getInitialLanguage();

        applyInitialTheme();

        // Usar el identificador dinámico
        const profileData = await getProfileData(identifier, lang);

        refreshContent(profileData, lang);
        setupNavListeners(profileData, lang);
        
    } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        renderError(error.message);
    }
});