# Currículum

Prototipo funcional de una página web dinámica para un Currículum Vitae (CV) con diseño tipo Harvard, compatible con Sistemas de Seguimiento de Candidatos (ATS) y soporte multilingüe. Utiliza módulos de JavaScript para gestionar la carga de idiomas, la aplicación de traducciones y las actualizaciones de la interfaz de usuario.

<div align="center"><img src="assets/img/screenshot.gif" alt="Currículum" width="683" height="384" style="border-radius: 10px;"></div>

## Característícas

- **Cambio Dinámico de Idioma**: El sitio web detecta automáticamente el idioma del navegador del usuario y muestra el CV en ese idioma. Los usuarios también pueden cambiar entre los idiomas disponibles mediante un enlace en el menú de navegación.
- **Diseño Modular**: El código base está organizado en módulos para la carga de idiomas (`languageService.js`), la aplicación de traducciones (`translationManager.js`) y las actualizaciones de la interfaz de usuario (`uiRenderer.js`), lo que promueve el mantenimiento y la reutilización.
- **Operaciones Asíncronas**: Utiliza `async/await` para manejar operaciones asíncronas como la carga de archivos de idioma, lo que garantiza una experiencia de usuario fluida.
- **Actualizaciones Limpias de la UI**: El módulo `uiRenderer.js` maneja todas las manipulaciones del DOM, manteniendo la lógica de traducción y carga de idiomas separada. Actualiza el contenido de manera eficiente solo cuando es necesario, minimizando los reflujos y las repinturas.
- **Manejo de Errores**: Incluye el manejo de errores para los archivos de idioma faltantes, proporcionando alertas informativas al usuario.
- **Contenido Basado en Datos**: El contenido del CV (perfil, experiencia, educación, habilidades, pie de página) se almacena en archivos JavaScript separados (por ejemplo, `es.js`, `en.js`) para cada idioma, lo que facilita la adición o modificación de traducciones.

## Tecnologías y Metodologías empleadas

- HTML, CSS, y JavaScript;
- Git y GitHub;
- Block Element Modifier (BEM), Estructura de carpetas, Módulos ES6. 

## Instalación y ejecución

1. Clonar este repositorio:
   
   ```bash
   git clone https://github.com/azocarone/curriculum.git
   ```

2. Abrir el archivo `index.html` en el navegador de su preferencia.

## Uso

1. **Incluir Scripts**: Incluye los archivos JavaScript necesarios en tu HTML. Asegúrate de incluir el script principal (por ejemplo, `app.js`) y todos los módulos.
2. **Archivos de Idioma**: Crea archivos JavaScript para cada idioma (por ejemplo, `es.js`, `en.js`) en el directorio `assets/js`. Estos archivos deben exportar un objeto `cv` que contenga los datos del CV para ese idioma. La estructura de este objeto debe coincidir con el formato esperado utilizado en la función `applyTranslations`.
3. **Estructura HTML**: Asegúrate de que tu HTML tenga elementos con las clases e ID apropiados que se utilizan en el módulo `uiRenderer.js` para actualizar el contenido (por ejemplo, `.header`, `#experience`, `#education`, `#skills`, `.footer`). El menú de navegación debe tener un enlace con el ID `menuLink` para activar el cambio de idioma.
4. **Inicializar**: Llama a la función `initialize()` en tu script principal para iniciar el proceso de localización. Esta función detectará el idioma del usuario y cargará los datos del CV apropiados.

## HTML Template

``` html 

<body>
    <header class="header">
        <nav class="header__nav">
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
        </nav>
        <div class="header__contact" id="contact">
            <h1 class="header__name">${contact.name}</h1>
            <address class="header__contact-address">
                <p class="header__contact-item">
                    <span class="header__contact-label">${label}:</span>
                    <a class="header__contact-link header__contact-link--${key}" href="${href}" target="_blank" rel="noopener noreferrer">${value.content}</a>
                </p>
            </address>
        </div>
    </header>

    <main class="main">
        <!-- Sección Resumen Profesional -->
        <section class="main__section" id="summary">
            <h2 class="main__section-title main__section-title--${id}">${label}</h2>
            <p class="main__section-content">${content}</p>
        </section>

        <!-- Sección Experiencia Laboral -->
        <section class="main__section" id="experience">
            <h2 class="main__section-title main__section-title--${id}">${label}</h2>
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
        </section>

        <!-- Sección Educación -->
        <section class="main__section main__section--flex" id="education">
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
        </section>

        <!-- Sección Habilidades -->
        <section class="main__section main__section--flex" id="skills">
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
        </section>
    </main>

    <footer class="footer" id="footer">
        <p class="footer__copyright">
            &copy; ${new Date().getFullYear()} ${contactName}. ${label}
        </p>
    </footer>
</body>

``` 

## Código Principal JS

``` js

import { setupLanguage } from './languageService.js';

async function initialize() {
    const browserLanguage = navigator.language.slice(0, 2);
    await setupLanguage(browserLanguage);
}

initialize();

```

---
<div align="right"><br>😉 azocarone 😄</div>