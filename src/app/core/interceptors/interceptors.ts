// ANGULAR
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// INTERCEPTORS
import { JwtInterceptor } from './jwt-interceptor';
import { HttpErrorInterceptor } from './http-error-interceptor';

export const INTERCEPTOR_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];

export const INTERCEPTOR_PROVIDERS_GLOBALS = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];