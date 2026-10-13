import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegisterRequest, RegisterResponse, User } from '../models/auth.model';
import { Observable, switchMap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, tap, throwError, finalize } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    private readonly _currentUser = signal<User | null>(null);
    readonly currentUser = this._currentUser.asReadonly();

    private readonly _sessionChecked = signal(false);
    readonly sessionChecked = this._sessionChecked.asReadonly();

    register(data: RegisterRequest) {
        return this.getCsrfToken().pipe(
            switchMap(() => {
            return this.http.post<RegisterResponse>(
                `${this.apiUrl}/auth/register`,
                data
            );
            })
        );
    }

    getCurrentUser(): Observable<User | null> {
        return this.http.get<{
            success: boolean;
            data: {
            user: User;
            };
        }>(`${this.apiUrl}/auth/me`).pipe(
            map(response => response.data.user),
            tap(user => this._currentUser.set(user)),
            catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this._currentUser.set(null);
                return of(null);
            }

            return throwError(() => error);
            }),
            finalize(() => this._sessionChecked.set(true))
        );
    }

    getCsrfToken(){
        return this.http.get<{
            success: boolean;
            data: {
                csrfToken: string;
            };
        }>(`${this.apiUrl}/auth/csrf-token`);
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.getCsrfToken().pipe(
            switchMap((response) => {
            return this.http.post<LoginResponse>(
                `${this.apiUrl}/auth/login`,
                data,
                {
                headers: {
                    'X-CSRF-Token': response.data.csrfToken
                }
                }
            );
            })
        );
    }
    logout(): Observable<unknown> {
        return this.getCsrfToken().pipe(
            switchMap((response) =>
            this.http.post<unknown>(
                `${this.apiUrl}/auth/logout`,
                {},
                {
                headers: {
                    'X-CSRF-Token': response.data.csrfToken
                }
                }
            )
            )
        );
    }

    setCurrentUser(user: User | null): void {
        this._currentUser.set(user);
    }
}
