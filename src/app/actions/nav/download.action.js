import { printCV } from '@shared/ui/print/print.service';

export function downloadAction({ fullName, lang }, el, e, closeMenu) {
    // Si es un link de JS (href=#), se ejecuta la función
    if (el.getAttribute('href') === '#') {
        e.preventDefault();
        printCV(fullName, lang);
    }

    // En cualquier caso (link real o función), se cierra el menú
    closeMenu();
}