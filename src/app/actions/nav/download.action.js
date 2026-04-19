import { printCV } from '@shared/ui/print/print.service';

export function downloadAction(ctx, el, e, closeMenu) {
    // Si es un link de JS (href=#), se ejecuta la función
    if (el.getAttribute('href') === '#') {
        e.preventDefault();

        const fullName = ctx.full_name;
        const lang = ctx.getLang();

        printCV(fullName, lang);
    }

    // En cualquier caso (link real o función), se cierra el menú
    closeMenu();
}