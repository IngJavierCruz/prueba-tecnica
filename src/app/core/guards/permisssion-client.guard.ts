import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationConfigurationService } from '../services/authentication/authentication-configuration.service';
import { TYPE_USER } from "@constants/TypeUser";

@Injectable({
  providedIn: 'root'
})
export class PermissionClientGuard implements CanActivate {
  constructor(
    private router: Router,
    private authConfig: AuthenticationConfigurationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validatePermissions();
  }

  validatePermissions() {
    if (this.authConfig.typeUser === TYPE_USER.admin) {
      this.router.navigate([this.authConfig.urlDefault]);
      return false
    }
    return true;
  }
}