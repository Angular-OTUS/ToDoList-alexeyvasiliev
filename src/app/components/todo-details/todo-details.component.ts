import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { TodoStore } from '@services/todo-store.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TodoStore);

  description$ = this.route.params.pipe(
    switchMap(param => this.store.getTodoById(param['id']).pipe(map(data => data?.description || '')))
  );
}
