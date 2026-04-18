import { profileServiceV2 } from '@modules/profile/services/profile.v2.service';
// import { profileServiceV1 } from '@modules/profile/services/profile.v1.service';

export const profileService = {
    async fetchFullProfile(identifier, lang) {
        const profileData = await profileServiceV2.fetchFullProfile(identifier, lang);

        if (!profileData) throw new Error("No se encontraron datos del perfil.");

        return profileData;

        // fallback opcional:
        // await profileServiceV1.fetchFullProfile(identifier, lang);
    }
};