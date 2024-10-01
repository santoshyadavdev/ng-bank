import { FormControl } from '@angular/forms';

export interface PasswordUpdateForm {
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;

  }
  