// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// RXJS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { AlertService } from '@services/notification/alert.service';
import { AuthenticationConfigurationService } from '@services/authentication/authentication-configuration.service';
import { UserCredential } from '@models/authentication/User';
// MODELS

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../auth.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  hide = true;
  type = "password";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authenticationConfigurationService: AuthenticationConfigurationService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["test@test.com", [Validators.required, Validators.email]],
      password: ["P@$$word123", Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleVisibility($event: any) {
    $event.preventDefault();
    this.hide = !this.hide;
    this.type = this.hide ? "password" : "text";
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.authenticate();
    } else  {
      this.alertService.showError('Completa el Usuario y/o contraseña');
    }
  }

  authenticate() {
    this.spinner.show();
    this.subscription.add(this.authenticationService.authenticate(this.form.value)
      .subscribe({
        next: (data: UserCredential) => {
          this.spinner.hide();
          this.authenticationConfigurationService.start(data);
          this.router.navigate([this.authenticationConfigurationService.urlDefault]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          console.log(error.error);
          if (error.error === "Cannot find user") {
            this.alertService.showError('¡El usuario no existe!');
          } else {
            this.alertService.showError(error.error);
          }
        }
      }).add(() => this.spinner.hide()));
  }
}