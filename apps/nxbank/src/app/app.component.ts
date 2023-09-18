import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, AsyncPipe, NgIf],
  selector: 'ngbank-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'nxbank';
  vm$: Observable<{ isXSmallScreen: boolean }>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.vm$ = breakpointObserver.observe([
      Breakpoints.XSmall
    ]).pipe(
      map(() => ({ isXSmallScreen: breakpointObserver.isMatched(Breakpoints.XSmall)}))
    );
  }

}
