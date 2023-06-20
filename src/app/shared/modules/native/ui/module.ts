import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// COMPONENTS
import { UIMain } from './main/main';
import { UIMultimediaDialog } from './multimedia-dialog/multimedia-dialog';
import { UISidebar } from './sidebar/sidebar';
import { UISidebarFilter } from './sidebar-filter/sidebar-filter';
import { UITabContentBody } from './tab-content-body/tab-content-body';
import { UITabContentHeader } from './tab-content-header/tab-content-header';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; // <-- Import PdfJsViewerModule module
import { MaterialModule } from '@shared/modules/material.module';

const COMPONENTS = [
  UIMain,
  UIMultimediaDialog,
  UISidebar,
  UISidebarFilter,
  UITabContentBody,
  UITabContentHeader,
]

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    PdfJsViewerModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class UIModule { }
