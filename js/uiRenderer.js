export function updateNavigationMenu(language) {
    const headerNavContainer = document.getElementById('nav');

    const navigationData = {
        es: [
            { text: 'Descargar', href: './assets/pdf/CV_JosE_AzOcar_es.pdf', icon: 'fa-solid fa-file-pdf', download: true, id: null },
            { text: 'English', href: '#', icon: 'fa-solid fa-language', download: false, id: 'menuLink' },
            { text: 'Portafolio', href: 'https://azocar.one', icon: 'fa-solid fa-suitcase', download: false, id: null }
        ],
        en: [
            { text: 'Download', href: './assets/pdf/CV_JosE_AzOcar_en.pdf', icon: 'fa-solid fa-file-pdf', download: true, id: null },
            { text: 'Español', href: '#', icon: 'fa-solid fa-language', download: false, id: 'menuLink' },
            { text: 'Portfolio', href: 'https://azocar.one', icon: 'fa-solid fa-suitcase', download: false, id: null }
        ]
    };

    const navigationItems = navigationData[language];
    
    const navigationHTML = ((items) => `
        <input class="header__nav-toggle" type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="header__nav-icon">
            <span class="header__nav-icon-bar"></span>
            <span class="header__nav-icon-close"></span>
        </label>
        <div class="header__nav-menu">
            <ul class="header__nav-list">
                ${items.map(item => `
                    <li class="header__nav-item">
                        <a class="header__nav-link" href="${item.href}" target="_blank" rel="noopener noreferrer" ${item.download ? 'data-download="true"' : ''} ${item.id ? `id="${item.id}"` : ''}>
                            <i class="${item.icon}"></i>${item.text}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `)(navigationItems);
  
    headerNavContainer.innerHTML = navigationHTML;
}

export function updateContact(contact) {
    const headerContact = document.getElementById('contact');

    const urlTemplates = {
        location: value => `https://maps.google.com/?q=$${encodeURIComponent(value)}`,
        email: value => `mailto:${encodeURIComponent(value)}`,
        phone: value => `tel:${encodeURIComponent(value)}`,
        website: value => `https://${encodeURIComponent(value)}`
    };

    const htmlContent = Object.entries(contact.address).map(([key, value]) => {
        const label = value.label; // Obtiene el label directamente del objeto
        const href = urlTemplates[key](value.content); // Obtiene el content para generar el href

        return `
            <p class="header__contact-item">
                <span class="header__contact-label">${label}:</span>
                <a class="header__contact-link header__contact-link--${key}" href="${href}" target="_blank" rel="noopener noreferrer">${value.content}</a>
            </p>
        `;
    }).join('');

    headerContact.innerHTML = `
        <h1 class="header__name">${contact.name}</h1>
        <address class="header__contact-address">
            ${htmlContent}
        </address>
    `;
}

export function updateSummary(summary) {
    const summarySection = document.getElementById('summary');

    const htmlContent = `
        <h2 class="main__section-title main__section-title--${summary.id}">${summary.label}</h2>
        <p class="main__section-content">${summary.content}</p>
    `;

    summarySection.innerHTML = htmlContent;
};

export function UpdateExperience(experience) {
    const experienceSection = document.getElementById('experience');

    const htmlContent = experience.list.map(category => `
        <ul class="main__experience-list">
            <li class="main__experience-item">
                <div class="main__experience-info">
                    <h3 class="main__experience-position">${category.position}</h3>
                    <p class="main__experience-dates">${category.dates}</p>
                    <p class="main__experience-company">${category.company}</p>
                    <p class="main__experience-location">${category.location}</p>
                </div>
                <ul class="main__experience-responsibilities-list">
                    ${category.responsibilities.map(item => `
                        <li class="main__experience-responsibility-item">${item}</li>
                    `).join('')}
                </ul>
            </li>
        </ul>
    `).join('');

    experienceSection.innerHTML = `
        <h2 class="main__section-title main__section-title--${experience.id}">${experience.label}</h2>
        ${htmlContent}
    `;
}

export function updateEducation(education) {
    const educationSection = document.getElementById('education');

    const htmlContent = education.map(category => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${category.id}">${category.label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${category.list.map(item => `
                        <li class="main__section-subitem">
                            <p class="main__section-subitem__sentence main__section-subitem__sentence--comma">
                                <span class="main__section-subitem__title">${item.title}</span>
                                <span class="main__section-subitem__institution">${item.institution}</span>
                                <span class="main__section-subitem__location">${item.location}</span>
                                <span class="main__section-subitem__dates">${item.dates}</span>
                            </p>
                        </li>
                    `).join('')}
                </ul>
            </li>
        </ul>
    `).join('');

    educationSection.innerHTML = htmlContent;
}

export function updateSkills(skills) {
    const skillsSection = document.getElementById('skills');

    const htmlContent = skills.map(category => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${category.id}">${category.label}</h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${category.list.map(item => `
                        <li class="main__section-subitem main__section-subitem--comma">${item}</li>
                    `).join('')}
                </ul>
            </li>
        </ul>
    `).join('');

    skillsSection.innerHTML = htmlContent;
}

export function updateFooter(contactName, label) {
    const elementFooter = document.getElementById('footer');

    const htmlContent = `
        <p class="footer__copyright">
            &copy; ${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    `;

    elementFooter.innerHTML = htmlContent;
}