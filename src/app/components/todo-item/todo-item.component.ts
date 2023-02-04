import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Todo } from '@interfaces/Todo';
import { TooltipPosition } from '@shared/directives/tooltip.enums';
import { timer } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;
  selectedItemId?: number;

  TooltipPosition: typeof TooltipPosition = TooltipPosition;

  get isSelected() {
    return this.selectedItemId != null;
  }

  @Output()
  private removeItem = new EventEmitter<number>();

  onItemDelete(id: number) {
    this.removeItem.emit(id);
  }

  onSelectedClick(id: number) {
    this.selectedItemId = id;
  }

  @HostListener('mouseleave')
  mouseleave() {
    if (this.selectedItemId) {
      timer(1500).subscribe(() => {
        this.selectedItemId = undefined;
      });
    }
  }
}
