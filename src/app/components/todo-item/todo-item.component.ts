import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Todo, TodoStatus } from '@interfaces/Todo';
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
  @Output() ItemEdit = new EventEmitter<number>();

  @Output() ItemStatusChanged = new EventEmitter<[number, TodoStatus]>();

  @Input() selectedItemId?: number;
  TooltipPosition: typeof TooltipPosition = TooltipPosition;

  @HostBinding('style.selected')
  get isSelected() {
    return this.todo.id === this.selectedItemId;
  }

  get isCompleted(): boolean {
    return this.todo.status === TodoStatus.Completed;
  }

  onItemDelete = (id: number) => this.ItemRemove.emit(id);
  onSelectedClick = (id: number) => this.ItemSelect.emit(id);

  onDblClick(id: number) {
    this.ItemEdit.emit(id);
  }

  changeStatus(id: number): void {
    this.todo.status = this.todo.status === TodoStatus.Completed ? TodoStatus.InProgress : TodoStatus.Completed;
    this.ItemStatusChanged.emit([id, this.todo.status]);
  }
}
