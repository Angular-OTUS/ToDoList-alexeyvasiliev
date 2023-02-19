import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@shared/directives/tooltip.enums';
import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent implements OnChanges {
  @Input()
  editTodoId?: number;

  @Input()
  editTodo?: Todo;

  @Output() private newItemEvent = new EventEmitter<TodoDraft>();
  @Output() private editedItemEvent = new EventEmitter<Todo>();
  private readonly eRef = inject(ElementRef);
  TooltipPosition: typeof TooltipPosition = TooltipPosition;
  private todoTitle = new FormControl<string>('', Validators.required);
  private todoDescription = new FormControl<string>('');
  editForm = new FormGroup({
    todoTitle: this.todoTitle,
    todoDescription: this.todoDescription,
  });

  isDisabled = (): boolean => {
    if (this.editTodoId) {
      return true;
    }
    return this.todoTitle.value?.trim().length === 0;
  };

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.editTodo) {
      this.editTodo.text = this.todoTitle.value ?? '';
      this.editTodo.description = this.todoDescription.value ?? undefined;
      this.editedItemEvent.emit(this.editTodo);
    }
  }

  onSubmit(): void {
    if (this.isDisabled() || !this.todoTitle.value) {
      return;
    }
    this.newItemEvent.emit({
      text: this.todoTitle.value,
      description: this.todoDescription.value || undefined,
      status: TodoStatus.InProgress,
    });
    this.editForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTodo'].currentValue && this.editTodo) {
      this.editForm.setValue({
        todoTitle: this.editTodo.text,
        todoDescription: this.editTodo.description ?? null,
      });
    } else {
      this.editForm.reset();
    }
  }
}
