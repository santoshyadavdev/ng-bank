import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordUpdateForm } from '../_models/password-update.model';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FrontPageComponent } from '@ngbank/ui';
import { MatIconModule } from '@angular/material/icon';
import { userActions } from '@ngbank/user/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngbank-update-password',
  standalone: true,
  imports: [
    MatInputModule,
    RouterLink,
    MatButtonModule,
    FrontPageComponent,
    ReactiveFormsModule,
    MatIconModule
  ],

  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);

  hidePassword = true;

  readonly form: FormGroup<PasswordUpdateForm>;
  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmNewPassword() {
    return this.form.get('confirmNewPassword');
  }


  constructor(private route: ActivatedRoute) {
    this.form = this.fb.group({
      newPassword: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      confirmNewPassword: this.fb.control('',
        {
          validators: [Validators.required],
          nonNullable: true,
        })
    });
  }

  updatePassword() {

    let userId = '';
    let secret = '';

    this.route.queryParams.subscribe(queryParams => {
      userId = queryParams['userId'];
      secret = queryParams['secret'];
    });

    console.log('queryParams', userId, secret);
      this.store.dispatch(
        userActions.updatePassword({
          userId: userId,
          secret: secret,
          password: this.form.controls.newPassword.value.toString()
        })
      )
  }

  

}