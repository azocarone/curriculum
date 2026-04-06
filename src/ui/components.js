export function renderError(errorType) {
    document.body.innerHTML = `
        <div style="text-align:center; padding: 50px; font-family: sans-serif;">
            <h2>⚠️ Ups, algo salió mal</h2>
            <p>Error al cargar el currículum. Reintente en unos minutos.</p>
            <small style="color: #666;">${errorType}</small>
        </div>
    `;
}

export function renderNavbar(navItems) {
    const headerNav = document.getElementById("nav");

    const navHTML = `
        <input class="header__nav-toggle" type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="header__nav-icon">
            <span class="header__nav-icon-bar"></span>
            <span class="header__nav-icon-close"></span>
        </label>
        <div class="header__nav-menu">
            <ul class="header__nav-list">
                ${navItems.map(item => `
                    <li class="header__nav-item">
                        <a class="header__nav-link"
                            href="${item.href}" target="_blank" rel="noopener noreferrer"
                            ${item.download ? 'data-download="true"' : ""}
                            ${item.id ? `id="${item.id}"` : ""}
                            ${item.lang ? `data-lang="${item.lang}"` : ''}>
                                <i class="${item.icon}"></i>${item.text}
                        </a>
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

    headerNav.innerHTML = navHTML;
}

export function renderFooter(contactName, label) {
    const elementFooter = document.getElementById("footer");

    const htmlContent = `
        <p class="footer__copyright">
            &copy; 2025-${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    `;

    elementFooter.innerHTML = htmlContent;
}