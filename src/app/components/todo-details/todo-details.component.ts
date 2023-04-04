import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  description?: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TodoStore);

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map(param => {
          this.store
            .getTodoById(param['id'])
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => (this.description = data?.description));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
