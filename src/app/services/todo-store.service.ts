import { Todo, TodoDraft } from '@interfaces/Todo';

export abstract class TodoStore {
  abstract getAll(): Todo[];
  abstract getById(id: number): Todo | undefined;

  abstract removeTodo(id: number): boolean;
  abstract addTodo(todoDraft: TodoDraft): void;

  abstract save(todo: Todo): void;
}
export class TodoStoreService extends TodoStore {
  #items: Todo[] = [...initialTodos];

  getAll(): Todo[] {
    return this.#items;
  }

  removeTodo(id: number): boolean {
    const oldLength = this.#items.length;
    this.#items = this.#items.filter(todo => todo.id !== id);
    return oldLength != this.#items.length;
  }

  addTodo(todoDraft: TodoDraft) {
    const id =
      this.#items.length === 0
        ? 1
        : this.#items.reduce((prev, current) => (prev.id > current.id ? prev : current)).id + 1;
    this.#items = [{ id, ...todoDraft }, ...this.#items];
  }

  getById = (id: number): Todo | undefined => this.#items.find(t => t.id === id);

  save(todo: Todo): void {
    this.#items = this.#items.map(t => (t.id !== todo.id ? t : todo));
  }
}

const initialTodos = [
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
  },
  {
    id: 5,
    description: `1. Создать сервис который на данный момент будет хранить данные нашего todo list
просто внутри себя и предоставлять/изменять их по запросу.
2. Обновить элемент списка, чтобы по dblclick вместо вывода текста title элемента
списка появлялся input элемент и кнопка save. Добавить логику для изменения title
значения элемента списка.
3. Создайте сервис ToastService и компонент ToastsComponent. Компонент получает
массив строковых элементов из сервиса и выводит их в углу экрана один за
другим.
Наш компонент списка задач, также использует сервис ToastService и при
добавлении задачи или её изменении вызывает метод showToast() чтобы
уведомление появилось на экране.`,
    text: 'Сервисы в приложении',
  },
];
