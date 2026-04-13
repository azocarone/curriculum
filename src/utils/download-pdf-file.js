import { generatePDFName } from "../services/pdf-filename-service.js";

export function downloadPDF(lang) {
    let originalTitle = document.title;
    
    try {
        const element = document.getElementById("full_name");
        if (!element) throw new Error("No se encontró el elemento full_name");

        const fileName = generatePDFName(element.textContent, lang);
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