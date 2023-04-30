// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// MODULE
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
// Components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const MODULES = [
  CommonModule,
  AuthenticationRoutingModule,
  SharedModule
];

const COMPONENTS = [
  SignInComponent,
  SignUpComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})



export class AuthenticationModule { }
