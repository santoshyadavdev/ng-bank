import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'ngbank-toolbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    UserAvatarComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  readonly title = 'ngbank';

  @Output() menuButtonClick = new EventEmitter<void>();
  @Input() showUserAvatar = false;
}
