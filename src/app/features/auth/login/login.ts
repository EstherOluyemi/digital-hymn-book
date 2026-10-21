import { 
  Component,
  inject,
  viewChild,
  ElementRef,
  afterNextRender
 } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  errorMessage = '';
  showPassword = false;
  isLoading = false;
  registrationSuccess = false;
  googleButton = viewChild<ElementRef<HTMLDivElement>>('googleButton');

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
      if (this.isLoading) return;

      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }
      
      this.errorMessage = '';
      this.isLoading = true;

      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success && response.data?.user) {
            this.authService.setCurrentUser(response.data.user);
            console.log('Login successful');

            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
          }
        },

        error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage =
            'Invalid email or password. Please try again.';
        } else if (error.status === 422) {
          this.errorMessage =
            'Please check your login details and try again.';
        } else if (error.status === 0) {
          this.errorMessage =
            'Unable to connect to the server. Please try again.';
        } else {
          this.errorMessage =
            'Something went wrong. Please try again later.';
        }
      }
      });
    }

    private initializeGoogleButton(): void {
      const google = window.google;
      const buttonElement = this.googleButton()?.nativeElement;

      if (!google || !buttonElement) {
        console.warn('Google Sign-In is not ready.');
        return;
      }

      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: { credential: string }) => {
          this.onGoogleLogin(response.credential);
        }
      });

      google.accounts.id.renderButton(buttonElement, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: 280
      });
    }

    constructor() {
        const navigation = this.router.currentNavigation();

        this.registrationSuccess =
          navigation?.extras.state?.['registrationSuccess'] === true;

        afterNextRender(() => {
        if (window.google) {
          this.initializeGoogleButton();
          return;
        }

        const googleScript = document.querySelector<HTMLScriptElement>(
          'script[src="https://accounts.google.com/gsi/client"]'
        );

        googleScript?.addEventListener(
          'load',
          () => this.initializeGoogleButton(),
          { once: true }
        );
      });
        }

      onGoogleLogin(idToken: string): void {
      if (this.isLoading) return;

      this.errorMessage = '';
      this.isLoading = true;

      this.authService.googleLogin(idToken).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success && response.data?.user) {
            this.authService.setCurrentUser(response.data.user);
            this.router.navigate(['/']);
          } else {
            this.errorMessage =
              response.message || 'Google login failed. Please try again.';
          }
        },

        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          if (error.status === 400 || error.status === 401) {
            this.errorMessage =
              'Google authentication failed. Please try signing in again.';
          } else {
            this.errorMessage =
              'Something went wrong. Please try again later.';
          }
        }
      });
    }
}

