import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  TodoAddFormComponent,
  TodoDetailsComponent,
  TodoHeaderComponent,
  TodoItemComponent,
  TodoListComponent,
} from '@components/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { TodoStore } from '@services/index';
import { APP_CONFIG, Configuration } from './config/appConfig';
import { TodoRestStoreService } from '@services/todo-store.service';
import { HttpClientModule } from '@angular/common/http';
import { TodoFilterPanelComponent } from './components/todo-filter-panel/todo-filter-panel.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoAddFormComponent,
    TodoDetailsComponent,
    TodoFilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatButtonToggleModule,
  ],
  providers: [
    { provide: TodoStore, useClass: TodoRestStoreService },
    { provide: APP_CONFIG, useValue: Configuration },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
