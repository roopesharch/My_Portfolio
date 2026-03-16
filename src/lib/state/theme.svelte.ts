import { browser } from '$app/environment';

// We create a class to manage the theme state
class ThemeState {
    isDark = $state(false);

    constructor() {
        if (browser) {
            // Initialize from localStorage on load
            const saved = localStorage.getItem('theme');
            this.isDark = saved === 'dark';
            this.updateDocument();
        }
    }

    toggle() {
        this.isDark = !this.isDark;
        if (browser) {
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            this.updateDocument();
        }
    }

    private updateDocument() {
        if (browser) {
            document.documentElement.classList.toggle('dark', this.isDark);
        }
    }
}

// Export a single instance to be used everywhere
export const theme = new ThemeState();