import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CatalogBase } from '@models/TypeControl';

@Injectable({
  providedIn: 'root'
})
export class TypeControlService {
  private url = `${environment.host}/types_controls`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get<CatalogBase[]>(this.url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}`
    return this.http.get<CatalogBase>(url);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`
    return this.http.delete(url);
  }

}
