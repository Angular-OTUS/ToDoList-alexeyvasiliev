import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: Todo[] = [];
  isLoading?: boolean;

  selectedItemId?: number;
  editItemId?: number;
  selectedItemDesc?: string;

  #store = inject(TodoStore);

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.#fetchData();
      this.isLoading = false;
    }, 1000);
  }

  onItemRemove(id: number) {
    if (!this.#store.removeTodo(id)) {
      return;
    }

    this.#fetchData();

    if (id === this.selectedItemId) {
      this.selectedItemId = undefined;
      this.selectedItemDesc = undefined;
    }
  }

  onItemAdd(todoDraft: TodoDraft) {
    this.#store.addTodo(todoDraft);

    this.#fetchData();
  }

  onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
    this.selectedItemDesc = this.items.filter(item => item.id === selectedItemId).at(0)?.description;
  }

  #fetchData = () => (this.items = this.#store.getAll());

  onItemEdit = (selectedItemId: number) => (this.editItemId = selectedItemId);

  resetItemEdit = () => (this.editItemId = undefined);
}
