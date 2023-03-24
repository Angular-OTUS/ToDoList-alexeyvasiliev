import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft, TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

import { ToastType } from '@shared/interfaces/Toast';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: Todo[] = [];

  private storedItems: Todo[] = [];
  isLoading = true;

  selectedItemId?: number;

  editTodo?: Todo;

  selectedItemDesc?: string;

  private readonly store = inject(TodoStore);
  private readonly toastService = inject(ToastService);
  private savedFilter: TodoStatusState = TodoState.All;

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchData();
    this.isLoading = false;
  }

  onItemRemove(id: number) {
    this.store.removeTodo(id).subscribe(_ => {
      this.toastService.showToast('🗑️ Задача удалена', ToastType.REMOVE);
      this.fetchData();
      if (id === this.selectedItemId) {
        this.selectedItemId = undefined;
        this.selectedItemDesc = undefined;
      }
    });
  }

  onItemAdd(todoDraft: TodoDraft) {
    this.store.addTodo(todoDraft).subscribe(_ => {
      this.toastService.showToast('✅ Задача добавлена', ToastType.ADD);
      this.fetchData();
    });
  }

  onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
    this.selectedItemDesc = this.items.find(item => item.id == selectedItemId)?.description;
  }

  private fetchData = () =>
    this.store.getAll().subscribe(data => {
      this.storedItems = [...data];
      this.onFilterChange();
    });

  onItemEditClick = (selectedItemId: number) => {
    this.store.getById(selectedItemId).subscribe(todo => {
      this.editTodo = todo;
    });
  };
  onItemStatusChanged = (changeParams: [number, TodoStatus]) => {
    this.store.changeStatus(changeParams[0], changeParams[1]).subscribe(_ => {
      const [idTask, status] = changeParams;

      this.toastService.showToast(
        status === TodoStatus.Completed ? `✔️ Задача ${idTask} выполнена` : `🚧 Задача ${idTask} на выполнении`,
        ToastType.STATUS_CHANGED
      );
      this.fetchData();
    });
  };

  onFilterChange = (filterType: TodoStatusState = this.savedFilter) => {
    this.savedFilter = filterType;
    return (this.items = this.storedItems.filter(t => filterType == TodoState.All || t.status === filterType));
  };

  onItemEdit(todoEdit: Todo): void {
    this.store.save(todoEdit);
    this.toastService.showToast('✏️ Задача обновлена', ToastType.EDIT);
    this.editTodo = undefined;
    this.fetchData();
  }
}
