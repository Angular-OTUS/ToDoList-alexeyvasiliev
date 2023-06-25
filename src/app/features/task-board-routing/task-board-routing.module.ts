import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailsComponent, TodoListComponent } from '../task-backlog/components';
import { TaskBoardComponent } from '../task-board/components/task-board/task-board.component';

const routes: Routes = [
  {
    path: '',
    component: TaskBoardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TaskBoardRoutingModule {}
