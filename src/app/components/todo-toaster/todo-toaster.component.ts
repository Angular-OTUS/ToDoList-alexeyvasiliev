import { Component, ElementRef, EmbeddedViewRef, inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { TodoToastComponent } from '@components/todo-toast/todo-toast.component';
import { TodoToastService } from '@services/todo-toast.service';
import { Subscription, timer } from 'rxjs';
import { APP_CONFIG } from '../../config/appConfig';
import { ToastType } from '@interfaces/Toast';

@Component({
  selector: 'app-todo-toaster',
  templateUrl: './todo-toaster.component.html',
  styleUrls: ['./todo-toaster.component.scss'],
})
export class TodoToasterComponent implements OnDestroy {
  readonly #elementRef = inject(ElementRef);

  readonly #viewContainerRef = inject(ViewContainerRef);
  readonly #appConfig = inject(APP_CONFIG);

  private readonly subscription$: Subscription;
  private destroySubscription$?: Subscription;

  constructor(private readonly toastServer: TodoToastService) {
    this.subscription$ = toastServer.toastQueue$.subscribe(toast => this.#create(toast?.text, toast?.type));
  }

  #create(message: string | undefined, type: ToastType = ToastType.ADD): void {
    if (!message) {
      return;
    }
    const componentRef = this.#viewContainerRef.createComponent(TodoToastComponent);
    componentRef.instance.text = message;
    componentRef.instance.type = type;
    const [tooltipDOMElement] = (componentRef.hostView as EmbeddedViewRef<TooltipComponent>).rootNodes;
    this.#elementRef.nativeElement.appendChild(tooltipDOMElement);
    this.destroySubscription$ = timer(this.#appConfig.toastTimeOut).subscribe(_ => componentRef.destroy());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.destroySubscription$?.unsubscribe();
  }
}
