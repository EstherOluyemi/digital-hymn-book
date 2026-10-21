import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SuggestionService } from '../../core/services/suggestion';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-suggest',
  styleUrl: './suggest.css',
  templateUrl: './suggest.html',
})
export class Suggest {
  isSubmitting = false;
  submitSuccess = false;

  private suggestionService = inject(SuggestionService);
  errorMessage = '';

  suggestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    lyrics: new FormControl('', Validators.required),
    submittedBy: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  onSubmit(): void {
      if (this.suggestForm.invalid || this.isSubmitting) {
        this.suggestForm.markAllAsTouched();
        return;
      }

      this.isSubmitting = true;
      this.submitSuccess = false;
      this.errorMessage = '';

      const suggestion = {
        title: this.suggestForm.controls.title.value ?? '',
        author: this.suggestForm.controls.author.value ?? '',
        category: this.suggestForm.controls.category.value ?? '',
        lyrics: this.suggestForm.controls.lyrics.value ?? '',
        submittedBy: this.suggestForm.controls.submittedBy.value ?? '',
        email: this.suggestForm.controls.email.value ?? ''
      };

      this.suggestionService.submitSuggestion(suggestion).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.suggestForm.reset();
        },

        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;

          if (error.status === 429) {
            this.errorMessage =
              'Too many submissions. Please try again later.';
          } else if (error.status === 400 || error.status === 422) {
            this.errorMessage =
              'Please check your hymn details and try again.';
          } else {
            this.errorMessage =
              'Unable to submit your hymn. Please try again later.';
          }
        }
      });
    }
}
