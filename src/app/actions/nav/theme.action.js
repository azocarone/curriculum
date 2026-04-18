import { toggleTheme } from '@/shared/ui/theme/theme.service.js';

export function themeAction(_, el, e) {
    e.preventDefault();
    toggleTheme();
    // closeMenu(); // Descomentar para cerrar al cambiar el tema
}