import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {PortalModule} from '@angular/cdk/portal';
// import {A11yModule} from '@angular/cdk/a11y';
// COMPONENTS
import { NativeCard } from './card/card.component';



export const COMPONENTS = [
  NativeCard,
];

export const PRIVATE_DIRECTIVE = [

];

@NgModule({
  imports: [
    CommonModule,
//     PortalModule,
//     A11yModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
    ...PRIVATE_DIRECTIVE
  ]
})
export class NativeCardsModule {}
