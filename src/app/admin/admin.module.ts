// ModulesApp
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { INTERCEPTOR_PROVIDERS } from '@interceptors/interceptors';
// COMPONENTS
import { AdminComponent } from './admin.component';

const MODULES = [
  PagesRoutingModule,
  SharedModule,
];

const COMPONENTS: any[] = [
  AdminComponent,
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
