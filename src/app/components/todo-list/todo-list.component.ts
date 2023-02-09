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
  selectedItemDesc?: string;

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
        description: `- создание нового Angular проекта
          - создание нового компонента
          - добавление разметки в шаблон компонента',`,
        text: 'Заготовка Angular проекта для приложения ToDo List',
      },
      {
        id: 2,
        description:
          ' - создание нового компонента\n' +
          '- связывание данных и событий с шаблоном компонента\n' +
          '- включение одних компонентов в другие и передача данных между ними',
        text: 'Работа с компонентами: привязка логики к шаблону и выделение частей в отдельные компоненты',
      },
      {
        id: 3,
        description:
          '* использование методом жизненного цикла компонента.\n' +
          '* создавать модули\n' +
          '* декларировать и экспортировать компоненты в модуле\n' +
          '* импортировать один модуль в другой',
        text: 'Добавляем анимацию загрузки (имитируем подгрузку данных с бекэнда). Используем shared модуль',
      },
      {
        id: 4,
        description: `* использование стандартных атрибутивных и структурных директив
* создание пользовательских директив`,
        text: 'Список задач с описаниями, предпросмотр описания элемента списка. Всплывающие подсказки',
      }
    );
  }

  onItemRemove(id: number) {
    this.items = this.items.filter(todo => todo.id !== id);
    if (id === this.selectedItemId) {
      this.selectedItemId = undefined;
      this.selectedItemDesc = undefined;
    }
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
    this.selectedItemDesc = this.items.filter(item => item.id === selectedItemId).at(0)?.description;
    //this.selectedItemDesc = '1111';
    console.log(this.selectedItemDesc);
  }
}
