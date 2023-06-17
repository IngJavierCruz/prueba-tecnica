import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
// PIPES
import { NamePipe } from './pipes/name.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { StatusFormUserPipe } from './pipes/status-form-user.pipe';
import { CountStatusFormUserPipe } from './pipes/count-status-form-user.pipe';
// COMPONENTS
import { HeaderComponent } from './components/header/header.component';
import { FormAnswerComponent } from './components/form/form-answer.component';
// DIRECTIVES
// import { NumberIntegerDirective } from '@directives/number-integer.directive';
// import { NumberDirective } from '@directives/number.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickFocusRemoveDirective } from './directives/click-focus-remove.directive';

// MODULES
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from './modules/material.module';
import { NativeModule } from './modules/native/module';

const MODULES = [
  CommonModule,
  FormsModule,
  MaterialModule,
  NativeModule,
  RouterModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
];

const COMPONENTS: any[] = [
  HeaderComponent,
  FormAnswerComponent,
];

const PIPES: any[] = [
  NamePipe,
  StatusPipe,
  StatusFormUserPipe,
  CountStatusFormUserPipe,
];

const DIRECTIVES: any[] = [
  AutoFocusDirective,
  ClickFocusRemoveDirective
  // NumberIntegerDirective,
  // NumberDirective,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  imports: [...MODULES],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  providers: [AsyncPipe],
})
export class SharedModule { }