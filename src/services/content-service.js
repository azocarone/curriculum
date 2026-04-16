import { profileService } from '@/services/profile/index.js';

export async function getProfileData(identifier, lang) {
    const profileData = await profileService.fetchFullProfile(identifier, lang);
    
    if (!profileData) throw new Error("No se encontraron datos del perfil.");
    
    return profileData;
}