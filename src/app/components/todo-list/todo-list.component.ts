import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft, TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

import { ToastType } from '@shared/interfaces/Toast';
import { ToastService } from '@shared/services/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  get todoList(): BehaviorSubject<Todo[]> {
    return this.#todoList$;
  }

  #todoList$ = new BehaviorSubject<Todo[]>([]);
  isLoading$ = new BehaviorSubject(false);

  selectedItemId?: number;

  editTodo?: Todo;

  private readonly store = inject(TodoStore);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  private savedFilter: TodoStatusState = TodoState.All;

  ngOnInit(): void {
    this.fetchData();
  }

  onItemRemove(id: number) {
    this.store.removeTodo(id).subscribe(_ => {
      this.toastService.showToast('🗑️ Задача удалена', ToastType.REMOVE);
      this.fetchData();
      if (id === this.selectedItemId) {
        this.selectedItemId = undefined;
      }
    });
  }

  onItemAdd(todoDraft: TodoDraft) {
    this.store.addTodo(todoDraft).subscribe(_ => {
      this.toastService.showToast('✅ Задача добавлена', ToastType.ADD);
      this.fetchData();
    });
  }

  async onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
    await this.router.navigate([`tasks/${selectedItemId}`], { state: {} });
  }

  private fetchData = () => {
    this.isLoading$.next(true);
    this.store
      .getTodos()
      .pipe(
        map(val => val.filter(t => t.status == this.savedFilter || this.savedFilter == TodoState.All)),
        switchMap(sourceValue => {
          this.#todoList$.next(sourceValue);
          this.isLoading$.next(false);
          return sourceValue;
        })
      )
      .subscribe();
  };
  onItemEditClick = (selectedItemId: number) => {
    this.store.getTodoById(selectedItemId).subscribe(todo => {
      this.editTodo = todo;
    });
  };
  onItemStatusChanged = (changeParams: [number, TodoStatus]) => {
    this.store.changeTodoStatus(changeParams[0], changeParams[1]).subscribe(_ => {
      const [idTask, status] = changeParams;
      this.toastService.showToast(
        status === TodoStatus.Completed ? `✔️ Задача ${idTask} выполнена` : `🚧 Задача ${idTask} на выполнении`,
        ToastType.STATUS_CHANGED
      );
      this.fetchData();
    });
  };

  onFilterChange = (filterType: TodoStatusState = this.savedFilter): void => {
    this.savedFilter = filterType;
    this.fetchData();
  };

  onItemEdit(todoEdit: Todo): void {
    this.store
      .saveTodo(todoEdit)
      .pipe(
        map(() => {
          this.toastService.showToast('✏️ Задача обновлена', ToastType.EDIT);
          this.editTodo = undefined;
          this.fetchData();
        })
      )
      .subscribe();
  }
}
