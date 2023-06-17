import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// COMPONENTS
import { UITabContentHeader } from './tab-content-header/tab-content-header';
import { UIMain } from './main/main';
import { UISidebar } from './sidebar/sidebar';
import { UISidebarFilter } from './sidebar-filter/sidebar-filter';

const COMPONENTS = [
  UIMain,
  UITabContentHeader,
  UISidebar,
  UISidebarFilter,
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class UIModule { }
