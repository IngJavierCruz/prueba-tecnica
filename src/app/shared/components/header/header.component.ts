import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// SERVICES
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';
import { AlertService } from '@services/notification/alert.service';
// MODELS
import { User } from '@models/authentication/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  user!: User;

  constructor(
    public authConfigService: AuthenticationConfigurationService, 
    private alertService: AlertService) { }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUser() {
    this.subscription.add(
      this.authConfigService.currentUser.subscribe({
        next: (x: User) => this.user = x
      }));
  }

  async logout() {
    if (await this.alertService.showConfirmationAction({title:'¿Deseas cerrar sesión'})) {
      this.authConfigService.reset();
    }
  }

}
