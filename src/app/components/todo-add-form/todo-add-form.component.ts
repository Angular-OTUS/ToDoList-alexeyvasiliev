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

  isDisabled(): boolean {
    console.log(this.text);
    return this.text.trim().length === 0;
  }

  onClick() {
    this.newItemEvent.emit(this.text);
    this.text = '';
  }
}
