const SUPPORTED_LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';

export function getInitialLanguage(supported = SUPPORTED_LANGS) {
    const detectedLang = navigator.language.slice(0, 2);
    
    return supported.includes(detectedLang) ? detectedLang : DEFAULT_LANG;
}