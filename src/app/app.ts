import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { SettingsService } from './core/services/settings';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('digital-hymn-book');

  private settingsService = inject(SettingsService);

  private authService = inject(Auth);

  constructor() {
    this.settingsService.applySettings();

    this.authService.getCurrentUser().subscribe({
        error: (error) => {
          console.error('Unable to restore session:', error);
        }
      });
  }
}
