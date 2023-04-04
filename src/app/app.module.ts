import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  TodoAddFormComponent,
  TodoDetailsComponent,
  TodoHeaderComponent,
  TodoItemComponent,
  TodoListComponent,
  TodoFilterPanelComponent,
} from '@components/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStore } from '@services/index';
import { APP_CONFIG, Configuration } from './config/appConfig';
// import { TodoStore } from '@services/todo-store.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  {
    path: 'tasks',
    component: TodoListComponent,
  },
  {
    path: 'tasks/:id',
    component: TodoListComponent,
    children: [{ path: '', component: TodoDetailsComponent }],
  },
  { path: '**', redirectTo: '/' },
];

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
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: TodoStore, useClass: TodoStore },
    { provide: APP_CONFIG, useValue: Configuration },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
