import { Component, inject, Input } from '@angular/core';
import { Todo, TodoStatus } from '@interfaces/Todo';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-task-board-column',
  templateUrl: './task-board-column.component.html',
  styleUrls: ['./task-board-column.component.scss'],
})
export class TaskBoardColumnComponent {
  protected readonly TodoStatus = TodoStatus;
  private readonly store = inject(TodoStore);
  @Input()
  todoList$: Observable<Todo[]> = new BehaviorSubject<Todo[]>([]);

  @Input()
  todoState!: TodoStatus;
  @Input()
  title = '';

  drop(event: CdkDragDrop<Observable<Todo[]>>) {
    const id = event.item.element.nativeElement.getAttribute('taskid');

    if (id) {
      this.onItemStatusChanged([+id, this.todoState]);
    }
  }
  private onItemStatusChanged = (changeParams: [number, TodoStatus]) => {
    this.store.changeTodoStatus(changeParams[0], changeParams[1]).subscribe(_ => {
      this.store.getTodos();
    });
  };

  trackByItem(index: number, el: Todo): number {
    return el.id;
  }
}
