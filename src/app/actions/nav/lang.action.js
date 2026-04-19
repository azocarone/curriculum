import { profileService } from '@modules/profile/services/profile.service.js';
import { refreshContent } from '@app/controllers/render.controller.js';
import { renderError } from '@shared/ui/feedback/feedback.render.js';

export async function langAction(ctx, el, _) {
    const newLang = el.dataset.lang;

    try {
 
        const profileData = await profileService.fetchFullProfile(ctx.id, newLang);

        ctx.setLang(newLang); // Importante: Solo se actualiza si la carga fue exitosa
        refreshContent(profileData, ctx.getLang());

    } catch (error) {
 
        console.error("Fallo en cambio de idioma:", error);
        renderError(error.message);
    }
}