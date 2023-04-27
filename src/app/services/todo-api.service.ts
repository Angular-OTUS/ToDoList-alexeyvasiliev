import { inject, Injectable } from '@angular/core';
import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/appConfig';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private httpClient = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);

  addTodo(todoDraft: TodoDraft) {
    return this.httpClient.post<Todo>(this.appConfig.URL, todoDraft);
  }
  changeStatus(id: number, newStatus: TodoStatus) {
    return this.httpClient.patch<Todo>(`${this.appConfig.URL}/${id}`, { status: newStatus });
  }
  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Array<Todo>>(this.appConfig.URL);
  }
  getById(id: number) {
    return this.httpClient.get<Todo>(`${this.appConfig.URL}/${id}`);
  }
  removeTodo(id: number) {
    return this.httpClient.delete<void>(`${this.appConfig.URL}/${id}`);
  }
  save(todo: Todo) {
    return this.httpClient.patch<void>(`${this.appConfig.URL}/${todo.id}`, todo);
  }
}
