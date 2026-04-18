import { getNavContent } from '@/core/config/navbar.js';

// Aplica target="_blank" solo a enlaces reales (no '#' o vacíos)
const externalLink = (href) =>
    (href && href !== "#") ? 'target="_blank" rel="noopener noreferrer"' : "";

// Genera atributos HTML solo si tienen valor
const attr = (key, value) => (value ? `${key}="${value}"` : "");

export function renderLayout({ lang, author }) {
    renderNavbar(lang);
    renderFooter(author, lang);
}

function renderNavbar(lang) {
    const headerNav = document.getElementById("nav");
    const itemsNav = getNavContent(lang);

    const navHTML = itemsNav.map(({ href, id, action, lang: itemLang, icon, label }) => `
        <li class="header__nav-item">
            <a class="header__nav-link"
                href="${href}"
                ${externalLink(href)}
                ${attr('id', id)}
                ${attr('data-action', action)}
                ${attr('data-lang', itemLang)}>
                <i class="${icon}"></i> ${label}
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

function renderFooter(author, lang) {
    const element = document.getElementById("footer");
    const statement = lang === "es" ? "Todos los derechos reservados." : "All rights reserved.";

    element.innerHTML = `
        <p class="footer__copyright">
            &copy; 2025-${new Date().getFullYear()} ${author}. ${statement}
        </p>
    `;
}