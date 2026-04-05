import { profileService } from './profileService.js';
import { UI } from './uiRenderContent.js'

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const lang = navigator.language.slice(0, 2);
        const profileData = await profileService.fetchFullProfile(lang);
        
        if (!profileData) return;

        console.log(profileData);

        // Inyección coordinada en el DOM usando la UI
        UI.renderContact(profileData, profileData.profiles_translations[0], lang);
        UI.renderSummary(profileData.summaries[0].summaries_translations[0], lang);
        UI.renderExperience(profileData.experiences, lang);
        UI.renderEducation(profileData.educationGroups, lang);
        //document.getElementById('skills').innerHTML = UI.renderSkills(profileData.skills);

     } catch (error) {
        console.error("Fallo crítico en la aplicación:", error);
        document.body.innerHTML = `<p>Lo siento, no se pudo cargar el perfil. Error: ${error.message}</p>`;
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



