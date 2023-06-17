import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativePaginator } from './paginator';
import { NATIVE_PAGINATOR_INTL_PROVIDER } from './paginator-intl';

@NgModule({
  providers: [NATIVE_PAGINATOR_INTL_PROVIDER],
  imports: [CommonModule],
  exports: [NativePaginator],
  declarations: [NativePaginator]
})
export class NativePaginatorModule { }
