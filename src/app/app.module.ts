import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { TodoStore } from '@services/index';
import { APP_CONFIG, Configuration } from './config/appConfig';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './features/@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardModule } from './features/task-board/task-board.module';
import { TaskBacklogModule } from './features/task-backlog/task-backlog.module';
import { TaskLandingComponent } from '@components/task-landing/task-landing.component';
import { TaskBoardComponent } from './features/task-board/components/task-board/task-board.component';
import { TaskBacklogRouterModule } from './features/task-backlog-routing/task-backlog-routing.module';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => TaskBacklogRouterModule,
  },
  {
    path: 'board',
    component: TaskBoardComponent,
  },
];

@NgModule({
  declarations: [AppComponent, TaskLandingComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TaskBoardModule,
    TaskBacklogModule,
    MatListModule,
  ],
  providers: [
    { provide: TodoStore, useClass: TodoStore },
    { provide: APP_CONFIG, useValue: Configuration },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
