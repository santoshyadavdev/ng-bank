import { Component, inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { userFeature } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-page',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    ToolbarComponent,
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnDestroy {
  @ViewChild(MatSidenav) matSideNav: MatSidenav | undefined;
  @Input() hideToolbar = false;
  @Input() fullscreenRight = false;

  @Input() set toggleSideNav(trigger$: Observable<void>) {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = trigger$.subscribe(() => this.matSideNav?.toggle());
  }

  readonly isAuthenticated$: Observable<boolean>;

  private _subscription: Subscription | undefined = undefined;

  private readonly store: Store = inject(Store);

  constructor() {
    this.isAuthenticated$ = this.store.select(
      userFeature.selectUserIsAuthenticated
    );
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
