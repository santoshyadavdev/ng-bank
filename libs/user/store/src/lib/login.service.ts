import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  constructor() {}

  createAccount(user: User) {
    return this.http.post(`${environment.apiEndpoint}/account`, {
      userId: user.userId,
      email: user.email,
      password: user.password,
      name: user.name,
    });
  }

  emailLogin(userName: string, password: string) {
    return this.http.post<User>(
      `${environment.apiEndpoint}/account/sessions/email`,
      {
        email: userName,
        password: password,
      }
    );
  }

  creatJWTToken() {
    return this.http.post(`${environment.apiEndpoint}/account/jwt`, {});
  }

  logout() {
    return this.http.delete(`${environment.apiEndpoint}/account/sessions`);
  }
}
