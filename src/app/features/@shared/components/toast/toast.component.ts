import { AfterViewInit, Component, inject, Input, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, takeUntil, timer } from 'rxjs';
import { ToastType } from '../../interfaces/Toast';
import { APP_CONFIG } from '../../../../config/appConfig';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [trigger('inOut', [transition(':leave', [animate('4500ms ease-out', style({ opacity: 0.1 }))])])],
})
export class ToastComponent implements AfterViewInit, OnDestroy {
  @Input()
  text = '';

  @Input()
  type: ToastType = ToastType.ADD;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private readonly appConfig = inject(APP_CONFIG);

  end = true;

  ngAfterViewInit(): void {
    timer(this.appConfig.toastTimeOut / 10)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => (this.end = false));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
