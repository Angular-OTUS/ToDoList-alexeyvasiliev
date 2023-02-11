import { Component, ElementRef, EmbeddedViewRef, inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { TodoToastComponent } from '@components/todo-toast/todo-toast.component';
import { TodoToastService } from '@services/todo-toast.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-todo-toaster',
  templateUrl: './todo-toaster.component.html',
  styleUrls: ['./todo-toaster.component.scss'],
})
export class TodoToasterComponent implements OnDestroy {
  #elementRef = inject(ElementRef);

  #viewContainerRef = inject(ViewContainerRef);
  private subscription$: Subscription;
  private destroySubscription$?: Subscription;

  constructor(private readonly toastServer: TodoToastService) {
    this.subscription$ = toastServer.toastQueue$.subscribe(toast => this.#create(toast?.text));
  }

  #create(message: string | undefined): void {
    if (!message) {
      return;
    }
    const componentRef = this.#viewContainerRef.createComponent(TodoToastComponent);
    componentRef.instance.text = message;
    const [tooltipDOMElement] = (componentRef.hostView as EmbeddedViewRef<TooltipComponent>).rootNodes;
    this.#elementRef.nativeElement.appendChild(tooltipDOMElement);
    this.destroySubscription$ = timer(5000).subscribe(_ => componentRef.destroy());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.destroySubscription$?.unsubscribe();
  }
}