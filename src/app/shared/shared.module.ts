import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
// PIPES
// COMPONENTS
// import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
// import { SignInComponent } from '@shared/components/sign-in/sign-in.component';
// import { ToolbarDialogComponent } from '@shared/components/toolbar-dialog/toolbar-dialog.component';
// import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';
// import { SignUpDialogComponent } from './components/sign-up-dialog/sign-up-dialog.component';

// DIRECTIVES
// import { NumberIntegerDirective } from '@directives/number-integer.directive';
// import { NumberDirective } from '@directives/number.directive';
// MODULES
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from './modules/material.module';

const MODULES = [
  CommonModule,
  FormsModule,
  MaterialModule,
  RouterModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
];

const COMPONENTS: any[] = [
  // ToolbarComponent,
  // SignInComponent,
  // SignUpDialogComponent,
  // ToolbarDialogComponent,
  // SidenavComponent,
];

const PIPES: any[] = [
  // StringIsNullPipe
];

const DIRECTIVES: any[] = [
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