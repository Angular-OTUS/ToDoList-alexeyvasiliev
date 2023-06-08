import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, LoaderComponent, ButtonComponent, ToasterComponent, ToastComponent } from './components';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    TooltipComponent,
    TooltipDirective,
    ToasterComponent,
    ToastComponent,
  ],
  exports: [ButtonComponent, LoaderComponent, TooltipDirective, ToasterComponent],
  imports: [CommonModule],
  providers: [ToastService],
})
export class SharedModule {}
