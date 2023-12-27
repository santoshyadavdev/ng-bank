import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'ngbank-root',
  template: '<router-outlet></router-outlet>',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
