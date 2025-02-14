import { setupLanguage } from './languageService.js';

async function initialize() {
    const userLanguage = navigator.language.slice(0, 2);
    await setupLanguage(userLanguage);

    const menuLink = document.getElementById('menuLink');
    menuLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const targetLanguage = menuLink.textContent.trim().includes('English') ? 'en' : 'es';
        await setupLanguage(targetLanguage)
    })
}

initialize();