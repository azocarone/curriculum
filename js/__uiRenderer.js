export function updateNav(navItems) {
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

export function updateEducation(language, education) {
    const educationSection = document.getElementById("education");

    const htmlContent = education.map(({ id, label, list }) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${id}">${label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${processList(list).map((item) => {
                        const { title, institution, location, url } = item;

                        return `
                            <li class="main__section-subitem">
                                <a class="main__section-subitem__link" href="${url}" target="_blank" rel="noopener noreferrer">
                                    <span class="main__section-subitem__title">${title}: </span>
                                    <span class="main__section-subitem__institution">${institution}; </span>
                                    <span class="main__section-subitem__location">${location}; </span>
                                    <span class="main__section-subitem__dates">${formatDate(language, item)}</span>
                                </a>
                            </li>
                        `;
                    }).join("")}
                </ul>
            </li>
        </ul>
    `).join("");

    educationSection.innerHTML = htmlContent;
}

function processList(list) {
    return list.filter(item => item.active).sort((a, b) => {
        const dateA = a.dates && a.dates.end ? new Date(a.dates.end) : null;
        const dateB = b.dates && b.dates.end ? new Date(b.dates.end) : null;
  
        if (!dateA || !dateB || isNaN(dateA) || isNaN(dateB)) {
            return 0;
        }
        
        return dateB - dateA;
    });
}

export function formatDate(language, item) {
    if (!item?.dates) return 'Fecha inválida.';

    const { start, end } = item.dates;
    const endObj = new Date(end);

    if (isNaN(endObj)) return 'Fecha inválida.';

    // Si existe fecha de inicio, formateamos el rango
    if (start) {
        const startObj = new Date(start);
        if (!isNaN(startObj)) {
            return `${formatSingleDate(language, startObj)} – ${formatSingleDate(language, endObj)}.`;
        }
    }

    // Si no hay inicio o es inválido, solo retornamos la fecha final
    return `${formatSingleDate(language, endObj)}.`;
}

function formatSingleDate(language, date) {
    const locale = language === "es" ? 'es-ES' : 'en-US';
    
    // Obtenemos el mes y el año por separado
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.toLocaleString(locale, { year: 'numeric' });

    // Capitalizar la primera letra del mes
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
}

export function updateSkills(skills) {
    const skillsSection = document.getElementById("skills");

    const htmlContent = skills.map((category) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${category.id}">${category.label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${category.list.map((item) => `
                        <li class="main__section-subitem main__section-subitem--punctuation">${item}</li>
                    `).join("")}
                </ul>
            </li>
        </ul>
    `).join("");

    skillsSection.innerHTML = htmlContent;
}

export function updateFooter(contactName, label) {
    const elementFooter = document.getElementById("footer");

    const htmlContent = `
        <p class="footer__copyright">
            &copy; 2025-${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    `;

    elementFooter.innerHTML = htmlContent;
}