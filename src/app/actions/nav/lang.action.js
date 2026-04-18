import { profileService } from '@modules/profile/services/profile.service';
import { refreshContent } from '@app/controllers/render.controller';
import { renderError } from '@shared/ui/components';

export async function langAction(ctx, el, e, closeMenu) {
    e.preventDefault();

    const newLang = el.dataset.lang;

    try {
        const profileData = await profileService.fetchFullProfile(ctx.id, newLang);

        ctx.setLang(newLang); // Importante: Solo se actualiza si la carga fue exitosa
        refreshContent(profileData, newLang);

        closeMenu();
    } catch (error) {
        console.error("Fallo en cambio de idioma:", error);
        renderError(error.message);
    }
}