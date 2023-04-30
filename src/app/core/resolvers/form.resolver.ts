import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
// LIBS
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { NgxSpinnerService } from 'ngx-spinner';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
// MODELS
import { DynamicForm } from "@models/DynamicForm";

@Injectable({
  providedIn: 'root'
})
export class FormResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private dynamicFormService: DynamicFormService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<DynamicForm> {
    this.spinner.show();
    const id = route.params['id'];
    return this.dynamicFormService.getById(id)
      .pipe(
        map((x: any) => {
         return x as DynamicForm;
        }),
        catchError(err => {
          console.log(err);
          this.alertService.showError(err.error);
          this.router.navigate(['/admin/forms']);
          return of(err.error)
        }));
  }
}