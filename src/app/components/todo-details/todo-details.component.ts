import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  description?: string;

  private sub$ = new Subscription();
  private subStore$ = new Subscription();

  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TodoStore);

  ngOnInit(): void {
    this.sub$ = this.route.params
      .pipe(
        map(param => {
          this.description = window.history.state.description;
          if (!this.description) {
            this.subStore$ = this.store.getById(param['id']).subscribe(data => (this.description = data?.description));
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
    this.subStore$?.unsubscribe();
  }
}
