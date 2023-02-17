import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent {
  @Output()
  private newItemEvent = new EventEmitter<string>();

  text = '';

  public isDisabled(): boolean {
    return this.text.trim().length === 0;
  }

  onClick() {
    if (this.isDisabled()) {
      return;
    }
    this.newItemEvent.emit(this.text);
    this.text = '';
  }
}
