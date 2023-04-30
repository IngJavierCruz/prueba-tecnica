import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private url = `${environment.host}/profiles`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get(this.url);
  }

}
