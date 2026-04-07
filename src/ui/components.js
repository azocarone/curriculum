import { getNavContent } from '../data/nav-config.js';

export function renderError(errorType) {
    document.body.innerHTML = `
        <div class="error-screen">
            <div class="error-card">
                <h2>Ups, algo salió mal</h2>
                <p>No pudimos cargar la información del currículum. Por favor, inténtalo de nuevo.</p>
                
                <span class="error-detail">
                    Código: ${errorType || 'Error Desconocido'}
                </span>

                <button class="btn-retry" onclick="window.location.reload()">
                    Intentar de nuevo
                </button>
            </div>
        </div>
    `;
}

export function renderNavbar(lang) {
    const headerNav = document.getElementById("nav");
    const itemsNav = getNavContent(lang);

    const navHTML = itemsNav.map(item => `
        <li class="header__nav-item">
            <a class="header__nav-link"
                href="${item.href}" target="_blank" rel="noopener noreferrer"
                ${item.download ? 'data-download="true"' : ""}
                ${item.id ? `id="${item.id}"` : ""}
                ${item.lang ? `data-lang="${item.lang}"` : ""}>
                <i class="${item.icon}"></i>${item.label}
            </a>
        </li>
    `).join("");
 
    headerNav.innerHTML = `
        <input class="header__nav-toggle" type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="header__nav-icon">
            <span class="header__nav-icon-bar"></span>
            <span class="header__nav-icon-close"></span>
        </label>
        <div class="header__nav-menu">
            <ul class="header__nav-list">${navHTML}</ul>
        </div>
    `;
}

export function renderFooter(author, lang) {
    const element = document.getElementById("footer");
    const statement = lang === "es" ? "Todos los derechos reservados." : "All rights reserved.";

    element.innerHTML = `
        <p class="footer__copyright">
            &copy; 2025-${new Date().getFullYear()} ${author}. ${statement}
        </p>
    `;
}