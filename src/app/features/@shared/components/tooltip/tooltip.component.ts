import { Component } from '@angular/core';
import { TooltipPosition } from '../../directives/tooltip/tooltip.enums';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;
  position: TooltipPosition = TooltipPosition.ABOVE;
}
