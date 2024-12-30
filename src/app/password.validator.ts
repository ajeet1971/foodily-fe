import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return { required: true };
  }

  // Regular expression for the validation
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const hasMinimumLength = value.length >= 8;

  const passwordValid =
    hasUpperCase && hasLowerCase && hasSymbol && hasMinimumLength;

  if (!passwordValid) {
    return { passwordStrength: true };
  }

  return null; // Return null if validation passes
}
