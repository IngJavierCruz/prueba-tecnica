import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// COMPONENTS
import { UITabContentHeader } from './tab-content-header/tab-content-header';
import { UIMain } from './main/main';


const COMPONENTS = [
  UIMain,
  UITabContentHeader
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
