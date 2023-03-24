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
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Todo, TodoDraft, TodoStatus } from '@interfaces/Todo';
import { TooltipPosition } from '@shared/directives/tooltip/tooltip.enums';

interface TodoFormModel {
  todoTitle: AbstractControl<string | null>;
  todoDescription: AbstractControl<string | null>;
}

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
  readonly editForm = new FormGroup<TodoFormModel>({
    todoTitle: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    todoDescription: new FormControl<string | null>(null),
  });

  isDisabled = (): boolean => {
    if (this.editTodoId) {
      return true;
    }
    return this.editForm.controls.todoTitle.value?.trim().length === 0;
  };

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.editTodo) {
      this.editTodo.text = this.editForm.controls.todoTitle.value ?? '';
      this.editTodo.description = this.editForm.controls.todoDescription.value ?? undefined;
      this.editedItemEvent.emit(this.editTodo);
    }
  }

  onSubmit(): void {
    if (this.isDisabled() || !this.editForm.controls.todoTitle.value) {
      return;
    }
    this.newItemEvent.emit({
      text: this.editForm.controls.todoTitle.value,
      description: this.editForm.controls.todoDescription.value || undefined,
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
