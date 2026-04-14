import { generatePDFName } from "../services/pdf-filename-service.js";

export function downloadPDF(full_name, lang) {
    let originalTitle = document.title;
    
    try {
        const fileName = generatePDFName(full_name, lang);
        document.title = fileName;

        // Promesa para envolver el proceso y hacerlo más "limpio"
        setTimeout(() => {
            window.print();
            // Restaurar después de que se abra el cuadro de diálogo
            document.title = originalTitle;
        }, 100);

    } catch (error) {
        console.error("Error al generar PDF:", error);
        document.title = originalTitle; // Asegurar restauración en caso de fallo
    }
}