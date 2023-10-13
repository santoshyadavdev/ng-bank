import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FrontPageComponent } from '../front-page/front-page.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm } from '../_models/login-form.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ngbank-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    FrontPageComponent,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;

  readonly form: FormGroup<LoginForm>;

  private readonly fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
