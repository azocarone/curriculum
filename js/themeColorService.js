const THEME_KEY = 'user-theme-preference';

export function applyInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
}

export function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

export function initThemeEventListener() {
    // Escuchar en el header porque el nav se regenera dinámicamente
    const header = document.querySelector('.header');
    
    header.addEventListener('click', (event) => {
        // Buscar el enlace con id "themeToggle" (ver paso siguiente)
        const themeToggle = event.target.closest('#themeToggle');
        if (themeToggle) {
            event.preventDefault();
            toggleTheme();
        }
    });
}