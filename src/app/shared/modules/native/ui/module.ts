import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// COMPONENTS
import { UIMain } from './main/main';
import { UISidebar } from './sidebar/sidebar';
import { UISidebarFilter } from './sidebar-filter/sidebar-filter';
import { UITabContentBody } from './tab-content-body/tab-content-body';
import { UITabContentHeader } from './tab-content-header/tab-content-header';

const COMPONENTS = [
  UIMain,
  UISidebar,
  UISidebarFilter,
  UITabContentBody,
  UITabContentHeader,
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
