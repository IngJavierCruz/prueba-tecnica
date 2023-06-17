import {
  AfterContentChecked,
  AfterContentInit,
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

import { NativeTabHeader } from '../tab-header/tab-header';
import { NATIVE_TAB_GROUP, NativeTab } from '../tab/tab';
import { NATIVE_TABS_CONFIG, NativeTabsConfig } from './tab-config';
import { startWith } from 'rxjs';

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
export abstract class NativeTabGroupBase implements AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy {

  /**
   * All tabs inside the tab group. This includes tabs that belong to groups that are nested
   * inside the current one. We filter out only the tabs that belong to this group in `tabs`.
   */
  abstract allTabs: QueryList<NativeTab>;
  abstract tabBodyWrapper: ElementRef;
  abstract tabHeader: NativeTabHeader;
  /** All of the tabs that belong to the group. */
  tabs: QueryList<NativeTab> = new QueryList<NativeTab>();
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
        this.tabHeader.tabs.toArray()[indexToSelect].elementRef.nativeElement.scrollIntoView({ behavior: "smooth" });
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
  }

  ngAfterContentInit() {
    this.subscribeToAllTabChanges();
  }

  ngOnDestroy() {
    this.tabs.destroy();
  }

  /** Listens to changes in all of the tabs. */
  private subscribeToAllTabChanges() {
    // Since we use a query with `descendants: true` to pick up the tabs, we may end up catching
    // some that are inside of nested tab groups. We filter them out manually by checking that
    // the closest group to the tab is the current one.
    this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs: QueryList<NativeTab>) => {
      this.tabs.reset(
        tabs.filter(tab => {
          return tab._closestTabGroup === this || !tab._closestTabGroup;
        }),
      );
      this.tabs.notifyOnChanges();
    });
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
  providers: [
    {
      provide: NATIVE_TAB_GROUP,
      useExisting: NativeTabGroup,
    },
  ],
  exportAs: 'nativeTabGroup',
})
export class NativeTabGroup extends NativeTabGroupBase {
  @ContentChildren(NativeTab, { descendants: true }) allTabs!: QueryList<NativeTab>;
  @ViewChild('tabHeader') tabHeader!: NativeTabHeader;
  @ViewChild('tabBodyWrapper') tabBodyWrapper!: ElementRef;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    @Inject(NATIVE_TABS_CONFIG) @Optional() defaultConfig: NativeTabsConfig,
  ) {
    super(changeDetectorRef, defaultConfig);
  }
}

