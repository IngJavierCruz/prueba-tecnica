import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
// COMPONENTS
import { NativeTab } from './tab/tab';
import { NativeTabBody, NativeTabBodyPortal } from './tab-body/tab-body';
import { NativeTabContent } from './tab-content/tab-content';
import { NativeTabHeader, NativeTabLabelWrapper } from './tab-header/tab-header';
import { NativeTabGroup } from './tab-group/tab-group';
import { NativeTabLabel } from './tab-label/tab-label';

export const COMPONENTS = [
  NativeTab,
  NativeTabContent,
  NativeTabGroup,
  NativeTabLabel,
];

export const PRIVATE_DIRECTIVE = [
  NativeTabBody,
  NativeTabLabelWrapper,
  NativeTabBodyPortal,
  NativeTabHeader,
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    A11yModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
    ...PRIVATE_DIRECTIVE
  ]
})
export class NativeTabsModule { }
