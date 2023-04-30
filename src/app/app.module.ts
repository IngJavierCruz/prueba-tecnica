// ModulesApp
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
// import { CoreModule } from '@core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
// COMPONENTS
import { AppComponent } from '@app/app.component';
// INTERCEPTORS
import { INTERCEPTOR_PROVIDERS_GLOBALS } from '@interceptors/interceptors';


const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  // CoreModule,
  SharedModule,
  HttpClientModule,
];

const COMPONENTS = [
  AppComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [
    INTERCEPTOR_PROVIDERS_GLOBALS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}