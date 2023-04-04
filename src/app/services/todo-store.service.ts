import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApiService } from '@services/todo-api.service';

export class TodoStore {
  private todoApiService = inject<TodoApiService>(TodoApiService);
  addTodo = (todoDraft: TodoDraft): Observable<void> => this.todoApiService.addTodo(todoDraft);
  changeTodoStatus = (id: number, newStatus: TodoStatus): Observable<void> =>
    this.todoApiService.changeStatus(id, newStatus);
  getTodos = (): Observable<Todo[]> => this.todoApiService.getAll();
  getTodoById = (id: number): Observable<Todo | undefined> => this.todoApiService.getById(id);
  removeTodo = (id: number): Observable<void> => this.todoApiService.removeTodo(id);
  saveTodo = (todo: Todo): Observable<void> => this.todoApiService.save(todo);
}
