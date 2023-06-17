import { NgModule } from '@angular/core';
// MODULES
import { UIModule } from './ui/module';
import { NativeCardsModule } from './card/module';
import { NativeTabsModule } from './tabs/module';
import { NativePaginatorModule } from './paginator/module';

export const MODULES = [
  UIModule,
  NativeCardsModule,
  NativeTabsModule,
  NativePaginatorModule,
];


@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class NativeModule {}
