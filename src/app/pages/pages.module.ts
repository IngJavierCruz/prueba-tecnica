// ModulesApp
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@shared/shared.module';
import { INTERCEPTOR_PROVIDERS } from '@interceptors/interceptors';
// COMPONENTS
import { PagesComponent } from './pages.component';

const MODULES = [
  PagesRoutingModule,
  SharedModule,
];

const COMPONENTS: any[] = [
  PagesComponent,
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
export class PagesModule { }
