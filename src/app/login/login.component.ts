import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../password.validator';
import { GlobalEmmiterServiceService } from '../services/global-emmiter-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ApiServiceService, ToastrService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUp: boolean = false;
  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiServiceService: ApiServiceService,
    private roter: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private globalEmmiterServiceService: GlobalEmmiterServiceService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group(
      {
        name: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [passwordValidator]],
        confirmPassword: [''],
      },
      { validator: this.isSignUp ? this.passwordMatchValidator : '' }
    ); // Custom validator to check if passwords match

    this.applyPasswordMatchValidator();
  }

  // Dynamically apply the passwordMatchValidator
  applyPasswordMatchValidator() {
    if (this.isSignUp) {
      this.authForm.setValidators(this.passwordMatchValidator);
    } else {
      this.authForm.clearValidators();
    }

    this.authForm.updateValueAndValidity(); // Update the form's validation state
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  // Toggle between Login and Sign Up forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.initForm();

    this.applyPasswordMatchValidator();
  }

  // Handle form submission
  async onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.isSignUp) {
      let payload: any = {
        email: this.authForm.get('email')?.value,
        userName: this.authForm.get('name')?.value,
        password: this.authForm.get('password')?.value,
      };
      await this.signin(payload);
    } else {
      let payload: any = {
        email: this.authForm.get('email')?.value,
        password: this.authForm.get('password')?.value,
      };
      await this.login(payload);
      console.log('Logged in with:', this.authForm.value);
    }
  }

  async login(payload: any) {
    try {
      let res = await this.apiServiceService.login(payload).toPromise();
      console.log(res);
      if (res?.status == 200) {
        localStorage.setItem('access_token', JSON.stringify(res.body.token));

        this.toastr.success('You are logged in sucessfully.', 'Success');
        // this.toaster.addMessage('success', 'You are logged in successfully!');
        this.globalEmmiterServiceService.userLoggedIn.next(true);
        this.roter.navigate(['/']);
      }
    } catch (e: any) {
      this.toastr.error(e.error.message);
    } finally {
      this.initForm();
    }
  }

  async signin(payload: any) {
    try {
      let res1 = await this.apiServiceService.signup(payload).toPromise();
      if (res1?.status == 200) {
        this.isSignUp = false;
        this.cd.detectChanges();
        this.toastr.success('User registered Successfully!', 'Success');
      } else {
        this.toastr.error(res1.error.message);
      }
    } catch (e: any) {
      this.toastr.error(e.error.message);
      // this.toastr.error(e.message);
      console.log(e);
    } finally {
      this.initForm();
    }
  }

  consoleForm() {
    console.log('form=================', this.authForm);
  }
}
