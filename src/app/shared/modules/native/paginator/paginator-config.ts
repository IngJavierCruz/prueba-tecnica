import { InjectionToken } from '@angular/core';

export interface PageEvent {
  /** The current page index. */
  pageIndex: number;
  /**
   * Index of the page that was selected previously.
   */
  previousPageIndex: number;

  /** The current page size. */
  pageSize: number;

  /** The current total number of items being paged. */
  total: number;
};

/** Object that can be used to configure the default options for the paginator. */
export interface PaginatorDefaultOptions {
  /** Number of items to display on a page. By default set to 10. */
  pageSize?: number;

  /** The set of provided page size options to display to the user. */
  pageSizeOptions?: number[];

  /** Whether to hide the page size selection UI from the user. */
  hidePaginatorPageSize?: boolean;

  /** Whether to show the first/last buttons UI to the user. */
  showFirstLastButtons?: boolean;
}

export const PAGINATOR_CONFIG = new InjectionToken<PaginatorDefaultOptions>('PAGINATOR_CONFIG');

/** The default page size if there is no page size and there are no provided page size options. */
export const DEFAULT_PAGE_SIZE = 50;
