import { Component, inject, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { TodoStatus } from '@interfaces/Todo';
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

  ngOnInit(): void {
    this.store.getTodos();
  }
}
