import { AfterViewInit, Component, inject, Input, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, timer } from 'rxjs';
import { ToastType } from '../../interfaces/Toast';
import { APP_CONFIG } from '../../../config/appConfig';

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
  private subscription$?: Subscription;

  private readonly appConfig = inject(APP_CONFIG);

  end = true;

  ngAfterViewInit(): void {
    this.subscription$ = timer(this.appConfig.toastTimeOut / 10).subscribe(_ => (this.end = false));
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
