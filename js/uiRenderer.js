export function updateNav(language) {
    const headerNav = document.getElementById("nav");

    const navData = {
        es: [
            {
                href: "./assets/pdf/cv_jose_azocar_es.pdf",
                download: true,
                id: null,
                icon: "fa-solid fa-file-pdf",
                text: "Descargar",
            },
            {
                href: "#",
                download: false,
                id: "languageToggle",
                icon: "fa-solid fa-language",
                text: "Ingles",
            },
            {
                href: "https://joseazocar.pro",
                download: false,
                id: null,
                icon: "fa-solid fa-suitcase",
                text: "Portafolio",
            },
            {
                href: "#",
                download: false,
                id: "themeToggle",
                icon: "fa-solid fa-circle-half-stroke",
                text: language === "es" ? "Tema" : "Theme"
            }            
        ],
        en: [
            {
                href: "./assets/pdf/cv_jose_azocar_en.pdf",
                download: true,
                id: null,
                icon: "fa-solid fa-file-pdf",
                text: "Download",
            },
            {
                href: "#",
                download: false,
                id: "languageToggle",
                icon: "fa-solid fa-language",
                text: "Spanish",
            },
            {
                href: "https://joseazocar.pro",
                download: false,
                id: null,
                icon: "fa-solid fa-suitcase",
                text: "Portfolio",
            },
            {
                href: "#",
                download: false,
                id: "themeToggle",
                icon: "fa-solid fa-circle-half-stroke",
                text: language === "es" ? "Tema" : "Theme"
            }            
        ]
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

export function updateContact(language, contact) {
    const headerContact = document.getElementById("contact");

    const urlTemplates = {
        location: (value) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`,
        email: () => `javascript:void(0)`,
        phone: () => `javascript:void(0)`,
        website: (value) => `https://${encodeURIComponent(value)}`,
    };

    const sensitiveLinkText = (language === "es") ? "Haga clic para ver" : "Click to view";

    const address = Object.entries(contact.address);

    const htmlContent = address.map(([key, value]) => {
        const isSensitive = key === 'email' || key === 'phone';
        const label = value.label; // Obtiene el label directamente del objeto
        const rawContent = value.content; // Aquí viene codificado o texto plano

        // Atributos de enlace
        const href = urlTemplates[key](rawContent);
        const targetAttr = isSensitive ? "" : 'target="_blank" rel="noopener noreferrer"';

        // Lógica de visualización
        let extraClass = "";
        let sensitiveDataAttr = "";
        let displayContent = rawContent;
   
        if (isSensitive) {
            const clearText = atob(rawContent); // Decodifica solo para la versión de impresión
            extraClass = "js-contact-sensitive";
            sensitiveDataAttr = `data-encoded="${rawContent}" data-type="${key}"`;
            displayContent = `
                <span class="header__contact-content header__contact-content--screen">${sensitiveLinkText}</span>
                <span class="header__contact-content header__contact-content--print">${clearText}</span>
            `;
        }

        return `
            <p class="header__contact-item">
                <span class="header__contact-label">${label}:</span>
                <a class="header__contact-link header__contact-link--${key} ${extraClass}" 
                    href="${href}"
                    ${targetAttr}
                    ${sensitiveDataAttr}>${displayContent}</a>
            </p>
        `;
    }).join("");

    headerContact.innerHTML = `
        <h1 class="header__name">${contact.name}</h1>
        <address class="header__contact-address">
            ${htmlContent}
        </address>
    `;

    // Activar listener de eventos una sola vez
    initContactListeners(headerContact);
}

function initContactListeners(container) {
    container.addEventListener("click", (e) => {
        // Buscamos el ancestro más cercano que sea el enlace sensible
        const sensitiveLink = e.target.closest(".js-contact-sensitive");
        
        if (sensitiveLink) {
            e.preventDefault(); // Detenemos el salto del href

            const encodedData = sensitiveLink.getAttribute("data-encoded");
            const type = sensitiveLink.getAttribute("data-type");
            const decodedData = atob(encodedData);

            if (type === "email") {
                window.location.href = `mailto:${decodedData}`;
            } else if (type === "phone") {
                const cleanPhone = decodedData.replace(/\D/g, "");
                window.location.href = `https://wa.me/${cleanPhone}`;
            }
        }
    });
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
    const languageToggle = document.getElementById('languageToggle');
    const formatLanguage = languageToggle.textContent.trim().includes('Ingles') ? 'es-ES' : 'en-US';

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
            &copy; 2025-${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    `;

    elementFooter.innerHTML = htmlContent;
}