import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';

export type ApiTextSize = 'sm' | 'md' | 'lg';
export type ApiTheme = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: ApiTheme;
  defaultTextSize: ApiTextSize;
  rememberRecentlyViewed: boolean;
  keepScreenAwake: boolean;
  serifLyrics: boolean;
  showVerseNumbers: boolean;
}

interface PreferencesResponse {
  success: boolean;
  data: UserPreferences;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(Auth);
  private readonly url = `${environment.apiUrl}/users/me/preferences`;

  getPreferences(): Observable<PreferencesResponse> {
    return this.http.get<PreferencesResponse>(this.url);
  }

  updatePreferences(changes: Partial<Pick<UserPreferences, 'theme' | 'defaultTextSize'>>): Observable<PreferencesResponse> {
    return this.auth.getCsrfToken().pipe(
      switchMap(({ data }) =>
        this.http.patch<PreferencesResponse>(this.url, changes, {
          headers: { 'X-CSRF-Token': data.csrfToken }
        })
      )
    );
  }
}
