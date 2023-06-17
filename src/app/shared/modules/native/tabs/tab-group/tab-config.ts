import { InjectionToken } from '@angular/core';

/** Object that can be used to configure the default options for the tabs module. */
export interface NativeTabsConfig {
  contentTabIndex?: number;
  preserveContent?: boolean;
}

/** Injection token that can be used to provide the default options the tabs module. */
export const NATIVE_TABS_CONFIG = new InjectionToken<NativeTabsConfig>('NATIVE_TABS_CONFIG');