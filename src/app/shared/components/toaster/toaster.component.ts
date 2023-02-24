import { Component, ElementRef, EmbeddedViewRef, inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { ToastService } from '../../services/toast.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { APP_CONFIG } from '../../../config/appConfig';
import { ToastType } from '../../interfaces/Toast';
import { ToastComponent } from '../index';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly appConfig = inject(APP_CONFIG);

  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private readonly toastServer: ToastService) {
    toastServer.toastQueue$.pipe(takeUntil(this.destroy$)).subscribe(toast => this.create(toast?.text, toast?.type));
  }

  private create(message: string | undefined, type: ToastType = ToastType.ADD): void {
    if (!message) {
      return;
    }
    const componentRef = this.viewContainerRef.createComponent(ToastComponent);
    componentRef.instance.text = message;
    componentRef.instance.type = type;
    const [tooltipDOMElement] = (componentRef.hostView as EmbeddedViewRef<TooltipComponent>).rootNodes;
    this.elementRef.nativeElement.appendChild(tooltipDOMElement);
    timer(this.appConfig.toastTimeOut)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => componentRef.destroy());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
