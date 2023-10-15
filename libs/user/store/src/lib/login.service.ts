import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { User } from './user';
import { UserSession } from './session';
import { Observable } from 'rxjs';

interface Token {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  createAccount(user: User) {
    return this.http.post<User>(`${environment.apiEndpoint}/account`, {
      userId: user.userId,
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

  emailLoginV2(
    userName: string,
    password: string
  ): Observable<HttpResponse<UserSession>> {
    return this.http.request<UserSession>(
      'POST',
      `${environment.apiEndpoint}/account/sessions/email`,
      {
        body: {
          email: userName,
          password: password,
        },
        observe: 'response',
      }
    );
  }

  getCurentAccount() {
    return this.http.get<User>(`${environment.apiEndpoint}/account`);
  }

  logout() {
    return this.http.delete(`${environment.apiEndpoint}/account/sessions`, {});
  }
}
