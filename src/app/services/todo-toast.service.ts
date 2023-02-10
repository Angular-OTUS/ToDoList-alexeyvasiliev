import { Injectable, OnDestroy } from '@angular/core';
import { Toast } from '@interfaces/Toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoToastService implements OnDestroy {
  toastQueue$ = new BehaviorSubject<Toast | undefined>(undefined);
  showToast = (message: string) => this.toastQueue$.next(new Toast(message));
  ngOnDestroy = () => this.toastQueue$.unsubscribe();
}
