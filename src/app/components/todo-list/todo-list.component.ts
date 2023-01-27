import { Component, OnInit } from '@angular/core';
import { Todo } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: Todo[] = [];
  isLoading?: boolean;

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
        text: 'Заготовка Angular проекта для приложения ToDo List',
      },
      {
        id: 2,
        text: ' Работа с компонентами: привязка логики к шаблону и выделение частей в отдельные компоненты',
      },
      {
        id: 3,
        text: 'Добавляем анимацию загрузки (имитируем подгрузку данных с бекэнда). Используем shared модуль',
      },
      {
        id: 4,
        text: 'Список задач с описаниями, предпросмотр описания элемента списка. Всплывающие подсказки',
      }
    );
  }

  onItemRemove(id: number) {
    this.items = this.items.filter(todo => todo.id !== id);
  }

  onItemAdd(text: string) {
    const id =
      this.items.length === 0
        ? 1
        : this.items.reduce((prev, current) => (prev.id > current.id ? prev : current)).id + 1;
    this.items = [{ text, id }, ...this.items];
  }
}
