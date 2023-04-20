import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft, TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

import { ToastType } from '@shared/interfaces/Toast';
import { ToastService } from '@shared/services/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  readonly isLoading$ = new BehaviorSubject(false);

  selectedItemId?: number;

  editTodo?: Todo;

  private readonly store = inject(TodoStore);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  private savedFilter$ = new BehaviorSubject<TodoStatusState>(TodoState.All);

  readonly todoList$ = this.store.toDoList$.pipe(
    switchMap(v => of(v.filter(t => t.status == this.savedFilter$.value || this.savedFilter$.value == TodoState.All)))
  );

  onItemRemove(id: number) {
    this.store.removeTodo(id).subscribe(_ => {
      this.toastService.showToast('🗑️ Задача удалена', ToastType.REMOVE);
      if (id === this.selectedItemId) {
        this.selectedItemId = undefined;
      }
    });
  }

  onItemAdd(todoDraft: TodoDraft) {
    this.store.addTodo(todoDraft);
    this.toastService.showToast('✅ Задача добавлена', ToastType.ADD);
  }

  async onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
    await this.router.navigate([`tasks/${selectedItemId}`], { state: {} });
  }

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
    });
  };

  onFilterChange = (filterType: TodoStatusState): void => {
    this.savedFilter$.next(filterType);
    this.store.todoChanges();
  };

  onItemEdit(todoEdit: Todo): void {
    this.store
      .saveTodo(todoEdit)
      .pipe(
        tap(() => {
          this.editTodo = undefined;
        }),
        map(() => {
          this.toastService.showToast('✏️ Задача обновлена', ToastType.EDIT);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.getTodos();
  }
}
