import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';
import { inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/appConfig';
import { Observable } from 'rxjs';

export abstract class TodoStore {
  abstract getAll(): Observable<Todo[]>;
  abstract getById(id: number): Observable<Todo | undefined>;
  abstract removeTodo(id: number): Observable<void>;
  abstract addTodo(todoDraft: TodoDraft): Observable<void>;
  abstract save(todo: Todo): void;
  abstract changeStatus(id: number, newStatus: TodoStatus): Observable<void>;
}

export class TodoRestStoreService extends TodoStore {
  private httpClient = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);
  addTodo = (todoDraft: TodoDraft): Observable<void> => {
    return this.httpClient.post<void>(this.appConfig.URL, todoDraft);
  };

  changeStatus = (id: number, newStatus: TodoStatus): Observable<void> => {
    return this.httpClient.patch<void>(`${this.appConfig.URL}/${id}`, { status: newStatus });
  };

  getAll = (): Observable<Todo[]> => this.httpClient.get<Array<Todo>>(this.appConfig.URL);

  getById = (id: number): Observable<Todo | undefined> => this.httpClient.get<Todo>(`${this.appConfig.URL}/${id}`);

  removeTodo = (id: number): Observable<void> => {
    return this.httpClient.delete<void>(`${this.appConfig.URL}/${id}`);
  };

  save = (todo: Todo): void => {
    this.httpClient.patch<void>(`${this.appConfig.URL}/${todo.id}`, todo).subscribe();
  };
}
