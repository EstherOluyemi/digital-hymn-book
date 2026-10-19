import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';
import { switchMap } from 'rxjs';

export interface HymnSuggestionRequest {
  title: string;
  author: string;
  category: string;
  lyrics: string;
  submittedBy: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authService = inject(Auth);

  submitSuggestion(suggestion: HymnSuggestionRequest) {
        return this.authService.getCsrfToken().pipe(
            switchMap((response) => {
            return this.http.post(
                `${this.apiUrl}/hymn-suggestions`,
                suggestion,
                {
                headers: {
                    'X-CSRF-Token': response.data.csrfToken
                }
                }
            );
            })
        );
        }
}