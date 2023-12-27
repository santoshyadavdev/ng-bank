import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '@ngbank/ui';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, userFeature } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-dashboard',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  readonly user$: Observable<User | null>;

  private readonly store: Store = inject(Store);

  constructor() {
    this.user$ = this.store.select(userFeature.selectUser);
  }
}
