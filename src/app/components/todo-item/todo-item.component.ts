import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  private removeItem = new EventEmitter<number>();

  onItemDelete(id: number) {
    this.removeItem.emit(id);
  }
}
