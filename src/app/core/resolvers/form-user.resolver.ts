import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
// LIBS
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { NgxSpinnerService } from 'ngx-spinner';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { FormUserService } from '@services/form-control/form-user.service';
// MODELS
import { FormUser } from '@models/FormUser';

@Injectable({
  providedIn: 'root'
})
export class FormUserResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formUserService: FormUserService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<FormUser> {
    this.spinner.show();
    const id = route.params['id'];
    return this.formUserService.getById(id)
      .pipe(
        map((x: any) => {
          this.spinner.hide();
          return x as FormUser;
        }),
        catchError(err => {
          console.log(err);
          this.alertService.showError(err.error);
          this.spinner.hide();
          this.router.navigate(['/app/forms']);
          return of(err.error)
        }));
  }
}