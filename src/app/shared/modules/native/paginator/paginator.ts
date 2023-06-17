import { BooleanInput, NumberInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, Inject, Injectable, Input, OnDestroy, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { DEFAULT_PAGE_SIZE, PAGINATOR_CONFIG, PageEvent, PaginatorDefaultOptions } from './paginator-config';
import { NativePaginatorIntl } from './paginator-intl';
import { Subscription } from 'rxjs';


@Directive()
export abstract class NativePaginatorBase implements PaginatorDefaultOptions, OnInit, OnDestroy {
  @Input()
  disabled = false;

  private initialized: boolean = false;
  private intlChanges: Subscription;

  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  private _pageIndex = 0;
  @Input()
  get pageIndex(): number {
    return this._pageIndex;
  }
  set pageIndex(value: NumberInput) {
    this._pageIndex = Math.max(coerceNumberProperty(value), 0);
    this._changeDetectorRef.markForCheck();
  }

  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  private _length = 0;
  @Input()
  get length(): number {
    return this._length;
  }
  set length(value: NumberInput) {
    this._length = coerceNumberProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  /** Number of items to display on a page. By default set to 10. */
  private _pageSize!: number;
  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: NumberInput) {
    this._pageSize = Math.max(coerceNumberProperty(value), 0);
    this.updateDisplayedPageSizeOptions();
  }

  /** The set of provided page size options to display to the user. */
  private _pageSizeOptions: number[] = [];
  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value: number[] | readonly number[]) {
    this._pageSizeOptions = (value || []).map(p => coerceNumberProperty(p));
    this.updateDisplayedPageSizeOptions();
  }

  /** Whether to hide the page size selection UI from the user. */
  private _hidePaginatorPageSize = false;
  @Input()
  get hidePaginatorPageSize(): boolean {
    return this._hidePaginatorPageSize;
  }
  set hidePaginatorPageSize(value: BooleanInput) {
    this._hidePaginatorPageSize = coerceBooleanProperty(value);
  }

  /** Whether to show the first/last buttons UI to the user. */
  private _showFirstLastButtons = false;
  @Input()
  get showFirstLastButtons(): boolean {
    return this._showFirstLastButtons;
  }
  set showFirstLastButtons(value: BooleanInput) {
    this._showFirstLastButtons = coerceBooleanProperty(value);
  }

  /** Event emitted when the paginator changes the page size or page index. */
  @Output() readonly page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  /** Displayed set of page size options. Will be sorted and include current page size. */
  displayedPageSizeOptions: number[] = [];

  constructor(
    public intl: NativePaginatorIntl,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PAGINATOR_CONFIG) @Optional() defaultConfig?: PaginatorDefaultOptions,

  ) {

    this.intlChanges = intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());

    if (defaultConfig) {
      const { pageSize, pageSizeOptions, hidePaginatorPageSize, showFirstLastButtons } = defaultConfig;

      if (pageSize != null) {
        this._pageSize = pageSize;
      }

      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }

      if (hidePaginatorPageSize != null) {
        this._hidePaginatorPageSize = hidePaginatorPageSize;
      }

      if (showFirstLastButtons != null) {
        this._showFirstLastButtons = showFirstLastButtons;
      }
    }
  }

  ngOnInit() {
    this.initialized = true;
    this.updateDisplayedPageSizeOptions();
  }

  ngOnDestroy() {
    this.intlChanges.unsubscribe();
  }

  /** Advances to the next page if it exists. */
  nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex + 1;
    this.emitPageEvent(previousPageIndex);
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex - 1;
    this.emitPageEvent(previousPageIndex);
  }

  /** Move to the first page if not already there. */
  firstPage(): void {
    // hasPreviousPage being false implies at the start
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this.emitPageEvent(previousPageIndex);
  }

  /** Move to the last page if not already there. */
  lastPage(): void {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this.emitPageEvent(previousPageIndex);
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }

  /** Calculate the number of pages */
  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  changePageSize(pageSize: number) {
    const previousPageIndex = 0;
    this.pageIndex = 0;
    this.pageSize = pageSize;
    this.emitPageEvent(previousPageIndex);
  }

  /** Checks whether the buttons for going forwards should be disabled. */
  nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }

  /** Checks whether the buttons for going backwards should be disabled. */
  previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }

  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  private updateDisplayedPageSizeOptions() {
    if (!this.initialized) {
      return;
    }

    // If no page size is provided, use the first page size option or the default page size.
    if (!this.pageSize) {
      this._pageSize =
        this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }

    this.displayedPageSizeOptions = this.pageSizeOptions.slice();

    if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this.displayedPageSizeOptions.push(this.pageSize);
    }

    // Sort the numbers using a number-specific sort function.
    this.displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      total: this.length,
    });
  }
}

let nextUniqueId = 0;


@Component({
  selector: 'native-paginator',
  templateUrl: './paginator.html',
  styleUrls: ['./paginator.scss'],
  host: {
    'class': 'native-paginator',
    'role': 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NativePaginator extends NativePaginatorBase {
  readonly pageSizeLabelId = `paginator-page-size-label-${nextUniqueId++}`;

  constructor(
    intl: NativePaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Inject(PAGINATOR_CONFIG) @Optional() defaultConfig?: PaginatorDefaultOptions) {
    super(intl, changeDetectorRef, defaultConfig);
  }
}


