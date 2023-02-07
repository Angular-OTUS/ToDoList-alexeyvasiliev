import { Component, OnInit } from '@angular/core';
import { Todo, TodoDraft } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: Todo[] = [];
  isLoading?: boolean;

  selectedItemId?: number;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.#fetchData();
      this.isLoading = false;
    }, 1000);
  }

  #fetchData(): void {
    this.items.push(
      {
        id: 1,
        description: 'Заготовка Angular проекта для приложения ToDo List',
        text: 'Задание 1',
      },
      {
        id: 2,
        description: ' Работа с компонентами: привязка логики к шаблону и выделение частей в отдельные компоненты',
        text: 'Задание 2',
      },
      {
        id: 3,
        description: 'Добавляем анимацию загрузки (имитируем подгрузку данных с бекэнда). Используем shared модуль',
        text: 'Задание 3',
      },
      {
        id: 4,
        description: 'Список задач с описаниями, предпросмотр описания элемента списка. Всплывающие подсказки',
        text: 'Задание 4',
      }
    );
  }

  onItemRemove(id: number) {
    this.items = this.items.filter(todo => todo.id !== id);
  }

  onItemAdd(todoDraft: TodoDraft) {
    const id =
      this.items.length === 0
        ? 1
        : this.items.reduce((prev, current) => (prev.id > current.id ? prev : current)).id + 1;
    this.items = [{ id, ...todoDraft }, ...this.items];
  }

  onItemSelected(selectedItemId: number) {
    this.selectedItemId = selectedItemId;
  }
}
