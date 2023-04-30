import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Credential } from '@models/authentication/Credential';
import { UserCredential } from '@models/authentication/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = `${environment.host}`;

  constructor(
    private http: HttpClient,
    ) {
  }

  authenticate(credential: Credential) {
    const url = `${this.url}/login`;
    return this.http.post<UserCredential>(url, credential);
  }

  create(credential: any) {
    const url = `${this.url}/register`;
    return this.http.post<UserCredential>(url, credential);
  }

  refreshToken() {
    const apiUrl = `${this.url}/refresh`;
    const data = { refresh: '' };
    return this.http.post(apiUrl, data);
  }

  logout() {
  }
}
