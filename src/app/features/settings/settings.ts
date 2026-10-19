import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../core/services/auth';
import { PreferencesService, ApiTextSize } from '../../core/services/preferences';
import { SettingsService } from '../../core/services/settings';

type TextSize = 'small' | 'medium' | 'large';
type Theme = 'light' | 'dark' | 'system';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  private readonly settingsService = inject(SettingsService);
  private readonly preferencesService = inject(PreferencesService);
  private readonly auth = inject(Auth);

  isLoading = false;
  isSaving = false;
  feedback = '';
  errorMessage = '';

  constructor() {
    this.settingsService.applySettings();
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: user => {
        if (user) this.loadPreferences();
      },
      error: () => {
        this.errorMessage = 'Could not verify your session. Your local settings are still available.';
      }
    });
  }

  get theme(): Theme {
    return this.settingsService.getTheme();
  }

  get textSize(): TextSize {
    return this.settingsService.getTextSize();
  }

  private loadPreferences(): void {
    this.isLoading = true;
    this.preferencesService.getPreferences().subscribe({
      next: ({ data }) => {
        if (data.theme === 'light' || data.theme === 'dark' || data.theme === 'system') {
          this.settingsService.setTheme(data.theme);
        }
        const sizes: Record<ApiTextSize, TextSize> = {
          sm: 'small', md: 'medium', lg: 'large'
        };
        if (data.defaultTextSize in sizes) {
          this.settingsService.setTextSize(sizes[data.defaultTextSize]);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Could not load your saved preferences. Your local settings are still available.';
      }
    });
  }

  changeTheme(theme: Theme): void {
    if (this.isSaving || this.isLoading) return;
    this.save({ theme }, () => this.settingsService.setTheme(theme));
  }

  changeTextSize(size: TextSize): void {
    if (this.isSaving || this.isLoading) return;
    const sizes: Record<TextSize, ApiTextSize> = {
      small: 'sm', medium: 'md', large: 'lg'
    };
    this.save({ defaultTextSize: sizes[size] }, () => this.settingsService.setTextSize(size));
  }

  resetSettings(): void {
    if (this.isSaving || this.isLoading) return;
    this.save({ theme: 'light', defaultTextSize: 'md' }, () => this.settingsService.resetSettings());
  }

  private save(
    changes: { theme?: Theme; defaultTextSize?: ApiTextSize },
    apply: () => void
  ): void {
    this.errorMessage = '';
    this.feedback = '';
    if (!this.auth.currentUser()) {
      apply();
      this.feedback = 'Settings saved on this device. Sign in to sync them to your account.';
      return;
    }
    this.isSaving = true;
    this.preferencesService.updatePreferences(changes).subscribe({
      next: () => {
        apply();
        this.isSaving = false;
        this.feedback = 'Preferences saved successfully.';
      },
      error: (error: HttpErrorResponse) => {
        this.isSaving = false;
        this.errorMessage = error.status === 422
          ? 'The server rejected this preference value. Please check the API settings.'
          : 'Could not save preferences. Please try again.';
      }
    });
  }
}
