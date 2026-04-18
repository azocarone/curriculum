import { ENV } from '@core/config/env';
import { getInitialLanguage } from '@utils/lang-utils.js';
import { applyInitialTheme } from '@/shared/ui/theme/theme.service.js';
import { profileService } from '@modules/profile/services/profile.service';
import { refreshContent } from '@/app/controllers/render.controller.js';
import { setupNavListeners } from '@/app/controllers/nav.controller.js';
import { renderError } from '@shared/ui/feedback/feedback.render';

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
        const profileData = await profileService.fetchFullProfile(identifier, lang);

        refreshContent(profileData, lang);
        setupNavListeners(profileData, lang);
        
    } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        renderError(error.message);
    }
});