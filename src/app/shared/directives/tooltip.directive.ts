import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { TooltipPosition } from '@shared/directives/tooltip.enums';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip = '';
  @Input() position: TooltipPosition = TooltipPosition.BELOW;

  #componentRef: ComponentRef<TooltipComponent> | null = null;
  #elementRef = inject(ElementRef);
  #appRef = inject(ApplicationRef);
  #viewContainerRef = inject(ViewContainerRef);

  @HostListener('mouseenter') onMouseEnter = (): void => this.initializeTooltip();
  @HostListener('mouseleave') onMouseLeave = (): void => this.destroy();

  private initializeTooltip() {
    if (this.#componentRef === null) {
      this.#componentRef = this.#viewContainerRef.createComponent(TooltipComponent);
      const [tooltipDOMElement] = (this.#componentRef.hostView as EmbeddedViewRef<TooltipComponent>).rootNodes;
      this.setTooltipComponentProperties();
      document.body.appendChild(tooltipDOMElement);
    }
  }

  private setTooltipComponentProperties() {
    if (this.#componentRef !== null) {
      this.#componentRef.instance.tooltip = this.tooltip;

      const { left, right, top, bottom } = this.#elementRef.nativeElement.getBoundingClientRect();

      switch (this.position) {
        case TooltipPosition.BELOW: {
          this.#componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.#componentRef.instance.top = Math.round(bottom);
          break;
        }
        case TooltipPosition.ABOVE: {
          this.#componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.#componentRef.instance.top = Math.round(top);
          break;
        }
        case TooltipPosition.RIGHT: {
          this.#componentRef.instance.left = Math.round(right);
          this.#componentRef.instance.top = Math.round(top + (bottom - top) / 2) - 20;
          break;
        }
        case TooltipPosition.LEFT: {
          this.#componentRef.instance.left = Math.round(left);
          this.#componentRef.instance.top = Math.round(top + (bottom - top) / 2) - 20;
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.#componentRef !== null) {
      this.#appRef.detachView(this.#componentRef.hostView);
      this.#componentRef.destroy();
      this.#componentRef = null;
    }
  }
}
