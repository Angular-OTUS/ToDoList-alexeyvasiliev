import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-todo-toast',
  templateUrl: './todo-toast.component.html',
  styleUrls: ['./todo-toast.component.scss'],
  animations: [trigger('inOut', [transition(':leave', [animate('4500ms', style({ opacity: 0.1 }))])])],
})
export class TodoToastComponent implements AfterViewInit, OnDestroy {
  @Input()
  text = '';

  private subscription$?: Subscription;

  end = true;
  ngAfterViewInit(): void {
    this.subscription$ = timer(500).subscribe(_ => (this.end = false));
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
