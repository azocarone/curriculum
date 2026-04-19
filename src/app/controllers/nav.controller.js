import { getNavContent } from '@core/config/navbar';
import { navActions } from '@app/actions/nav';

export function setupNavListeners({ id, full_name } = {}, initialLang = "es") {
    let currentLang = initialLang;

    const navContainer = document.getElementById("nav");
    const getToggle = () => document.getElementById("menu-toggle");

    const closeMenu = () => {
        const toggle = getToggle();
        if (toggle) toggle.checked = false;
    };

    const ctx = {
        id,
        full_name,
        getLang: () => currentLang,
        setLang: (lang) => currentLang = lang
    };

    document.addEventListener('click', async (e) => {
        const menuToggle = getToggle();
        if (!menuToggle?.checked) return;

        // Buscar si el clic fue en un elemento con data-action
        const actionEl = e.target.closest('[data-action]');
        const actionName = actionEl?.dataset.action;

        // Si hay una acción definida, la ejecutara
        if (actionName && typeof navActions[actionName] === 'function') {
            
            const items = getNavContent(ctx.getLang());
            const item = items.find(i => i.action === actionName);

            if(!item) return;

            const { behavior = {} } = item;

            if (behavior.preventDefault) { e.preventDefault(); }

            await navActions[actionName](ctx, actionEl, e);

            if (behavior.closeMenu) { closeMenu(); }

            return;
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