import { Component, EventEmitter, Output } from '@angular/core';
import { TodoDraft } from '@interfaces/Todo';
import { TooltipPosition } from '@shared/directives/tooltip.enums';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent {
  @Output()
  private newItemEvent = new EventEmitter<TodoDraft>();

  text = '';
  description = '';
  TooltipPosition: typeof TooltipPosition = TooltipPosition;

  #isDisabled(): boolean {
    return this.text.trim().length === 0;
  }

  onClick() {
    if (this.#isDisabled()) {
      return;
    }

    this.newItemEvent.emit({ text: this.text, description: this.description });
    this.text = '';
    this.description = '';
  }
}
