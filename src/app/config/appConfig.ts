import { InjectionToken } from '@angular/core';

export interface AppConfig {
  readonly toastTimeOut: number;
  readonly URL: string;
}
export const Configuration: AppConfig = {
  toastTimeOut: 5000,
  URL: 'http://localhost:3000/todo',
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
