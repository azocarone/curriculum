import { setupLanguage } from './languageService.js';

async function initialize() {
    const browserLanguage = navigator.language.slice(0, 2);
    await setupLanguage(browserLanguage);
}

initialize();