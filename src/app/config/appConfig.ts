import { InjectionToken } from '@angular/core';

export interface AppConfig {
  readonly toastTimeOut: number;
}
export const Configuration: AppConfig = {
  toastTimeOut: 5000,
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
