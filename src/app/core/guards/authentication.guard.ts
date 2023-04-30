import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationConfigurationService } from '../services/authentication/authentication-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authConfig: AuthenticationConfigurationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validatePermissions();
  }

  validatePermissions() {
    if (!this.authConfig.isUserAuthenticated) {
      this.router.navigate(['/auth/sign-in']);
      return false
    }
    return true;
  }
}