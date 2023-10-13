import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpHeader = new HttpHeaders().set(
    'X-Appwrite-Project',
    environment.projectId
  );
  http = inject(HttpClient);

  constructor() {}

  createAccount(user: User) {
    return this.http.post<User>(
      `${environment.apiEndpoint}/account`,
      {
        userId: user.userId,
        email: user.email,
        password: user.password,
        name: user.name,
      },
      {
        headers: this.httpHeader,
      }
    );
  }

  emailLogin(userName: string, password: string) {
    return this.http.post<User>(
      `${environment.apiEndpoint}/account/sessions/email`,
      {
        email: userName,
        password: password,
      },
      {
        headers: this.httpHeader,
      }
    );
  }

  creatJWTToken() {
    return this.http.post<string>(
      `${environment.apiEndpoint}/account/jwt`,
      {},
      {
        headers: this.httpHeader,
      }
    );
  }

  logout() {
    return this.http.delete(`${environment.apiEndpoint}/account/sessions`, {
      headers: this.httpHeader,
    });
  }
}
