import { profileService } from './services/profile-service.js';
import { CV } from './ui/cv-render.js';
import  * as UI from './ui/components.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const detectedLang = navigator.language.slice(0, 2);
        const lang = ['es', 'en'].includes(detectedLang) ? detectedLang : 'es';

        const profileData = await profileService.fetchFullProfile(lang);
        
        if (!profileData) {
            throw new Error("No se encontraron datos del perfil.");
        }

        const profileTranslation = profileData.profiles_translations?.[0];
        const summaryTranslation = profileData.summaries?.[0]?.summaries_translations?.[0];

        CV.renderContact(profileData, profileTranslation, lang);
        CV.renderSummary(summaryTranslation, lang);
        CV.renderExperience(profileData.experiences, lang);
        CV.renderEducation(profileData.educationGroups, lang);
        CV.renderSkills(profileData.skillGroups, lang);

        UI.renderNavbar(lang);
        UI.renderFooter(profileData.full_name, lang);
  
     } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        UI.renderError(error.message);
    }
});