import {
  Component,
  AfterViewInit,
  ElementRef, ViewChild,
  QueryList,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
  Directive
} from '@angular/core';
import { PaginatedTabHeader } from '../paginated-tab-header/paginated-tab-header';

@Directive()
export class NativeTabLabelWrapperBase  {
  constructor(public elementRef: ElementRef) {}

  /** Sets focus on the wrapper element */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}

@Directive({
  selector: '[nativeTabLabelWrapper]',
})
export class NativeTabLabelWrapper  {

  constructor(public elementRef: ElementRef<HTMLElement>) {
  }

  // selectIndex() {
  //   this.elementRef.nativeElement.scrollIntoView({ behavior: "smooth" });
  // }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}


@Component({
  selector: 'native-tab-header',
  templateUrl: './tab-header.html',
  styleUrls: ['./tab-header.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'tab-header'}
})
export class NativeTabHeader extends PaginatedTabHeader implements AfterViewInit {
  @ContentChildren(NativeTabLabelWrapper, { descendants: false }) tabs!: QueryList<NativeTabLabelWrapper>;
  @ViewChild('tabListContainer', { static: true }) tabListContainer!: ElementRef<HTMLElement>;
  @ViewChild('tabList', { static: true }) tabList!: ElementRef<HTMLElement>;
  @ViewChild('nextPaginator') nextPaginator!: ElementRef<HTMLElement>;
  @ViewChild('previousPaginator') previousPaginator!: ElementRef<HTMLElement>;

  constructor() {
    super();
  }
}

