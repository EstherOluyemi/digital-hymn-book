import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Auth } from '../../../core/services/auth';

@Component({
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);

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

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    const formData = this.registerForm.getRawValue();

    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response.message);
      },
      error: (error) => {
        console.error('Registration failed:', error);
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
