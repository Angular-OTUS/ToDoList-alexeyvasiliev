import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, LoaderComponent, ButtonComponent } from '@shared/components';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent, TooltipComponent, TooltipDirective],
  exports: [ButtonComponent, LoaderComponent, TooltipDirective],
  imports: [CommonModule],
})
export class SharedModule {}
