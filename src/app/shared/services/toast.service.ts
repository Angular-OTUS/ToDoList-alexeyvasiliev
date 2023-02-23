import { OnDestroy } from '@angular/core';
import { Toast, ToastType } from '@shared/interfaces/Toast';
import { BehaviorSubject } from 'rxjs';

export class ToastService implements OnDestroy {
  toastQueue$ = new BehaviorSubject<Toast | undefined>(undefined);
  showToast = (message: string, type: ToastType) => this.toastQueue$.next(new Toast(message, type));
  ngOnDestroy = () => this.toastQueue$.unsubscribe();
}
