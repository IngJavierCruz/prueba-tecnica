import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';

import { NativeTabHeader, NativeTabLabelWrapper } from '../tab-header/tab-header';
import { NATIVE_TAB_GROUP, NativeTab } from '../tab/tab';
import { NATIVE_TABS_CONFIG, NativeTabsConfig } from './tab-config';

/** Used to generate unique ID's for each tab component */
let nextId = 0;

/** A simple change event emitted on focus or selection changes. */
export class NativeTabChangeEvent {
  index?: number;
  tab?: NativeTab;
}

/**
 * Base class with all of the `NativeTabGroupBase` functionality.
 * @docs-private
 */
@Directive()
export abstract class NativeTabGroupBase implements AfterContentChecked, AfterViewInit, OnDestroy {

  /** All of the tabs that belong to the group. */
  abstract tabs: QueryList<NativeTab>;
  abstract tabBodyWrapper?: ElementRef;
  abstract tabHeader: NativeTabHeader;
  /** The tab index that should be selected after the content has been checked. */
  private indexToSelect: number = 0;
  /** The index of the active tab. */
  private _selectedIndex: number | null = null;
  @Input()
  get selectedIndex(): number | null {
    return this._selectedIndex;
  }

  set selectedIndex(value: NumberInput) {
    this.indexToSelect = coerceNumberProperty(value, 0);
  }

  private _contentTabIndex?: number | undefined;
  @Input()
  get contentTabIndex(): number | undefined {
    return this._contentTabIndex;
  }

  set contentTabIndex(value: NumberInput) {
    this._contentTabIndex = coerceNumberProperty(value, undefined);
  }

  /**
   * By default tabs remove their content from the DOM while it's off-screen.
   * Setting this to `true` will keep it in the DOM which will prevent elements
   * like iframes and videos from reloading next time it comes back into the view.
   */
  private _preserveContent: boolean = false;
  @Input()
  get preserveContent(): boolean {
    return this._preserveContent;
  }

  set preserveContent(value: BooleanInput) {
    this._preserveContent = coerceBooleanProperty(value);
  }

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output() readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  /** Event emitted when the tab selection has changed. */
  @Output() readonly selectedTabChange: EventEmitter<NativeTabChangeEvent> =
    new EventEmitter<NativeTabChangeEvent>(true);

  private groupId: number;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Inject(NATIVE_TABS_CONFIG) @Optional() defaultConfig?: NativeTabsConfig,
  ) {
    this.groupId = nextId++;
    this.contentTabIndex = defaultConfig?.contentTabIndex ?? null;
    this.preserveContent = !!defaultConfig?.preserveContent;
  }

  ngAfterContentChecked() {
    const indexToSelect = this.indexToSelect!;
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;
      if (!isFirstRun) {
        this.tabHeader.tabList.nativeElement.children[indexToSelect].scrollIntoView({ behavior: "smooth" });
        this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
        this.selectedIndexChange.emit(indexToSelect);
      }
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.tabs.forEach((tab: NativeTab, index: number) => {
      tab.position = index - indexToSelect;
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this.changeDetectorRef.markForCheck();
    }
  }

  ngAfterViewInit() {
    console.log(this.tabBodyWrapper?.nativeElement);
  }

  ngOnDestroy() {
    this.tabs.destroy();
  }

  private createChangeEvent(index: number): NativeTabChangeEvent {
    const event = new NativeTabChangeEvent();
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
    }
    return event;
  }

  /** Returns a unique id for each tab label element */
  getTabLabelId(i: number): string {
    return `native-tab-label-${this.groupId}-${i}`;
  }

  /** Returns a unique id for each tab content element */
  getTabContentId(i: number): string {
    return `native-tab-content-${this.groupId}-${i}`;
  }

  /** Handle click events, setting new selected index if appropriate. */
  changeTab(tab: NativeTab, tabHeader: NativeTabHeader, index: number) {
    this.selectedIndex = index;
    // tabHeader.tabs.toArray()[index].elementRef.nativeElement.scrollIntoView({behavior: "smooth"});
  }

  /** Retrieves the tabindex for the tab. */
  getTabIndex(index: number): number {
    return index === this.selectedIndex ? 0 : -1;
  }
}


@Component({
  selector: 'native-tab-group',
  templateUrl: './tab-group.html',
  styleUrls: ['./tab-group.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'tab-group' },
  // providers: [
  //   {
  //     provide: NATIVE_TAB_GROUP,
  //     useExisting: NativeTabGroup,
  //   },
  // ],
  exportAs: 'nativeTabGroup',
})
export class NativeTabGroup extends NativeTabGroupBase implements OnInit, AfterViewInit {
  @ContentChildren(NativeTab, { descendants: true }) tabs!: QueryList<NativeTab>;
  @ViewChild('tabHeader') tabHeader!: NativeTabHeader;
  @ViewChild('tabBodyWrapper') tabBodyWrapper?: ElementRef;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    @Inject(NATIVE_TABS_CONFIG) @Optional() defaultConfig: NativeTabsConfig,
  ) {
    super(changeDetectorRef, defaultConfig);
  }

  ngOnInit() { }
}

