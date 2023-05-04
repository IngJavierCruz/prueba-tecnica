import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
// PIPES
// COMPONENTS
import { HeaderComponent } from './components/header/header.component';

// DIRECTIVES
// import { NumberIntegerDirective } from '@directives/number-integer.directive';
// import { NumberDirective } from '@directives/number.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickFocusRemoveDirective } from './directives/click-focus-remove.directive';

// MODULES
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from './modules/material.module';
import { NamePipe } from './pipes/name.pipe';

const MODULES = [
  CommonModule,
  FormsModule,
  MaterialModule,
  RouterModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
];

const COMPONENTS: any[] = [
  HeaderComponent
];

const PIPES: any[] = [
  NamePipe
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