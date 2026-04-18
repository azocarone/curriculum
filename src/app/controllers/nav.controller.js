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