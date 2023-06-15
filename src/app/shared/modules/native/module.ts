import { NgModule } from '@angular/core';
// MODULES
import { NativeCardsModule } from './card/module';
import { NativeTabsModule } from './tabs/module';



export const MODULES = [
  NativeCardsModule,
  NativeTabsModule,
];


@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class NativeModule {}
