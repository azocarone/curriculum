/**
 * Gestiona el cierre del menú por click en opción o pérdida de foco.
 */
export function setupNavListeners() {
    const navContainer = document.getElementById("nav");

    document.addEventListener('click', (event) => {
        const menuToggle = document.getElementById("menu-toggle");
        
        // Si el menú no existe o ya está cerrado, no hacemos nada
        if (!menuToggle || !menuToggle.checked) return;

        // Caso A: El click fue en una de las opciones del menú (.header__nav-link)
        const isNavLink = event.target.closest(".header__nav-link");
        
        // Caso B: El click fue fuera de todo el contenedor de navegación
        const isOutside = !navContainer.contains(event.target);

        // Si se cumple cualquiera de los dos, cerramos el menú
        if (isNavLink || isOutside) {
            menuToggle.checked = false;
        }
    });

    // Opcional: Cerrar con la tecla Escape para mejor accesibilidad
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const menuToggle = document.getElementById("menu-toggle");
            if (menuToggle) menuToggle.checked = false;
        }
    });
}