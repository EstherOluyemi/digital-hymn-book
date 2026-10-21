import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { RouterLink, Router } from '@angular/router';

@Component({
  imports: [ ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  registerForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    email: ['', [
      Validators.required, 
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[\d\W_]).+$/)
    ]]
  });

  onSubmit() {
      if (this.isLoading) {
        return;
      }

      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.registerForm.getRawValue();

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success) {
              this.registerForm.reset();
              this.router.navigate(['/login'], {
                state: {
                  registrationSuccess: true
                }
              });
            } else {
            this.errorMessage =
              response.message || 'Registration failed. Please try again.';
          }
        },

        error: (error) => {
        this.isLoading = false;

        if (error.status === 409) {
          this.errorMessage =
            'An account with this email already exists.';
        } else if (error.status === 422) {
          this.errorMessage =
            'Some details are invalid. Please review your information.';
        } else if (error.status === 0) {
          this.errorMessage =
            'Unable to connect to the server. Check your internet connection.';
        } else {
          this.errorMessage =
            'Something went wrong. Please try again later.';
        }
      }
      });
    }

  checkSession(){
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        console.log('Session check successful', response);
      },
      error: (error) => {
        console.error('Session check failed:', error.status);
      }
    });
  }
}
