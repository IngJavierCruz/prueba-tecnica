import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { TypeControlOption } from '@models/TypeControlOption';

@Injectable({
  providedIn: 'root'
})
export class TypeControlOptionService {
  private url = `${environment.host}/typesControlsOptions`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get<TypeControlOption[]>(this.url);
  }

  getByParentId(parentId: number) {
    const url = `${this.url}?dynamicFormControlId=${parentId}`
    return this.http.get<TypeControlOption[]>(url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}`
    return this.http.get<TypeControlOption>(url);
  }

  add(item: TypeControlOption) {
    return this.http.post<TypeControlOption>(this.url, item);
  }

  update(item: TypeControlOption) {
    const url = `${this.url}/${item.id!}`
    return this.http.put<TypeControlOption>(url, item);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`
    return this.http.delete(url);
  }

}
