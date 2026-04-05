import { profileService } from './services/profileService.js';
import { UI } from './ui/ui-main.js';

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

        UI.renderContact(profileData, profileTranslation, lang);
        UI.renderSummary(summaryTranslation, lang);
        UI.renderExperience(profileData.experiences, lang);
        UI.renderEducation(profileData.educationGroups, lang);
        UI.renderSkills(profileData.skillGroups, lang);

        // Aquí podrías invocar los nuevos renders que mencionaste antes
        // UI.renderNavbar(lang);
        // UI.renderFooter(profileData, lang);

     } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        
        document.body.innerHTML = `
            <div style="text-align:center; padding: 50px; font-family: sans-serif;">
                <h2>⚠️ Ups, algo salió mal</h2>
                <p>No pudimos cargar la información en este momento.</p>
                <small style="color: #666;">${error.message}</small>
            </div>
        `;
    }
});























//import { setupLanguage } from './contentService.js';
//import { setupNavListeners } from './navController.js';
//
//document.addEventListener('DOMContentLoaded', async () => {
//    try {
//
//        setupNavListeners();
//
//    }
//});
//
//import { UI } from './ui.js';