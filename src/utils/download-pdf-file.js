import { generatePDFName } from "../services/pdf-filename-service.js";

export function downloadPDF(lang) {
    const headerName = document.getElementById("full_name").textContent;
    const documentTitle = document.title;
    const fileName = generatePDFName(headerName, lang);
 
    document.title = fileName;

    window.print();

    document.title = documentTitle;
}