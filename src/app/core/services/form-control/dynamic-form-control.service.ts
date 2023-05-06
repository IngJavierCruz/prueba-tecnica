import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { DynamicFormControl } from '@models/DynamicFormControl';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormControlService {
  private url = `${environment.host}/dynamicFormControls`;

  constructor(
    private http: HttpClient,
    ) {
  }

  getAll() {
    return this.http.get<DynamicFormControl[]>(this.url);
  }

  getByParentId(parentId: number) {
    const url = `${this.url}?dynamicFormId=${parentId}&_embed=typesControlsOptions`
    return this.http.get<DynamicFormControl[]>(url);
  }

  getById(id: number) {
    const url = `${this.url}/${id}`
    return this.http.get<DynamicFormControl>(url);
  }

  add(item: DynamicFormControl) {
    return this.http.post<DynamicFormControl>(this.url, item);
  }

  update(item: DynamicFormControl) {
    const url = `${this.url}/${item.id!}`
    return this.http.put<DynamicFormControl>(url, item);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`
    return this.http.delete(url);
  }

}
