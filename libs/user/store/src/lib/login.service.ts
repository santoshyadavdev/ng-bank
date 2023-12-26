import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { User } from './user';
import { UserSession } from './session';
import { Token } from './token';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  location = inject(Location);

  createAccount(user: User) {
    return this.http.post<User>(`${environment.apiEndpoint}/account`, {
      userId: 'unique()',
      email: user.email,
      password: user.password,
      name: user.name,
    });
  }

  emailLogin(userName: string, password: string) {
    return this.http.post<UserSession>(
      `${environment.apiEndpoint}/account/sessions/email`,
      {
        email: userName,
        password: password,
      }
    );
  }

  getCurentAccount() {
    return this.http.get<User>(`${environment.apiEndpoint}/account`);
  }

  createEmailVerification() {
    return this.http.post<Token>(
      `${environment.apiEndpoint}/account/verification`,
      {
        url: `${this.location.path()}`,
      }
    );
  }

  verifyEmail(userid: string, token: string) {
    return this.http.put<Token>(
      `${environment.apiEndpoint}/account/verification`,
      {
        userId: userid,
        secret: token,
      }
    );
  }

  creatAuth0Session() {
    return this.http.get(
      `${environment.apiEndpoint}/account/sessions/oauth2/auth0`
    );
  }

  logout() {
    return this.http.delete(`${environment.apiEndpoint}/account/sessions`, {});
  }
}
