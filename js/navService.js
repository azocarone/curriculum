import { setupLanguage } from './languageService.js';

export function setupNavListeners() {
    const navContainer = document.getElementById("nav");

    document.addEventListener('click', async (event) => {
        const menuToggle = document.getElementById("menu-toggle");
        
        // El menú no existe o ya está cerrado, no hacemos nada.
        if (!menuToggle || !menuToggle.checked) return;

        // Gestión del cambio de idioma.
        const languageToggle = event.target.closest("[data-lang]");
        if (languageToggle) {
            event.preventDefault();
            const targetLanguage = languageToggle.dataset.lang;;
            await setupLanguage(targetLanguage);
            menuToggle.checked = false;
            return;
        }

        // Gestión de cierre (clic en link o clic fuera).
        const isNavLink = event.target.closest(".header__nav-link");
        const isOutside = !navContainer.contains(event.target);
    
        if (isNavLink || isOutside) {
            menuToggle.checked = false;
        }
    });

    // Cerrar con la tecla Escape para mejor accesibilidad
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const menuToggle = document.getElementById("menu-toggle");
            if (menuToggle) menuToggle.checked = false;
        }
    });
}