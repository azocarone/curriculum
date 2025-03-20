export function updateNav(language) {
    const headerNav = document.getElementById("nav");

    const navData = {
        es: [
            {
                href: "./assets/pdf/CV_JosE_AzOcar_es.pdf",
                download: true,
                id: null,
                icon: "fa-solid fa-file-pdf",
                text: "Descargar",
            },
            {
                href: "#",
                download: false,
                id: "menuLink",
                icon: "fa-solid fa-language",
                text: "Ingles",
            },
            {
                href: "https://azocar.one",
                download: false,
                id: null,
                icon: "fa-solid fa-suitcase",
                text: "Portafolio",
            },
        ],
        en: [
            {
                href: "./assets/pdf/CV_JosE_AzOcar_en.pdf",
                download: true,
                id: null,
                icon: "fa-solid fa-file-pdf",
                text: "Download",
            },
            {
                href: "#",
                download: false,
                id: "menuLink",
                icon: "fa-solid fa-language",
                text: "Spanish",
            },
            {
                href: "https://azocar.one",
                download: false,
                id: null,
                icon: "fa-solid fa-suitcase",
                text: "Portfolio",
            },
        ],
    };

    const navItems = navData[language];

    const navHTML = ((items) => `
        <input class="header__nav-toggle" type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="header__nav-icon">
            <span class="header__nav-icon-bar"></span>
            <span class="header__nav-icon-close"></span>
        </label>
        <div class="header__nav-menu">
            <ul class="header__nav-list">
                ${items.map(({ href, download, id, icon, text }) => `
                    <li class="header__nav-item">
                        <a class="header__nav-link" href="${href}" target="_blank" rel="noopener noreferrer" ${download ? 'data-download="true"' : ""} ${id ? `id="${id}"` : ""}>
                            <i class="${icon}"></i>${text}
                        </a>
                    </li>
                `).join("")}
            </ul>
        </div>
    `)(navItems);

    headerNav.innerHTML = navHTML;
}

export function updateContact(contact) {
    const headerContact = document.getElementById("contact");

    const urlTemplates = {
        location: (value) => `https://maps.google.com/?q=$${encodeURIComponent(value)}`,
        email: (value) => `mailto:${encodeURIComponent(value)}`,
        phone: (value) => `tel:${encodeURIComponent(value)}`,
        website: (value) => `https://${encodeURIComponent(value)}`,
    };

    const address = Object.entries(contact.address);

    const htmlContent = address.map(([key, value]) => {
        const label = value.label; // Obtiene el label directamente del objeto
        const href = urlTemplates[key](value.content); // Obtiene el content para generar el href

        return `
            <p class="header__contact-item">
                <span class="header__contact-label">${label}:</span>
                <a class="header__contact-link header__contact-link--${key}" href="${href}" target="_blank" rel="noopener noreferrer">${value.content}</a>
            </p>
        `;
    }).join("");

    headerContact.innerHTML = `
        <h1 class="header__name">${contact.name}</h1>
        <address class="header__contact-address">
            ${htmlContent}
        </address>
    `;
}

export function updateSummary({id, label, content}) {
    const summarySection = document.getElementById("summary");

    const htmlContent = `
        <h2 class="main__section-title main__section-title--${id}">${label}</h2>
        <p class="main__section-content">${content}</p>
    `;

    summarySection.innerHTML = htmlContent;
}

export function UpdateExperience({ id, label, list }) {
    const experienceSection = document.getElementById("experience");

    const htmlContent = processList(list).map((item) => `
        <ul class="main__experience-list">
            <li class="main__experience-item">
                <a class="main__experience-info" href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <h3 class="main__experience-position">${item.position}</h3>
                    <p class="main__experience-dates">${formatDate(item)}</p>
                    <p class="main__experience-company">${item.company}</p>
                    <p class="main__experience-location">${item.location}</p>
                </a>
                <ul class="main__experience-responsibilities-list">
                    ${item.responsibilities.map((item) => `
                        <li class="main__experience-responsibility-item">${item}</li>
                    `).join("")}
                </ul>
            </li>
        </ul>
    `).join("");

    experienceSection.innerHTML = `
        <h2 class="main__section-title main__section-title--${id}">${label}</h2>
        ${htmlContent}
    `;
}

export function updateEducation(education) {
    const educationSection = document.getElementById("education");

    const htmlContent = education.map(({ id, label, list }) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${id}">${label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${processList(list).map((item) => `
                        <li class="main__section-subitem">
                            <a class="main__section-subitem__link main__section-subitem__link--comma" href="${item.url}" target="_blank" rel="noopener noreferrer">
                                <span class="main__section-subitem__title">${item.title}</span>
                                <span class="main__section-subitem__institution">${item.institution}</span>
                                <span class="main__section-subitem__location">${item.location}</span>
                                <span class="main__section-subitem__dates">${formatDate(item)}</span>
                            </a>
                        </li>
                    `).join("")}
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

function formatDate(item) {
    if (item.dates) {
        return formatDateRangeSeparately(item.dates);
    } else {
        return 'Fecha(s) inválida(s)';
    }
  }

function formatDateRangeSeparately(dates) {
    const endDateObj = new Date(dates.end);
  
    if (isNaN(endDateObj)) {
        return 'Fecha inválida';
    }
  
    if (dates.start) {
        const startDateObj = new Date(dates.start);
        if(!isNaN(startDateObj)){
            const formattedStartDate = formatDateCapitalizedMonthYear(startDateObj);
            const formattedEndDate = formatDateCapitalizedMonthYear(endDateObj);
            return `${formattedStartDate} – ${formattedEndDate}`;
        }
    }
    return formatDateCapitalizedMonthYear(endDateObj);
}
 
function formatDateCapitalizedMonthYear(dateString) {
    const menuLink = document.getElementById('menuLink');
    const formatLanguage = menuLink.textContent.trim().includes('Ingles') ? 'es-ES' : 'en-US';

    const date = new Date(dateString);
    
    if (isNaN(date)) {
        return 'Fecha inválida';
    }

    const formatter = new Intl.DateTimeFormat(formatLanguage, {
        month: 'long',
        year: 'numeric',
    });
  
    const parts = formatter.formatToParts(date);
    const month = parts.find(part => part.type === 'month').value;
    const year = parts.find(part => part.type === 'year').value;
  
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${capitalizedMonth} ${year}`;
}
  
export function updateSkills(skills) {
    const skillsSection = document.getElementById("skills");

    const htmlContent = skills.map((category) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${category.id}">${category.label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${category.list.map((item) => `
                        <li class="main__section-subitem main__section-subitem--comma">${item}</li>
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
            &copy; ${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    `;

    elementFooter.innerHTML = htmlContent;
}