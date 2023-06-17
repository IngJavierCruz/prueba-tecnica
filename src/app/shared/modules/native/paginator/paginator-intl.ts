import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * To modify the labels and text displayed, create a new instance of NativePaginatorIntl and
 * include it in a custom provider
 */
@Injectable({ providedIn: 'root' })
export class NativePaginatorIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the page size selector. */
  itemsPerPageLabel: string = 'Total de recursos';

  /** A label for the button that increments the current page. */
  nextPageLabel: string = 'Página siguiente';

  /** A label for the button that decrements the current page. */
  previousPageLabel: string = 'Página anterior';

  /** A label for the button that moves to the first page. */
  firstPageLabel: string = 'Primer página';

  /** A label for the button that moves to the last page. */
  lastPageLabel: string = 'Última página';

  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel: (indexPage: number, pageSize: number, total: number) => string = (
    indexPage: number,
    pageSize: number,
    total: number,
  ) => {
    if (total == 0 || pageSize == 0) {
      return `Total de recursos ${total} - Página ${indexPage} de ${pageSize}`;
    }

    total = Math.max(total, 0);
    const startIndex = indexPage * pageSize;
    const endIndex = startIndex < total
      ? Math.min(startIndex + pageSize, total)
      : startIndex + pageSize;
    return `Total de recursos ${total} - Página ${startIndex} de ${endIndex}`;
  };
}

/** @docs-private */
export function NATIVE_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl: NativePaginatorIntl) {
  return parentIntl || new NativePaginatorIntl();
}

/** @docs-private */
export const NATIVE_PAGINATOR_INTL_PROVIDER = {
  // If there is already an NativePaginatorIntl available, use that. Otherwise, provide a new one.
  provide: NativePaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), NativePaginatorIntl]],
  useFactory: NATIVE_PAGINATOR_INTL_PROVIDER_FACTORY,
};
