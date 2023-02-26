import { Component, ElementRef, EmbeddedViewRef, inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { ToastService } from '@shared/services/toast.service';
import { Subscription, timer } from 'rxjs';
import { APP_CONFIG } from '../../../config/appConfig';
import { ToastType } from '@shared/interfaces/Toast';
import { ToastComponent } from '@shared/components';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly appConfig = inject(APP_CONFIG);

  private readonly subscription$: Subscription;
  private destroySubscription$?: Subscription;

  constructor(private readonly toastServer: ToastService) {
    this.subscription$ = toastServer.toastQueue$.subscribe(toast => this.create(toast?.text, toast?.type));
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
    this.destroySubscription$ = timer(this.appConfig.toastTimeOut).subscribe(_ => componentRef.destroy());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.destroySubscription$?.unsubscribe();
  }
}
