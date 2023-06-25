import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskBacklogModule } from '../task-backlog/task-backlog.module';
import { TaskBoardColumnComponent } from './components/task-board-column/task-board-column.component';

@NgModule({
  declarations: [TaskBoardComponent, TaskBoardColumnComponent],
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
