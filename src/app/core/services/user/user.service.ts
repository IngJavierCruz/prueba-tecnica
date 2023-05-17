import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '@models/authentication/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.host}/users`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get<any>(this.url);
  }

  getByType(typeId: number) {
    const url = `${this.url}/?typeUser=${typeId}`;
    return this.http.get<User[]>(url);
  }
}
