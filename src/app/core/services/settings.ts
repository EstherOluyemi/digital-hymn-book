import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private theme = signal<'light' | 'dark' | 'system'>(this.loadTheme());
    private textSize = signal<'small' | 'medium' | 'large'>(this.loadTextSize());

    getTheme(){
        return this.theme();
    }

    setTheme(theme: 'light' | 'dark' | 'system'){
        this.theme.set(theme);
        localStorage.setItem('theme', theme);

        document.body.classList.toggle(
            'dark-theme',
            theme === 'dark' ||
            (theme === 'system' && this.isSystemDark())
        );
    }
    getTextSize(){
        return this.textSize();
    }
    setTextSize(size: 'small' | 'medium' | 'large'){
        this.textSize.set(size);
        localStorage.setItem('textSize', size);

        document.body.classList.remove(
        'text-small',
        'text-medium',
        'text-large'
    );

    document.body.classList.add(`text-${size}`);

    }

    private loadTheme(): 'light' | 'dark' | 'system' {
        const savedTheme = localStorage.getItem('theme');

        if (
            savedTheme === 'light' ||
            savedTheme === 'dark' ||
            savedTheme === 'system'
        ) {
            return savedTheme;
        }
        return 'light';
    }

    private loadTextSize(): 'small' | 'medium' | 'large' {
        const savedSize = localStorage.getItem('textSize');

        if(
            savedSize === 'small' ||
            savedSize === 'medium' ||
            savedSize === 'large'
        ) {
            return savedSize;
        }
        return 'medium';
    }
    applySettings() {
            document.body.classList.toggle(
            'dark-theme',
            this.theme() === 'dark' ||
            this.theme() === 'system' && this.isSystemDark()
        );

        document.body.classList.remove(
            'text-small',
            'text-medium',
            'text-large'
        );

        document.body.classList.add(
            `text-${this.textSize()}`
        );
    }

    resetSettings(){
        this.setTheme('light');
        this.setTextSize('medium');
    }

    private isSystemDark():  boolean {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
