import { Injectable, OnDestroy } from '@angular/core';
import { Toast, ToastType } from '@interfaces/Toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoToastService implements OnDestroy {
  toastQueue$ = new BehaviorSubject<Toast | undefined>(undefined);
  showToast = (message: string, type: ToastType) => this.toastQueue$.next(new Toast(message, type));
  ngOnDestroy = () => this.toastQueue$.unsubscribe();
}
