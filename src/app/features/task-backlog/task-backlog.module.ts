import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TodoAddFormComponent,
  TodoDetailsComponent,
  TodoFilterPanelComponent,
  TodoHeaderComponent,
  TodoItemComponent,
  TodoListComponent,
} from './components';
import { SharedModule } from '../@shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoAddFormComponent,
    TodoDetailsComponent,
    TodoFilterPanelComponent,
  ],
  imports: [CommonModule, SharedModule, RouterOutlet, MatButtonToggleModule, FormsModule, ReactiveFormsModule],
  exports: [
    TodoListComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoAddFormComponent,
    TodoDetailsComponent,
  ],
})
export class TaskBacklogModule {}
