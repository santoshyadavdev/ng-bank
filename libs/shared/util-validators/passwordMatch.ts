import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(newPassword: string, confirmNewPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (newPassword !== confirmNewPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}