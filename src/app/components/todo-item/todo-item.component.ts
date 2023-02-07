import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Todo } from '@interfaces/Todo';
import { TooltipPosition } from '@shared/directives/tooltip.enums';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() ItemRemove = new EventEmitter<number>();
  @Output() ItemSelect = new EventEmitter<number>();
  @Input() selectedItemId?: number;
  TooltipPosition: typeof TooltipPosition = TooltipPosition;

  @HostBinding('style.selected')
  get isSelected() {
    return this.todo.id === this.selectedItemId;
  }
  onItemDelete = (id: number) => this.ItemRemove.emit(id);
  onSelectedClick = (id: number) => this.ItemSelect.emit(id);
}
