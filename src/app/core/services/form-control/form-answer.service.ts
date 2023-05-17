import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { FormAnswer } from '@models/FormAnswer';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {
  private url = `${environment.host}/formAnswer`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll(userId: number) {
    const url = `${this.url}?_expand=dynamicForm&userId=${userId}`
    return this.http.get<FormAnswer[]>(url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}`
    return this.http.get<FormAnswer>(url);
  }

  getByParentId(parentId: number) {
    const url = `${this.url}?formUserId=${parentId}&_expand=dynamicFormControl`
    return this.http.get<FormAnswer[]>(url);
  }

  add(item: FormAnswer) {
    return this.http.post<FormAnswer>(this.url, item);
  }

  addRange(items: FormAnswer[]) {
    const request = items.map((x) => this.http.post(this.url, x));
    return forkJoin(request);
  }
}
