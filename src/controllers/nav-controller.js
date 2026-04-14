import { downloadPDF } from '../utils/download-pdf-file.js';
import { toggleTheme } from '../services/theme-service.js';
import { getProfileData } from '../services/content-service.js';
import { refreshContent } from './render-controller.js';
import { renderError } from '../ui/components.js';

export function setupNavListeners({ id, full_name } = {}, initialLang = "es") {
    let currentLang = initialLang;

    const navContainer = document.getElementById("nav");
    const getToggle = () => document.getElementById("menu-toggle");

    const closeMenu = () => {
        const toggle = getToggle();
        if (toggle) toggle.checked = false;
    };

    const actions = {
        download: (el, e) => {
            // Si es un link de JS (href=#), se ejecut la función
            if (el.getAttribute('href') === '#') {
                e.preventDefault();
                downloadPDF(full_name, currentLang);
            }
            // En cualquier caso (link real o función), se cierra el menú
            closeMenu();
        },
        theme: (el, e) => {
            e.preventDefault();
            toggleTheme();
            // closeMenu(); // Descomentar para cerrar al cambiar el tema
        },
        lang: async (el, e) => {
            e.preventDefault();

            const newLang = el.dataset.lang;

            try {
                const profileData = await getProfileData(id, newLang);
                currentLang = newLang; // Solo se actualiza si la carga fue exitosa
                refreshContent(profileData, currentLang);
                closeMenu();
            } catch (error) {
                console.error("Fallo en cambio de idioma:", error);
                renderError(error.message);
            }
        },
        nav: () => {
            // Acción para links externos: solo cerrar el menú
            // El navegador se encarga de abrir la URL por el target="_blank"
            closeMenu();
        }
    };

    document.addEventListener('click', async (e) => {
        const menuToggle = getToggle();
        if (!menuToggle?.checked) return;

        // Buscar si el clic fue en un elemento con data-action
        const actionEl = e.target.closest('[data-action]');
        const actionName = actionEl?.dataset.action;

        // Si hay una acción definida, la ejecutara
        if (actionName && actions[actionName]) {
            return await actions[actionName](actionEl, e);
        }

        // Si no hay acción pero es un link normal o clic fuera, cerrar
        const isNavLink = e.target.closest(".header__nav-link");
        const isOutside = !navContainer.contains(e.target);

        if (isNavLink || isOutside) closeMenu();
    })

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    })
}