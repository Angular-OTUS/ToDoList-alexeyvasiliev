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
import { TodoStore } from '@services/todo-store.service';
import { ToastType } from '@interfaces/Toast';
import { TodoToastService } from '@services/todo-toast.service';
import { TodoDraft, TodoStatus } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent implements OnChanges {
  @Input()
  editTodoId?: number;
  @Output() private resetItemEvent = new EventEmitter<number>();
  @Output() private newItemEvent = new EventEmitter<TodoDraft>();
  #todoStore = inject(TodoStore);
  #eRef = inject(ElementRef);
  #toastService = inject(TodoToastService);
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
    if (!this.#eRef.nativeElement.contains(event.target) && this.editTodoId) {
      this.#todoStore.getById(this.editTodoId).subscribe(data => {
        if (data && this.todoTitle.value) {
          data.text = this.todoTitle.value;
          data.description = this.todoDescription.value || undefined;
          this.#todoStore.save(data);
          this.#toastService.showToast('✏️ Задача обновлена', ToastType.EDIT);
          this.resetItemEvent.emit();
          this.editForm.reset();
        }
      });
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
    if (changes['editTodoId'].currentValue) {
      this.#todoStore.getById(+changes['editTodoId'].currentValue).subscribe(data =>
        this.editForm.setValue({
          todoTitle: data?.text || '',
          todoDescription: data?.description || '',
        })
      );
    }
  }
}
