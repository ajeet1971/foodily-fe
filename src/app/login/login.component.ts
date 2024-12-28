import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUp: boolean = false;
  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  // Initialize the form with a password and confirm password validation
  initForm() {
    this.authForm = this.fb.group(
      {
        name: ['', this.isSignUp ? [Validators.required] : []],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    ); // Custom validator to check if passwords match
  }

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    // If passwords don't match, return a mismatch error
    if (password !== confirmPassword) {
      return { mismatch: true };
    }

    // If passwords match, return null (no error)
    return null;
  }

  // Toggle between Login and Sign Up forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.initForm();
  }

  // Handle form submission
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.isSignUp) {
      console.log('Signed up with:', this.authForm.value);
    } else {
      console.log('Logged in with:', this.authForm.value);
    }
  }
}
