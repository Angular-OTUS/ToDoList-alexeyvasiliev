import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map, Observable } from 'rxjs';
import { Todo, TodoStatus } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  protected readonly TodoStatus = TodoStatus;
  private readonly store = inject(TodoStore);

  readonly todoListInProgress$ = this.store.toDoList$.pipe(
    map(todoList => todoList.filter(item => item.status === TodoStatus.InProgress))
  );
  readonly todoListNew$ = this.store.toDoList$.pipe(
    map(todoList => todoList.filter(item => item.status === TodoStatus.New))
  );
  readonly todoListDone$ = this.store.toDoList$.pipe(
    map(todoList => todoList.filter(item => item.status === TodoStatus.Completed))
  );

  drop(event: CdkDragDrop<Observable<Todo[]>>, newTaskStatus: TodoStatus) {
    const id = event.item.element.nativeElement.getAttribute('taskid');
    if (id) {
      this.onItemStatusChanged([+id, newTaskStatus]);
    }
  }

  ngOnInit(): void {
    this.store.getTodos();
  }

  onItemStatusChanged = (changeParams: [number, TodoStatus]) => {
    this.store.changeTodoStatus(changeParams[0], changeParams[1]).subscribe(_ => {
      this.store.getTodos();
    });
  };

  trackByItem(index: number, el: Todo): number {
    return el.id;
  }
}
