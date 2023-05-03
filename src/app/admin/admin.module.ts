// ModulesApp
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { INTERCEPTOR_PROVIDERS } from '@interceptors/interceptors';
// COMPONENTS
import { AdminComponent } from './admin.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormComponent } from './components/form/form.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { QuestionsComponent } from './components/form/questions/questions.component';

const MODULES = [
  PagesRoutingModule,
  SharedModule,
];

const COMPONENTS: any[] = [
  AdminComponent,
  FormsComponent,
  FormComponent,
  QuestionsComponent,
  FormDialogComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ],
  providers: [
    INTERCEPTOR_PROVIDERS,
  ],
})
export class AdminModule { }
