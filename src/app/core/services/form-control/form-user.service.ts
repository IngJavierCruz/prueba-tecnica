import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { FormUser } from '@models/FormUser';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormUserService {
  private url = `${environment.host}/formUser`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll(userId?: number) {
    const url = `${this.url}?_expand=dynamicForm&userId=${userId}`
    return this.http.get<FormUser[]>(url);
  }

  getByParentId(parentId: number) {
    const url = `${this.url}?dynamicFormId=${parentId}&_expand=dynamicForm&_expand=user`
    return this.http.get<FormUser[]>(url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}?_expand=dynamicForm&_embed=formAnswer`
    return this.http.get<FormUser>(url);
  }

  add(item: FormUser) {
    return this.http.post<FormUser>(this.url, item);
  }

  update(item: FormUser) {
    const url = `${this.url}/${item.id}`;
    return this.http.put<FormUser>(url, item);
  }

  addRange(items: FormUser[]) {
    const request = items.map((x) => this.http.post(this.url, x));
    return forkJoin(request);
  }
}
