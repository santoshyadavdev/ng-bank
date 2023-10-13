import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, userActions } from '@ngbank/user/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngbank-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  store = inject(Store);

  createAccount(user: User) {
    this.store.dispatch(userActions.createAccount({ user }));
  }
}
