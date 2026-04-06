import { profileService } from './services/profile-service.js';
import { applyTranslations } from './_content-manager.js';

export async function setupLanguage(lang) {
    const profileData = await profileService.fetchFullProfile(lang);
        
    if (!profileData) {
        throw new Error("No se encontraron datos del perfil.");
    }
    
    applyTranslations(profileData, lang);
}