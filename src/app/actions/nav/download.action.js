import { downloadPDF } from '@shared/utils/download-pdf-file';

export function downloadAction({ full_name, lang }, el, e, closeMenu) {
    // Si es un link de JS (href=#), se ejecuta la función
    if (el.getAttribute('href') === '#') {
        e.preventDefault();
        downloadPDF(full_name, lang);
    }

    // En cualquier caso (link real o función), se cierra el menú
    closeMenu();
}