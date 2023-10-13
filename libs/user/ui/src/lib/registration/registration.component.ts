import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, userActions } from '@ngbank/user/store';
import { Store } from '@ngrx/store';
import { PageComponent } from '@ngbank/ui';

@Component({
  selector: 'ngbank-registration',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  store = inject(Store);

  createAccount(user: User) {
    this.store.dispatch(userActions.createAccount({ user }));
  }
}
