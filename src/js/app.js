async function setupLanguage(language){
    const { cv } = await loadLanguage(language);

    if (cv) applyTranslations(language, cv);
}

function setupEventListener() {
    const menuLink = document.getElementById('menuLink');
    
    menuLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const targetLanguage = menuLink.textContent.trim().includes('English') ? 'en' : 'es';
        setupLanguage(targetLanguage)
    });
}

async function loadLanguage(language) {
    try {
        const { cv } = await import(`../assets/js/${language}.js`);
        return { cv };
    } catch (error) {
        alert(`Error: Falta traducción para el idioma '${language}'.`);
        return { cv: undefined };
    }
}

function applyTranslations(language, cv) {
    updateNavigationMenu(language);
    updateHeader(cv.profile);
    updateExperience(cv.sections.experience);
    updateEducation(cv.sections.education);
    updateSkills(cv.sections.skills);
    updateFooter(cv.sections.footer, cv.profile.name)
};

function updateNavigationMenu(language) {
    const navigationElements = document.querySelectorAll('.header__navigation-menu-link');
    const downloadUrls = {
        es: './assets/pdf/cv_jose_azocar_es.pdf',
        en: './assets/pdf/cv_jose_azocar_en.pdf'
    };
    const navigationTexts = {
        es: ['Descargar', 'English'],
        en: ['Download', 'Español']
    };

    // Iterar sobre los elementos y actualizarlos
    for (const [index, element] of navigationElements.entries()) {
        updateNavigationElement(element, index, downloadUrls[language], navigationTexts[language]);
    }
}

// Función para actualizar un elemento individual del menú de navegación
function updateNavigationElement(element, index, url, texts) {
    const icon = element.querySelector('i');
    const newText = ` ${texts[index]}`; // Espacio antes del texto

    // Actualizar solo si el contenido ha cambiado
    if (element.textContent.trim() !== newText.trim()) {
        element.textContent = ''; // Limpiar contenido previo
        if (icon) {
            element.appendChild(icon); // Reinsertar el ícono
        }
        element.append(newText); // Agregar el texto
    }

    // Actualizar el atributo href si es un enlace de descarga
    if (element.dataset.download === 'true') {
        element.href = url;
    }
}

function updateHeader(profile) {
    const header = document.querySelector('.header');
    const { name, contact: { location, url, phone, email }, summary } = profile;
    const contactInfo = `
        <span>${location}</span> · 
        <a href="https://${url}" target="_blank">${url}</a> · 
        <span>${phone}</span> · 
        <a href="mailto:${email}">${email}</a>
    `;
 
    header.querySelector('h1').textContent = name;
    header.querySelector('p:first-of-type').innerHTML = contactInfo;
    header.querySelector('p:last-of-type').textContent = summary
};

function updateExperience(experience) {
    const experienceSection = document.getElementById('experience');
    
    experienceSection.querySelector('h2').textContent = experience.label;

    document.querySelectorAll('.job').forEach(job => {
        job.remove();
    });
    
    experience.list.forEach(job => {
        const article = document.createElement('article');
        article.classList.add('job');
        article.innerHTML = `
            <h3>${job.company}<span class="location">${job.location}</span></h3>
            <p>${job.position}<span class="dates">${job.dates}</span></p>
            <ul>
                ${job.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
            </ul>
        `;
        experienceSection.appendChild(article)
    })
};

function updateEducation(education) {
    const educationSection = document.getElementById('education');

    educationSection.querySelector('h2').textContent = education.label;

    document.querySelectorAll('.education').forEach(job => {
        job.remove();
    });

    education.list.forEach(degree => {
        const article = document.createElement('article');
        article.classList.add('education');
        article.innerHTML = `
            <h3>${degree.institution}<span class="location">${degree.location}</span></h3>
            <p>${degree.title}<span class="dates">${degree.dates}</span></p>
        `;
        educationSection.appendChild(article)
    })
};

function updateSkills(skills) {
    const skillsSection = document.getElementById('skills');

    skillsSection.querySelector('h2').textContent = skills.label;

     document.querySelectorAll('.skills').forEach(job => {
        job.remove();
    });

    skills.list.forEach(skill => {
        const article = document.createElement('article');
        article.classList.add('skills');
        article.innerHTML = `
            <h3>${skill.label}</h3>
            <ul>
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        skillsSection.appendChild(article)
    })
};

function updateFooter(footer, profileName) {
    const footerSection = document.querySelector('.footer');
    const footerText = `
        &copy; ${new Date().getFullYear()} ${profileName}. ${footer.label}
    `;
    
    footerSection.querySelector('p').innerHTML = footerText;
}

(async () => {
    const userLanguage = navigator.language.slice(0, 2);
    
    setupLanguage(userLanguage);
    setupEventListener()
})();