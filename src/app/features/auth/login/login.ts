import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { email } from '@angular/forms/signals';
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

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
      if (this.loginForm.invalid || this.isLoading) return;
      
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
            this.errorMessage = 'Login failed. Please check your details or try again.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again later.';
          }
        }
      });
    }
}
