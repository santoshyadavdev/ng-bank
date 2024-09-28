import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PageComponent } from '@ngbank/ui';
import { Store } from '@ngrx/store';
import { User, userFeature, userActions } from '@ngbank/user/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'ngbank-dashboard',
  standalone: true,
  imports: [CommonModule, PageComponent, MatSnackBarModule, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly store: Store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);
  user = this.store.selectSignal(userFeature.selectUser);

  constructor() {}

  sendVerificationEmail() {
    if (this.user()?.emailVerification === false) {
      this.store.dispatch(userActions.sendEmailVerificationEmail());
      this.snackBar.open('Verification email sent!', 'cancel');
    }
  }
}
