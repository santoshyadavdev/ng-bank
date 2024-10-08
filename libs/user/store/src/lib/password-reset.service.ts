import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { User } from './user';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  http = inject(HttpClient);
  location = inject(Location);
  constructor() { }

  sendResetPasswordURL(email: string) {
    return this.http.post(`${environment.apiEndpoint}/account/recovery`, {
    email: email,
    url: `${location.origin}/updatepassword`
    });
  }

  updatePassword(userId : string, secret: string, password: string) {
    return this.http.put(`${environment.apiEndpoint}/account/recovery`, {
    userId: userId,
    secret: secret,
    password: password
    });
  }

}
