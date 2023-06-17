import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  TemplateRef,
  InjectionToken,
  Directive,
  ContentChild,
  ViewContainerRef,
  Optional,
  Inject,
  Input,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges
 } from '@angular/core';
import { NativeTabLabel, NATIVE_TAB } from '../tab-label/tab-label';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { NativeTabContent } from '../tab-content/tab-content';

export const NATIVE_TAB_GROUP = new InjectionToken<any>('NATIVE_TAB_GROUP');

@Directive()
export class NativeTabBase
  implements OnInit, OnChanges, OnDestroy {

  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  _explicitContent!: TemplateRef<any>;

  /** Template inside the NativeTab view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef, { static: true }) _implicitContent!: TemplateRef<any>;

  @Input() textLabel: string = '';
  @Input() iconLabel: string | undefined = undefined;
  @Input() iconLabelActive: string | undefined = undefined;
  /**
   * Classes to be passed to the tab label inside the native-tab-header container.
   * Supports string and string array values, same as `ngClass`.
   */
  @Input() labelClass?: string | string[];

  /**
   * Classes to be passed to the tab native-tab-body container.
   * Supports string and string array values, same as `ngClass`.
   */
  @Input() bodyClass?: string | string[];

  /** Portal that will be the hosted content of the tab */
  private _contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /**
 * The relatively indexed position where 0 represents the center, negative is left, and positive
 * represents the right.
 */
  position: number | null = null;

  /**
 * The initial relatively index origin of the tab if it was created and selected after there
 * was already a selected tab. Provides context of what position the tab should originate from.
 */
  origin: number | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    @Inject(NATIVE_TAB_GROUP) @Optional() public _closestTabGroup: any,
  ) {
  }

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent,
      this.viewContainerRef,
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
  }
}

@Component({
  selector: 'native-tab',
  templateUrl: './tab.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  exportAs: 'nativeTab',
  providers: [{provide: NATIVE_TAB, useExisting: NativeTab}],
})
export class NativeTab extends NativeTabBase {

  @ContentChild(NativeTabContent, { read: TemplateRef, static: true })
  // We need an initializer here to avoid a TS error. The value will be set in `ngAfterViewInit`.
  override _explicitContent: TemplateRef<any> = undefined!;
}