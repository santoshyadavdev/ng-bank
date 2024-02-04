import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '@ngbank/ui';
import { Store } from '@ngrx/store';
import { userFeature, userActions } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-dashboard',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly store: Store = inject(Store);
  user = this.store.selectSignal(userFeature.selectUser);

  constructor() {}

  sendVerificationEmail() {
    if (this.user()?.emailVerification === false) {
      this.store.dispatch(userActions.sendEmailVerificationEmail());
    }
  }
}
