// ANGULAR
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// RXJS
import { Observable } from 'rxjs';
// SERVICES
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authConfigService: AuthenticationConfigurationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestModified: HttpRequest<any> = this.addTokenToRequest(request, this.authConfigService.accessToken);
    return next.handle(requestModified);
  }

  // ATTACH TOKEN AT THE REQUEST
  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
  }
}
