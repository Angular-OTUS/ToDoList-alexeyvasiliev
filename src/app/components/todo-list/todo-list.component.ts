import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft, TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';
import { TodoToastService } from '@services/todo-toast.service';
import { ToastType } from '@interfaces/Toast';

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
  editItemId?: number;
  selectedItemDesc?: string;

  #store = inject(TodoStore);
  #toastService = inject(TodoToastService);
  private savedFilter: TodoStatusState = TodoState.All;

  ngOnInit(): void {
    this.isLoading = true;
    this.#fetchData();
    this.isLoading = false;
  }

  onItemRemove(id: number) {
    // if (!this.#store.removeTodo(id).subscribe( _ => {})) {
    //   return;
    // }
    // this.#toastService.showToast('🗑️ Задача удалена', ToastType.REMOVE);
    // this.#fetchData();
    //
    // if (id === this.selectedItemId) {
    //   this.selectedItemId = undefined;
    //   this.selectedItemDesc = undefined;
    // }
    this.#store.removeTodo(id).subscribe(_ => {
      this.#toastService.showToast('🗑️ Задача удалена', ToastType.REMOVE);
      this.#fetchData();
      if (id === this.selectedItemId) {
        this.selectedItemId = undefined;
        this.selectedItemDesc = undefined;
      }
    });
  }

  onItemAdd(todoDraft: TodoDraft) {
    this.#store.addTodo(todoDraft).subscribe(_ => {
      this.#toastService.showToast('✅ Задача добавлена', ToastType.ADD);
      this.#fetchData();
    });
  }

  onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
    this.selectedItemDesc = this.items.filter(item => item.id === selectedItemId).at(0)?.description;
  }

  #fetchData = () =>
    this.#store.getAll().subscribe(data => {
      this.storedItems = [...data];
      this.onFilterChange();
    });

  onItemEdit = (selectedItemId: number) => (this.editItemId = selectedItemId);

  resetItemEdit = () => {
    this.editItemId = undefined;
    this.#fetchData();
  };

  onItemStatusChanged = (changeParams: [number, TodoStatus]) => {
    this.#store.changeStatus(changeParams[0], changeParams[1]).subscribe(_ => {
      this.#toastService.showToast(
        changeParams[1] === TodoStatus.Completed
          ? `✔️ Задача ${changeParams[0]} выполнена`
          : `🚧 Задача ${changeParams[0]} на выполнении`,
        ToastType.STATUS_CHANGED
      );
      this.#fetchData();
    });
  };

  onFilterChange = (filterType: TodoStatusState = this.savedFilter) => {
    this.savedFilter = filterType;
    return (this.items = this.storedItems.filter(t => filterType == TodoState.All || t.status === filterType));
  };
}
