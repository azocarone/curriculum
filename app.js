import { ENV } from './js/data/envConfig.js';
import { CVService } from './CVService.js';
import { UI } from './ui.js';

async function initApp() {
    try {
        // Obtenemos los datos usando el servicio
        const profileData = await CVService.fetchFullCV(ENV.DEFAULT_LANG);
        
        if (!profileData) return;

        // Inyección coordinada en el DOM usando la UI
        document.getElementById('header').innerHTML = UI.renderHeader(profileData, profileData.profiles_translations[0]);
        document.getElementById('summary').innerHTML = UI.renderSummary(profileData.summaries[0]);
        document.getElementById('experience').innerHTML = UI.renderExperience(profileData.experiences);
        document.getElementById('education').innerHTML = UI.renderEducation(profileData.education);
        document.getElementById('skills').innerHTML = UI.renderSkills(profileData.skills);

    } catch (err) {
        console.error("Fallo crítico en la aplicación:", err);
        document.body.innerHTML = `<p>Lo sentimos, no se pudo cargar el CV. Error: ${err.message}</p>`;
    }
}

initApp();