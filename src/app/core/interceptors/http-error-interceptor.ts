// ANGULAR
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// RXJS
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
// SERVICES
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';
import { AlertService } from '@services/notification/alert.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authConfigService: AuthenticationConfigurationService,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        const error =  err?.error?.message || err.message || 'Error en la petición';
        this.alertService.showError(error);
        console.log(err, 'error interceptor');
        if (err.status === 401) {
          this.dialog.closeAll();
          this.authConfigService.reset();
        }
        return throwError(() => error);
      })
    );
  }
}