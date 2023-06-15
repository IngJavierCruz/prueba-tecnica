import {
  OnInit,
  OnDestroy,
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  QueryList,
} from '@angular/core';

import { NativeTabLabelWrapper } from '../tab-header/tab-header';
export type ScrollDirection = 'after' | 'before';

@Directive()
export abstract class PaginatedTabHeader implements OnInit, AfterViewInit, OnDestroy {
  abstract tabs: QueryList<NativeTabLabelWrapper>;
  abstract tabListContainer: ElementRef<HTMLElement>;
  abstract tabList: ElementRef<HTMLElement>;
  abstract nextPaginator: ElementRef<HTMLElement>;
  abstract previousPaginator: ElementRef<HTMLElement>;
  private scrollDistance = 0;
  showPaginationControls = false;
  disableScrollAfter = true;
  disableScrollBefore = true;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => console.log('tabs from paginated : ', this.tabs), 1000);
    setTimeout(() => this.checkScrollingControls(), 100);
  }

  ngOnDestroy(): void {}

  @HostListener('window:resize')
  onWindowResize() {
    this.checkScrollingControls();
  }

  isValidIndex(index: number): boolean {
    return this.tabs ? !!this.tabs.toArray()[index] : true;
  }

  checkPaginationEnabled() {
    const { scrollWidth, offsetWidth } = this.tabListContainer.nativeElement
    const isEnabled = scrollWidth > offsetWidth;
    if (!isEnabled) {
      this.scrollDistance = 0;
    }
    this.showPaginationControls = isEnabled;
  }

  getMaxScrollDistance(): number {
    const lengthOfTabList = this.tabListContainer.nativeElement.scrollWidth;
    const viewLength = this.tabListContainer.nativeElement.offsetWidth;
    return lengthOfTabList - viewLength || 0;
  }

  checkScrollingControls() {
    // Check if the pagination arrows should be activated.
    const maxScrollDistance = this.getMaxScrollDistance();
    this.disableScrollBefore = this.scrollDistance == 0;
    this.disableScrollAfter = this.scrollDistance == maxScrollDistance;
    this.checkPaginationEnabled();
  }

  handlePaginatorClick(direction: ScrollDirection) {
    const viewLength = this.tabListContainer.nativeElement.offsetWidth;
    const scrollAmount = ((direction == 'before' ? -1 : 1) * viewLength) / 2;
    const position = this.scrollDistance + scrollAmount;
    const positionScroll = Math.max(0, Math.min(this.getMaxScrollDistance(), position));
    this.scrollDistance = positionScroll;
    this.tabListContainer.nativeElement.scrollLeft = positionScroll;
    this.checkScrollingControls();
  }
}
