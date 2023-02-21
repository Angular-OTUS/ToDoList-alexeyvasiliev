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
import { TodoDraft } from '@interfaces/Todo';
import { TooltipPosition } from '@shared/directives/tooltip/tooltip.enums';
import { TodoStore } from '@services/todo-store.service';
import { ToastService } from '@shared/services/toast.service';
import { ToastType } from '@interfaces/Toast';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent implements OnChanges {
  @Output() private newItemEvent = new EventEmitter<TodoDraft>();

  @Output() private resetItemEvent = new EventEmitter<number>();

  @Input()
  editTodoId?: number;

  text = '';
  description = '';
  TooltipPosition: typeof TooltipPosition = TooltipPosition;

  private readonly todoStore = inject(TodoStore);
  private readonly eRef = inject(ElementRef);
  private readonly toastService = inject(ToastService);
  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && this.editTodoId) {
      const todo = this.todoStore.getById(this.editTodoId);
      if (todo) {
        todo.text = this.text;
        this.todoStore.save(todo);
        this.toastService.showToast('✏️ Задача обновлена', ToastType.EDIT);
        this.resetItemEvent.emit();
      }
    }
  }

  isDisabled = (): boolean => {
    if (this.editTodoId) {
      return true;
    }
    return this.text.trim().length === 0;
  };

  onClick() {
    if (this.isDisabled()) {
      return;
    }
    this.newItemEvent.emit({ text: this.text, description: this.description });
    this.text = '';
    this.description = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.text = this.todoStore.getById(+changes['editTodoId'].currentValue)?.text || '';
  }
}
