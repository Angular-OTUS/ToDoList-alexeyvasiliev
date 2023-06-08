import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

import { SharedModule } from '../@shared/shared.module';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskBacklogModule } from '../task-backlog/task-backlog.module';

@NgModule({
  declarations: [TaskBoardComponent],
  imports: [
    CommonModule,
    TaskBacklogModule,
    RouterOutlet,
    SharedModule,
    CdkDropList,
    DragDropModule,
    TaskBacklogModule,
  ],
  exports: [TaskBoardComponent],
})
export class TaskBoardModule {}
