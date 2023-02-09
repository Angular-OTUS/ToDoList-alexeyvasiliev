import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoAddFormComponent, TodoHeaderComponent, TodoItemComponent, TodoListComponent } from '@components/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { TodoDetailsComponent } from '@components/todo-details/todo-details.component';
import { TodoStore, TodoStoreService } from '@services/todo-store.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoAddFormComponent,
    TodoDetailsComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatIconModule, MatButtonModule, FormsModule, SharedModule],
  providers: [{ provide: TodoStore, useClass: TodoStoreService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
