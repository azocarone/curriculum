const THEME_KEY = 'user-theme-preference';

export function applyInitialTheme() {
    setTheme(resolveTheme());
}

export function toggleTheme() {
    const current = resolveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

function resolveTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return savedTheme ?? (prefersDark ? 'dark' : 'light');
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
}

function setTheme(theme) {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
}