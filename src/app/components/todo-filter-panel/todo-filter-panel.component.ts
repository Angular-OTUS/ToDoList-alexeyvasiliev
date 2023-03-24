import { Component, EventEmitter, Output } from '@angular/core';
import { TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-filter-panel',
  templateUrl: './todo-filter-panel.component.html',
  styleUrls: ['./todo-filter-panel.component.scss'],
})
export class TodoFilterPanelComponent {
  @Output()
  private filterEmitter = new EventEmitter<TodoStatusState>();

  readonly all: typeof TodoState = TodoState;
  readonly todoStatus: typeof TodoStatus = TodoStatus;
  onValChange(value: TodoStatusState) {
    this.filterEmitter.emit(value);
  }
}
