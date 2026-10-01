import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-suggest',
  styleUrl: './suggest.css',
  templateUrl: './suggest.html',
})
export class Suggest {
  isSubmitting = false;
  submitSuccess = false;

  suggestForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    lyrics: new FormControl('', Validators.required),
    submittedBy: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  onSubmit(){
    if(this.suggestForm.invalid){
      this.suggestForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.submitSuccess = false;
     
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.suggestForm.reset();
    }, 1000);

  }
}
