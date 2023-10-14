import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, userActions } from '@ngbank/user/store';
import { Store } from '@ngrx/store';
import { FrontPageComponent, PageComponent } from '@ngbank/ui';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationForm } from '../_models/registration-form.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ngbank-registration',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    FrontPageComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hidePassword = true;

  readonly form: FormGroup<RegistrationForm>;

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);

  constructor() {
    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(128)],
        nonNullable: true,
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(8)],
        nonNullable: true,
      }),
    });
  }

  register() {
    if (
      !!this.form.value.name &&
      !!this.form.value.email &&
      !!this.form.value.password
    ) {
      const user: User = {
        $id: '',
        userId: uuidv4(),
        name: this.form.value.name,
        password: this.form.value.password,
        email: this.form.value.email,
      };

      this.store.dispatch(userActions.createAccount({ user }));
    }
  }
}
