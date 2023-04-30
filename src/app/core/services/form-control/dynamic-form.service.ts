import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { DynamicForm } from '@models/DynamicForm';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private url = `${environment.host}/dynamicForms`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get<DynamicForm[]>(this.url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}`
    return this.http.get<DynamicForm>(url);
  }

  add(item: DynamicForm) {
    return this.http.post<DynamicForm>(this.url, item);
  }

  update(item: DynamicForm) {
    const url = `${this.url}/${item.id}`
    return this.http.put<DynamicForm>(url, item);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`
    return this.http.delete(url);
  }

}
