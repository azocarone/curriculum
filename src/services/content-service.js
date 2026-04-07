import { profileService } from './profile-service.js';
import { refreshAppContent } from '../controllers/render-controller.js';

export async function loadAndRenderData(lang) {
    const profileData = await profileService.fetchFullProfile(lang);
    
    if (!profileData) {
        throw new Error("No se encontraron datos del perfil.");
    }
    
    // Al tener los datos, llamar al controlador de renderizado
    refreshAppContent(profileData, lang);
}