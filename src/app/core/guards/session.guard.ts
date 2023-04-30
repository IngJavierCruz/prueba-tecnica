import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationConfigurationService } from '../services/authentication/authentication-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authConfig: AuthenticationConfigurationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validateSessionActive();
  }

  validateSessionActive() {
    if (this.authConfig.isUserAuthenticated) {
      this.router.navigate([this.authConfig.urlDefault]);
      return false
    }
    return true;
  }
}