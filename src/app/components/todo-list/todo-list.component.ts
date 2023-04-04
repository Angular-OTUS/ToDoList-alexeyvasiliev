import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoDraft, TodoState, TodoStatus, TodoStatusState } from '@interfaces/Todo';
import { TodoStore } from '@services/todo-store.service';

import { ToastType } from '@shared/interfaces/Toast';
import { ToastService } from '@shared/services/toast.service';
import { Router } from '@angular/router';
import {BehaviorSubject, filter, map} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items = new BehaviorSubject<Todo[]>([]);

  private storedItems: Todo[] = [];
  isLoading = true;

  selectedItemId?: number;

  editTodo?: Todo;

  private readonly store = inject(TodoStore);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  private savedFilter: TodoStatusState = TodoState.All;

  ngOnInit(): void {
     this.items =  this.store.listDataTodo;
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
   // const description = this.items.find(item => item.id == selectedItemId)?.description;

    await this.router.navigate([`tasks/${selectedItemId}`], { state: {  } });
  }

  private fetchData = () => {
    this.store.getAll();

    console.log("y",  this.items.getValue());

    this.storedItems = [...  this.items.getValue() ]
    //this.onFilterChange();
  }
    // this.store.getAll().subscribe(data => {
    //   this.storedItems = [...data];
    //   this.onFilterChange();
    // });

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

  onFilterChange = (filterType: TodoStatusState = this.savedFilter): void => {
    this.savedFilter = filterType;
    console.log( "onFilterChange" , filterType);

    this.items.next(  this.items.getValue().filter( t => filterType == TodoState.All || t.status === filterType));

   // this.items = this.storedItems.filter(t => filterType == TodoState.All || t.status === filterType);
  //  this.items = new BehaviorSubject<Todo[]>(  this.storedItems.filter(t => filterType == TodoState.All || t.status === filterType));
  };

  onItemEdit(todoEdit: Todo): void {
    this.store
      .save(todoEdit)
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
