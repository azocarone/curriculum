import { generatePDFName } from '@shared/utils/pdf-filename';

export function printCV(fullName, lang) {
    const originalTitle = document.title;
    let restored = false;

    const restore = () => {
        if (restored) return;
        restored = true;

        document.title = originalTitle;
        window.removeEventListener('afterprint', restore);
    };

    try {
        const fileName = generatePDFName(fullName, lang);
        document.title = fileName;

        window.addEventListener('afterprint', restore);
        window.print();

        // fallback por si afterprint no se dispara
        setTimeout(restore, 2000);

    } catch (error) {
        console.error("Error al imprimir CV:", error);
        restore();
    }
}