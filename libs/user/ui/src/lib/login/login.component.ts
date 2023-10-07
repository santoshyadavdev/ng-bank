import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '@ngbank/user/store';

@Component({
  selector: 'ngbank-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginService = inject(LoginService);

  emailLoign(userName: string, password: string) {
    this.loginService.emailLogin(userName, password).subscribe((user) => {
      console.log(user);
    });
  }
}
