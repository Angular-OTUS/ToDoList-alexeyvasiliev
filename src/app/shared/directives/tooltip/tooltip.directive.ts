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
import { TooltipComponent } from '@shared/components';
import { TooltipPosition } from './tooltip.enums';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip = '';
  @Input() position: TooltipPosition = TooltipPosition.BELOW;

  private componentRef: ComponentRef<TooltipComponent> | null = null;
  private elementRef = inject(ElementRef);
  private appRef = inject(ApplicationRef);
  private viewContainerRef = inject(ViewContainerRef);

  @HostListener('mouseenter') onMouseEnter = (): void => this.initializeTooltip();
  @HostListener('mouseleave') onMouseLeave = (): void => this.destroy();

  private initializeTooltip() {
    if (this.componentRef === null) {
      this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
      const [tooltipDOMElement] = (this.componentRef.hostView as EmbeddedViewRef<TooltipComponent>).rootNodes;
      this.setTooltipComponentProperties();
      document.body.appendChild(tooltipDOMElement);
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;

      const { left, right, top, bottom } = this.elementRef.nativeElement.getBoundingClientRect();

      switch (this.position) {
        case TooltipPosition.BELOW: {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(bottom);
          break;
        }
        case TooltipPosition.ABOVE: {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(top);
          break;
        }
        case TooltipPosition.RIGHT: {
          this.componentRef.instance.left = Math.round(right);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2) - 20;
          break;
        }
        case TooltipPosition.LEFT: {
          this.componentRef.instance.left = Math.round(left);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2) - 20;
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
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
