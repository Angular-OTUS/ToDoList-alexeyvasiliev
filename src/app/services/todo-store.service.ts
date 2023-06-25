import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { TodoApiService } from '@services/todo-api.service';

export class TodoStore {
  private readonly toDoListSubject$ = new BehaviorSubject<Todo[]>([]);
  readonly toDoList$ = this.toDoListSubject$.asObservable();

  private todoApiService = inject<TodoApiService>(TodoApiService);

  changeTodoStatus(id: number, newStatus: TodoStatus): Observable<Todo> {
    return this.todoApiService
      .changeStatus(id, newStatus)
      .pipe(switchMap(() => this.todoApiService.changeStatus(id, newStatus)));
  }

  getTodos(): void {
    this.todoApiService.getAll().subscribe(todoList => this.toDoListSubject$.next(todoList));
  }

  addTodo(todoDraft: TodoDraft): void {
    this.todoApiService.addTodo(todoDraft).subscribe((addedTodo: Todo) => {
      this.toDoListSubject$.next([...this.toDoListSubject$.value, addedTodo]);
    });
  }

  todoChanges(): void {
    this.toDoListSubject$.next(this.toDoListSubject$.value);
  }

  getTodoById = (id: number): Observable<Todo | undefined> => this.todoApiService.getById(id);
  removeTodo = (id: number): Observable<void> => {
    return this.todoApiService.removeTodo(id).pipe(
      tap(() => {
        this.toDoListSubject$.next([...this.toDoListSubject$.value.filter(v => v.id !== id)]);
      })
    );
  };

  saveTodo(todo: Todo): Observable<void> {
    this.todoApiService.save(todo).subscribe(() => {
      this.toDoListSubject$.next([...this.toDoListSubject$.value.filter(v => v.id !== todo.id), todo]);
    });
    return of(void 0);
  }
}
