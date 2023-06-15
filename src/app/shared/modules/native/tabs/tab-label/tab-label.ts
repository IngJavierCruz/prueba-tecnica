import {
  Directive,
  Inject,
  InjectionToken,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

export const NATIVE_TAB_LABEL = new InjectionToken<NativeTabLabel>('NativeTabLabel');
export const NATIVE_TAB = new InjectionToken<any>('NATIVE_TAB');

@Directive({
  selector: '[native-tab-label], [nativeTabLabel]',
  providers: [{provide: NATIVE_TAB_LABEL, useExisting: NativeTabLabel}],
})
export class NativeTabLabel extends CdkPortal {
  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
    @Inject(NATIVE_TAB) @Optional() public _closestTab: any,
  ) {
    super(templateRef, viewContainerRef);
  }
}