import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { userActions } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  store = inject(Store);

  emailLoign(userName: string, password: string) {
    this.store.dispatch(userActions.emailLogin({ userName, password }));
  }
}
