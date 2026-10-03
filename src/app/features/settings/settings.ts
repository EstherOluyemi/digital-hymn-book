import { Component, inject } from '@angular/core';
import { SettingsService } from '../../core/services/settings';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  private settingsService = inject(SettingsService);

  constructor(){
    this.settingsService.applySettings();  
  }

  get theme() {
    return this.settingsService.getTheme();
  }

  get textSize() {
    return this.settingsService.getTextSize();
  }

  changeTheme(theme: 'light' | 'dark' | 'system') {
    this.settingsService.setTheme(theme);
  }

  changeTextSize(size: 'small' | 'medium' | 'large') {
    this.settingsService.setTextSize(size);
  }

  resetSettings() {
    this.settingsService.resetSettings();
  }
  
}
