import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent, TooltipComponent, TooltipDirective],
  exports: [ButtonComponent, LoaderComponent, TooltipDirective],
  imports: [CommonModule],
})
export class SharedModule {}
