import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '@ngbank/environment';

@Component({
  selector: 'ngbank-user-avatar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  @Input() width?: number;
  @Input() height?: number;
  @Input() background = 'f8b500';

  get avatarApiUrl(): string {
    let avatarApiUrl = `${environment.apiEndpoint}/avatars/initials?background=${this.background}`;

    if (this.width) {
      avatarApiUrl += `&width=${this.width}`;
    }

    if (this.height) {
      avatarApiUrl += `&height=${this.height}`;
    }

    return avatarApiUrl;
  }
}
