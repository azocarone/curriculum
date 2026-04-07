export function getInitialLanguage() {
    const detectedLang = navigator.language.slice(0, 2);
    const supportedLangs = ['es', 'en'];
    return supportedLangs.includes(detectedLang) ? detectedLang : 'es';
}