import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FrontPageComponent } from '@ngbank/ui';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { PasswordResetForm } from '../_models/password-reset-form.model';
import { userActions } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-reset-password',
  standalone: true,
  imports: [
    MatInputModule,
    RouterLink,
    MatButtonModule,
    FrontPageComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);

  hidePassword = true;

  readonly form: FormGroup<PasswordResetForm>;

  get email() {
    return this.form.get('email');
  }

  
  constructor(){
    this.form = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      })
    });
  }

  resetPassword(){
    if(!!this.form.value.email){
      this.store.dispatch(
        userActions.resetPassword({
          email: this.form.value.email
        })
      )
    }
  }

}
